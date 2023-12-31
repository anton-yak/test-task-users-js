async function sendUserEvent(userId, event, changedFields) {
  let sentStatus = ""
  try {
    const response = await fetch(process.env.USER_HISTORY_URL+"/api/v1/user-events", {
      method: 'POST',
      body: JSON.stringify({
        userId: userId,
        event: event,
        changedFields: changedFields,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    sentStatus = response.status+' '+response.statusText
    try {
      const responseBody = await response.text()
      sentStatus += ' '+responseBody
    } catch(error) {
      console.error(error)
    }
  } catch (error) {
    sentStatus = error
    console.error(error)
  } finally {
    console.log(`Sent event=${event} for userId=${userId} to user-history: ${sentStatus}`)
  }
}

export async function createUser(req, res, next) {
  try {
    const userModel = req.app.get('userModel')
    const requiredFields = [
      'username',
      'email',
      'password',
      'fullName',
    ]
    const missingFields = requiredFields.filter((field) => !req.body[field])
    if (missingFields.length) {
      res.json({
        error: "Missing fields: "+missingFields.join(", ")
      })
      return
    }
    if (await userModel.exists(req.body.username)) {
      const errMsg = `Username '${req.body.username}' is already taken`
      console.log(errMsg)
      res.status(409).json({
        error: errMsg
      })
      return
    }

    const user = await userModel.create(req.body)

    const changedFields = [
      'email',
      'password',
      'fullName'
    ].map((field) => {
      return {
        fieldName: field,
        oldValue: null,
        newValue: req.body[field]
      }
    })
    // asynchronously sending event without awaiting for response
    sendUserEvent(user.id, 'create', changedFields)

    res.json(user)
  } catch (error) {
    next(error)
  }
}

export async function updateUser(req, res, next) {
  try {
    const userModel = req.app.get('userModel')
    const updateResult = await userModel.update(req.params.userId, req.body)
    if (updateResult.rowCount == 0) {
      res.status(404).json({
        error: `User with id=${req.params.userId} not found`
      })
      return
    }

    // asynchronously sending event without awaiting for response
    sendUserEvent(req.params.userId, 'update', updateResult.changedFields)

    res.end()
  } catch (error) {
    next(error)
  }
}

export async function getAllUsers(req, res, next) {
  try {
    const userModel = req.app.get('userModel')
    const users = await userModel.getAll()
    res.json({
      users: users
    })
  } catch (error) {
    next(error)
  }
}

export class UserModel {
  constructor(db) {
    this.db = db
  }
  async exists(username) {
    try {
      const selectRes = await this.db.query(`SELECT 1 FROM users WHERE username = $1`, [username])
      return selectRes.rows.length != 0
    } catch(error) {
      console.dir(error)
      throw new Error(`failed to check existense of user: ${error}`)
    }
  }

  async create({
    username,
    email,
    password,
    fullName
  }) {
    try {
      const insertRes = await this.db.query(
        `INSERT INTO users (username, email, password, full_name)
        VALUES ($1, $2, $3, $4)
        RETURNING id`,
        [
          username,
          email,
          password,
          fullName,
        ]
      )

    const id = insertRes.rows[0].id
    return {
        id,
        username,
        email,
        password,
        fullName
      }
    } catch(error) {
      console.error(error)
      throw new Error(`failed to create user: ${error}`)
    }
}

  async update({id, email, password, fullName}) {
    try {
      const updateRes = await this.db.query(
        `UPDATE users SET
            email = $1,
            password = $2,
            full_name = $3
        WHERE id = $4`,
        [
          email,
          password,
          fullName,
          id
        ]
      )
      return updateRes.rowCount
    } catch(error) {
      console.error(error)
      throw new Error(`failed to update user: ${error}`)
    }
  }

  async getAll() {
    try {
      const selectRes = await this.db.query(`SELECT id, username, email, full_name FROM users`)
      return selectRes.rows
    } catch(error) {
      console.error(error)
      throw new Error("error while selecting all users")
    }
  }
}

import express from 'express'
import pg from 'pg'

import { UserModel } from './model.js'
import { router } from './router.js'

const app = express()
const port = 8080

app.use(express.json())

const pool = new pg.Pool()
const client = await pool.connect()
const userModel = new UserModel(client)

app.set('userModel', userModel)

app.use('/', (req, res, next) => {
  console.log(`${req.method} ${req.path} ${JSON.stringify(req.body)}`)
  next()
})
app.use('/', router)
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({
    error: "Internal server error"
  })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

import express from 'express'
import { createUser, updateUser, getAllUsers } from './controller.js'

const v1 = express.Router()
v1.post('/users', createUser)
v1.put('/users/:userId', updateUser)
v1.get('/users', getAllUsers)

export const router = express.Router()
router.use('/api/v1', v1)

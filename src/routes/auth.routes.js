import express from 'express'
import { login, profile, reg } from '../controllers/auth.controller.js'
import { isAuth } from '../middleware/isAuth.js'

const router = express.Router()


router.post('/reg', reg)
router.post('/login', login)
router.post('/profile', isAuth, profile)


export default router
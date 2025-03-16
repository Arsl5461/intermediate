import express from 'express'
import { reg } from '../controllers/auth.controller.js'

const router = express.Router()


router.post('/reg', reg)


export default router
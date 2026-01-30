import express from 'express'
import { signinController, signupController } from '../controllers/auth.controller'

const router = express.Router()

router.post("/signup", signupController)

router.post("/login", signinController)

export default router
import express, { Router } from "express"
import userController from "../controllers/userController"
import fetchUser from "../middlewares/fetchUser"
const router: Router = express.Router()


router.get('/', fetchUser, userController.getUser)
router.post('/create', userController.createUser)
router.post('/login', userController.loginUser)

export default router
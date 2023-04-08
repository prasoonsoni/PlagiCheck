import express from "express"
import fetchUser from "../middlewares/fetchUser"
import plagiarismController from "../controllers/plagiarismController"
const router = express.Router()

router.use(fetchUser)
router.get('/levelone/:id', plagiarismController.checkLevelOne)
router.get('/leveltwo/:id', plagiarismController.checkLevelTwo)

export default router
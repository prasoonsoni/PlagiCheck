import express, { Router } from "express"
import researchPaperController from "../controllers/researchPaperController"
import fetchUser from "../middlewares/fetchUser"
const router: Router = express.Router()

router.get('/get/:id', researchPaperController.getResearchPaperById)
router.get('/all',fetchUser, researchPaperController.getAllResearchPapers)
router.post('/create', fetchUser,  researchPaperController.createResearchPaper)
router.put('/edit/:id', fetchUser,  researchPaperController.editResearchPaper)
router.delete('/delete/:id', fetchUser, researchPaperController.deleteResearchPaper)

export default router
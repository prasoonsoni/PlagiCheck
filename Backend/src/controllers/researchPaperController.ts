import User from "../models/User"
import ResearchPaper from "../models/ResearchPaper"
import { Response } from "express"
import { ObjectId } from "mongodb"

const createResearchPaper = async (req: any, res: Response) => {
    try {
        const user_id = new ObjectId(req.user._id)
        if (!user_id) {
            return res.json({ success: false, message: 'User Not Found.' })
        }
        const { title, authors, keywords, introduction, problem_statement_and_objectives, literature_review, methodology, bibliography } = req.body
        const researchPaper = await ResearchPaper.create({ user_id, title, authors, keywords, introduction, problem_statement_and_objectives, literature_review, methodology, bibliography })
        if (!researchPaper) {
            return res.json({ success: false, message: 'Error Creating Research Paper.' })
        }
        return res.json({ success: true, message: "Research Paper Created Successfully", data: { id: researchPaper._id } })
    } catch (error: any) {
        console.log(error.message)
        return res.json({ success: false, message: "Internal Server Error Occurred" })
    }
}

const editResearchPaper = async (req: any, res: Response) => {
    try {
        const user_id = new ObjectId(req.user._id)
        const research_paper_id = new ObjectId(req.params.id)
        if (!user_id || !research_paper_id) {
            return res.json({ success: false, message: 'User Or Research Paper Not Found.' })
        }
        if (!user_id) {
            return res.json({ success: false, message: 'User Not Found.' })
        }
        const researchPaper = await ResearchPaper.findOne({ _id: research_paper_id })
        if (!researchPaper) {
            return res.json({ success: false, message: 'Research Paper Not Found.' })
        }
        if (researchPaper.user_id.toString() !== user_id.toString()) {
            return res.json({
                success: false,
                message: 'You Do Not Have Permission To Edit This Research Paper.'
            })
        }
        const { title, authors, keywords, introduction, problem_statement_and_objectives, literature_review, methodology, bibliography } = req.body
        const updateResearchPaper = await ResearchPaper.updateOne({ _id: research_paper_id }, { $set: { title, authors, keywords, introduction, problem_statement_and_objectives, literature_review, methodology, bibliography, } })
        if (!updateResearchPaper.acknowledged) {
            return res.json({ success: false, message: 'Error Updating Research Paper.' })
        }
        return res.json({ success: true, message: 'Research Paper Updated Successfully.' })
    } catch (error: any) {
        console.log(error.message)
        res.json({ success: false, message: 'Internal Server Error Occurred.' })
    }
}

const deleteResearchPaper = async (req: any, res: Response) => {
    try {
        const user_id = new ObjectId(req.user._id)
        const research_paper_id = new ObjectId(req.params.id)
        if (!user_id || !research_paper_id) {
            return res.json({ success: false, message: 'User Or Research Paper Not Found.' })
        }
        if (!user_id) {
            return res.json({ success: false, message: 'User Not Found.' })
        }
        const researchPaper = await ResearchPaper.findOne({ _id: research_paper_id })

        if (!researchPaper) {
            return res.json({ success: false, message: 'Research Paper Not Found.' })
        }
        if (researchPaper.user_id.toString() !== user_id.toString()) {
            return res.json({ success: false, message: 'You Do Not Have Permission To Delete This Research Paper.' })
        }
        const deleteResearchProposal = await ResearchPaper.deleteOne({ _id: research_paper_id })
        if (!deleteResearchProposal.acknowledged) {
            return res.json({ success: false, message: 'Error Deleting Research Paper.' })
        }

        return res.json({ success: true, message: 'Research Paper Deleted Successfully.' })
    } catch (error: any) {
        console.log(error.message)
        res.json({ success: false, message: 'Internal Server Error Occurred.' })
    }
}

const getResearchPaperById = async (req: any, res: Response) => {
    try {
        const research_paper_id = new ObjectId(req.params.id)
        const researchPaper = await ResearchPaper.findOne({ _id: research_paper_id })
        if (!researchPaper) {
            return res.json({ success: false, message: 'Research Paper Not Found.' })
        }
        return res.json({ success: true, message: "Research Paper Found Successfully", data: researchPaper })
    } catch (err: any) {
        console.log(err.message)
        return res.json({ success: false, message: "Internal Server Error Occurred" })
    }
}

const getAllResearchPapers = async (req: any, res: Response) => {
    try {
        const user_id = new ObjectId(req.user._id)
        const researchPapers = await ResearchPaper.find({ user_id })
        return res.json({ success: true, message: "Research Papers Found Successfully", data: researchPapers })
    } catch (error: any) {
        console.log(error.message)
        return res.json({ success: false, message: "Internal Server Error Occurred" })
    }
}

export default { createResearchPaper, editResearchPaper, deleteResearchPaper, getAllResearchPapers, getResearchPaperById }
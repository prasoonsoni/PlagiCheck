import { ObjectId } from "mongodb"
import ResearchPaper from "../models/ResearchPaper"
import User from "../models/User"
import { Response } from "express"

const checkLevelOne = async (req: any, res: Response) => {
    try {
        const user_id = new ObjectId(req.user._id)
        const research_paper_id = new ObjectId(req.params.id)
        const user = await User.findOne({ _id: user_id })
        const research_paper = await ResearchPaper.findOne({ _id: research_paper_id })
        if (!user) {
            return res.json({ success: false, message: 'User Not Found.' })
        }
        if (!research_paper) {
            return res.json({ success: false, message: 'Research Proposal Not Found.' })
        }
        if (user._id.toString() !== research_paper.user_id.toString()) {
            return res.json({ success: false, message: 'You are not authorized to access this resource.' })
        }
        const allPapers = await ResearchPaper.find({ _id: { $not: { $eq: research_paper_id } } })
        const plagiarismReport = []
        let sum = 0;
        for (let i = 0; i < allPapers.length; i++) {
            if (allPapers[i]._id !== research_paper_id) {
                const result = await fetch('http://127.0.0.1:8000/level1ReferencesPlagiarism/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        og: {
                            og_keywords: allPapers[i].keywords,
                            og_bibliography: allPapers[i].bibliography,
                            og_literature_review: allPapers[i].literature_review
                        },
                        sus: {
                            sus_keywords: research_paper.keywords,
                            sus_bibliography: research_paper.bibliography,
                            sus_literature_review: research_paper.literature_review
                        },
                        type: 0
                    })
                })
                const data: any = await result.json()
                if (data.level1_check * 100 >= 10) {
                    sum += data.level1_check * 100
                    const report = { id: allPapers[i]._id, plagiarism: data.level1_check * 100 }
                    plagiarismReport.push(report)
                }
            }
        }
        return res.json({ success: true, message: 'Level 1 Plagiarism report generated successfully.', data: plagiarismReport, mean: sum / plagiarismReport.length })

    } catch (error: any) {
        console.log(error.message)
        return res.json({ success: false, message: "Internal Server Error Occurred" })
    }
}

const checkLevelTwo = async (req: any, res: Response) => {
    try {
        const user_id = new ObjectId(req.user._id)
        const research_paper_id = new ObjectId(req.params.id)
        const user = await User.findOne({ _id: user_id })
        const research_paper = await ResearchPaper.findOne({ _id: research_paper_id })
        if (!user) {
            return res.json({ success: false, message: 'User Not Found.' })
        }
        if (!research_paper) {
            return res.json({ success: false, message: 'Research Paper Not Found.' })
        }
        if (user._id.toString() !== research_paper.user_id.toString()) {
            return res.json({ success: false, message: 'You are not authorized to access this resource.' })
        }
        const allPapers = await ResearchPaper.find({ _id: { $not: { $eq: research_paper_id } } })
        const plagiarismReport = []
        let sum = 0;
        for (let i = 0; i < allPapers.length; i++) {
            const result = await fetch('http://127.0.0.1:8000/level2CheckPlagiarism/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    og: {
                        og_title: allPapers[i].title,
                        og_ps_obj: allPapers[i].problem_statement_and_objectives,
                        og_introduction: allPapers[i].introduction,
                        og_keywords: allPapers[i].keywords,
                        og_proposed_method: allPapers[i].methodology
                    },
                    sus: {
                        sus_title: research_paper.title,
                        sus_ps_obj: research_paper.problem_statement_and_objectives,
                        sus_introduction: research_paper.introduction,
                        sus_keywords: research_paper.keywords,
                        sus_proposed_method: research_paper.methodology
                    },
                    type: 0
                })
            })
            const data = await result.json()
            if (data.similarity_score * 100 >= 10) {
                sum += data.similarity_score * 100
                const report = { id: allPapers[i]._id, plagiarism: data.similarity_score * 100, }
                plagiarismReport.push(report)
            }

        }
        return res.json({ success: true, message: 'Level 2 Plagiarism report generated successfully.', data: plagiarismReport, mean: sum / plagiarismReport.length })

    } catch (error: any) {
        console.log(error.message)
        return res.json({ success: false, message: "Internal Server Error Occurred" })
    }
}

export default { checkLevelOne, checkLevelTwo }
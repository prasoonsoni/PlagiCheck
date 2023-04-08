import mongoose from "mongoose"
const { Schema } = mongoose
const ResearchPaperSchema = new Schema({
    user_id: { type: mongoose.Types.ObjectId, required: true },
    title: { type: String, default: '' },
    authors: { type: String, default: '' },
    keywords: { type: String, default: '' },
    introduction: { type: String, default: '' },
    problem_statement_and_objectives: { type: String, default: '' },
    literature_review: { type: String, default: '' },
    methodology: { type: String, default: '' },
    bibliography: { type: String, default: '' },
}, { timestamps: true })

export default mongoose.model('ResearchPaper', ResearchPaperSchema)
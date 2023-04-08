import User from "../models/User"
import { Request, Response } from "express"
import dotenv from "dotenv"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import FetchUserRequest from "../interfaces/FetchUserRequest"
dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET || "Th15i5TeM9JWT"

const createUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const alreadyExist = await User.findOne({ email })
        if (alreadyExist) {
            return res.json({ success: false, message: "Account Already Exist" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ email, password: hashedPassword })
        if (!user) {
            return res.json({ success: false, message: "Error Creating User" })
        }
        return res.json({ success: true, message: "Account Created Successfully" })
    } catch (error: any) {
        console.log(error.message)
        return res.json({ success: false, message: "Internal Server Error Occurred" })
    }
}

const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: "Account Not Found" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({ success: false, message: 'Incorrect Password.' })
        }
        const data = { user: { _id: user._id } }
        const token = jwt.sign(data, JWT_SECRET)
        return res.json({
            success: true,
            message: 'User Logged In Successfully.',
            token
        })
    } catch (error: any) {
        console.log(error.message)
        return res.json({ success: false, message: "Internal Server Error Occurred" })
    }
}

const getUser = async (req: any, res: Response) => {
    try {
        const user = await User.findOne({ _id: req.user._id }).select('-password')
        if (!user) {
            return res.json({ success: false, message: 'User Not Found.' })
        }
        return res.json({ success: true, message: 'User Found Successfully.', user })
    } catch (error: any) {
        console.log(error.message)
        return res.json({ success: false, message: "Internal Server Error Occurred" })
    }
}
export default { createUser, loginUser, getUser }
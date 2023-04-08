import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { Response, NextFunction } from 'express'
import FetchUserJwtPayload from '../interfaces/FetchUserJWTPayload'
dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET || "Th15i5TeM9JWT"
const fetchUser = async (req: any, res: Response, next: NextFunction) => {
    const token = req.header('auth-token')
    if (!token) {
        return res.json({ success: false, message: 'Authentication token is required.' })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET) as FetchUserJwtPayload
        req.user = data.user
        next()
    } catch (error: any) {
        res.json({ success: false, message: 'Authentication token is not valid.' })
        console.log(error.message)
    }
}

export default fetchUser

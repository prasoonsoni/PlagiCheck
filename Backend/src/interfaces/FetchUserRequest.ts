import { Request } from "express";
export default interface FetchUserRequest extends Request {
    user: any
} 
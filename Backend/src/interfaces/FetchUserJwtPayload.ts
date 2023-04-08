import { JwtPayload } from "jsonwebtoken"
export default interface FetchUserJwtPayload extends JwtPayload {
    user: Object
}
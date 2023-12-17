import { post } from "../utils/request"

export const sendMail = async() => {
    const result = post("notifications");
    return result
}
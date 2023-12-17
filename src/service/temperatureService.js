import { get, post } from "../utils/request"

export const getTemperatures = async () => {
    const result = await get("temperature")
    return result
}

export const updateTemp = async (options) => {
    const result = await post("temperature/create", options)
    return result
}
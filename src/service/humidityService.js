import { get, post } from "../utils/request"

export const getHumidities = async () => {
    const result = await get("humidity")
    return result
}

export const updateHum = async (options) => {
    const result = await post("humidity/create", options)
    return result
}
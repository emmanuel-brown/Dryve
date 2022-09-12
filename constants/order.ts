import { secureApi } from "../data/requests"
import { QuantityT, ServiceI } from "../interface/api"
import { apiUrl } from "./values"


interface CreateOrderI {
    cleanerId: string
    pickupAddress: string //address id: '_id'
    cardId: string
    requests: (ServiceI & QuantityT)[]
    token: string
}

export const createOrder = async ({
    cleanerId,
    pickupAddress,
    cardId,
    requests,
    token
}: CreateOrderI) => {
    try {
        const desiredServices = requests.map(req => {
            return {
                quantity: req.quantity,
                service: req._id
            }
        })
        const postData = {
            cleanerId,
            pickupAddress,
            cardId,
            desiredServices
        }
        await secureApi(token).post(`${apiUrl}/client/request_pickup`, postData)
    } catch(e) {
        console.log('could not create order', e)
    }
}
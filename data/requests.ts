import axios from 'axios'
import { AddressI, AptBuildingI, AptI, CleanerI, OrderI, UnitI } from '../interface/api'

export const apiUrl = process.env.React_APP_APIURL ? process.env.React_APP_APIURL : "https://guarded-temple-56367.herokuapp.com"

/**
 * This function returns an axios instance with a baseURL and a header with an Authorization key and a
 * value of Bearer and the providedToken or null if no token is provided.
 * @param {string} [providedToken] - The token that is passed in from the user.
 * @returns An axios instance with a baseURL and headers.
 */
export const secureApi = (providedToken?: string) => {
    return axios.create({
        baseURL: apiUrl,
        headers: {
            "Authorization": `Bearer ${ providedToken ? providedToken : 'null' }`,
        }
    })
}

/**
 * It makes a post request to the server, and returns the data from the response.
 * @param {string} token - string,
 * @param {number} latitude - number,
 * @param {number} longitude - -122.4194
 * @param {number} maxDistance - number = 10
 * @returns clns:  [
 *   {
 *     "id": "5d8f9b8f8b9c8a0017b8f8b9",
 *     "name": "John Doe",
 *     "email": "john@doe.com",
 *     "phone": "1234567890",
 *     "address": AddressI
*/
export const getNearByClns = async (
    token: string,
    latitude: number,
    longitude: number,
    maxDistance: number
) => {
    try {
        const clns = await secureApi(token)
            .post<CleanerI[]>('/client/cleaners_nearby', {
                latitude,
                longitude,
                maxDistance //in milesp
            }).then(res => res.data)

            return clns
    } catch(e) {
        return []
    }
}

/**
 * Get all apartments from the server, if there's an error, return an empty array
 * @param {string} token - string - the token that is used to authenticate the user
 * @returns An array of AptI objects.
*/
export const getApartments = async (token: string) => {
    try {
        const apts = await secureApi(token)
            .get<AptI[]>('/driver/apartments')
            .then(res => res.data)

        return apts
    } catch(e) {
        return []
    }
}

/**
 * This function returns an apartment object if the token is valid, otherwise it returns null.
 * @param {string} token - string - the token that is used to authenticate the user
 * @param {string} aptId - string - the id of the apartment
 * @returns The return type is AptI.
*/
export const getApartment = async (
    token: string,
    aptId: string
) => {
    try {
        const apt = await secureApi(token)
            .get<AptI>(`/driver/apartment/${ aptId }`)
            .then(res => res.data)
        
        return apt
    } catch {
        return null
    }
}

/**
 * This function will return an object of type AptI if the request is successful, otherwise it will
 * return null.
 * @param {string} token - string,
 * @param {string} aptId - string,
 * @param {string} bldId - string
 * @returns An object with a property called data that is an array of objects.
*/
export const getActiveUnits = async (
    token: string,
    aptId: string,
    bldId: string
) => {
    try {
        const activeUnits = await secureApi(token)
            .get<{[unit: string]: UnitI}>(`/driver/apartment/${ aptId }/${bldId}/active_units`)
            .then(res => res.data)
        
        return activeUnits
    } catch {
        return null
    }
}

/**
 * This function will return a unit object if the token is valid, otherwise it will return null.
 * @param {string} token - string,
 * @param {string} aptId - string,
 * @param {string} bldId - string,
 * @param {string} unitId
 * @returns The return type is UnitI.
*/
export const getUnit = async (
    token: string,
    aptId: string,
    bldId: string,
    unitId: string
) => {
    try {
        const unit = await secureApi(token)
            .get<UnitI>(`/driver/apartment/${aptId}/${bldId}/${unitId}`)
            .then(res => res.data)

        return unit
    } catch {
        return null
    }
}

/**
 * This function takes a token, an apartment id, a building id, and a unit id, and returns an order
 * object or null.
 * @param {string} token - string,
 * @param {string} aptId - string,
 * @param {string} bldId - string,
 * @param {string} unitId - string
 * @returns The return type is OrderI.
 */
export const cancelUnitOrder = async (
    token: string,
    aptId: string,
    bldId: string,
    unitId: string
) => {
    try {
        const order = await secureApi(token)
            .delete<OrderI>(`/driver/order/${aptId}/${bldId}/${unitId}/cancel_order`)
            .then(res => res.data)

        return order
    } catch {
        return null
    }
}

export const createOrder = async (
    token: string,
    aptId: string,
    bldId: string,
    unitId: string
) => {
    try {
        const order = await secureApi(token)
            .post<OrderI>(`/driver/order/create/${aptId}/${bldId}/${unitId}`)
            .then(res => res.data)

        return order
    } catch {
        return null
    }
}
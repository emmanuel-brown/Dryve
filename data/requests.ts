import axios from 'axios'
import { AddressI, AptI, CleanerI } from '../interface/api'

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
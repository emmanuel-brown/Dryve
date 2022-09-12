import axios from 'axios'
import { CleanerI } from '../interface/api'

export const apiUrl = process.env.React_APP_APIURL ? process.env.React_APP_APIURL : "https://guarded-temple-56367.herokuapp.com"

export const secureApi = (providedToken?: string) => {
    return axios.create({
        baseURL: apiUrl,
        headers: {
            "Authorization": `Bearer ${ providedToken ? providedToken : 'null' }`,
        }
    })
}

export const getNearByClns = async (
    token: string,
    latitude: number,
    longitude: number,
    maxDistance: number
) => {
    try {
        console.log('it got here')
        const clns = await secureApi(token)
            .post<CleanerI[]>('/client/cleaners_nearby', {
                latitude,
                longitude,
                maxDistance //in miles
            }).then(res => res.data)

            console.log('clns: ', clns)

            return clns
    } catch(e) {
        console.log('getNearByClns error', e)
        return []
    }
}
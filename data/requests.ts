import axios from 'axios'

export const apiUrl = process.env.React_APP_APIURL ? process.env.React_APP_APIURL : "https://guarded-temple-56367.herokuapp.com"

export const secureApi = (providedToken?: string) => {
    return axios.create({
        baseURL: apiUrl,
        headers: {
            "Authorization": `Bearer ${ providedToken ? providedToken : 'null' }`,
        }
    })
}
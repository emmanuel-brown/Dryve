import axios from 'axios'

const apiUrl = process.env.React_APP_API ? process.env.React_APP_API : ""

export const secureApi = (providedToken?: string) => {
    return axios.create({
        baseURL: apiUrl,
        headers: {
            "Authorization": `Bearer ${ providedToken  }`,
        }
    })
}
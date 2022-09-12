import AsyncStorage from "@react-native-async-storage/async-storage"
import _ from "lodash"
import { useEffect, useState } from "react"
import { storeItem } from "../constants/general"
import { CleanerI, ServiceI } from "../interface/api"

/*
    This hook handles the user's desired
    service for their order.

    It also locally stores the data these
    request for when the user return to 
    the requests screen.
*/
const RequestsHook = (preferredCleaner: CleanerI | undefined) => {
    const [ requests, setRequests ] = useState<ServiceI[]>([])

    if(!preferredCleaner) return { requests, setRequests }

    useEffect(() => {
        const handleAsync = async () => {
            const storedRequesets = await AsyncStorage.getItem('requests')
            console.log('storedRequesets: ', storedRequesets)
            //edit: validate stored requests
            //if stored reqeusts exists put it in state
            if(storedRequesets) {
                const parsedRequests: ServiceI[] = JSON.parse(storedRequesets)

                const uniqueRequests = _.uniqBy(parsedRequests, '_id')
                console.log('uniqueRequests', uniqueRequests)
                const filterUniq = uniqueRequests.filter(req => {
                    return !_.includes(
                        preferredCleaner.services,
                        req
                    )
                })

                console.log('filterUniq: ', filterUniq)

                console.log('filterUniq.length', filterUniq.length)
                console.log('uniqueRequests: ', uniqueRequests.length)

                if(filterUniq.length === uniqueRequests.length) {
                    setRequests(parsedRequests)
                }
            }
        }

        handleAsync()
    }, [])

    useEffect(() => {
        if(requests.length) {
            console.log('attacked')
            AsyncStorage.setItem('requests', JSON.stringify(requests))
        }
    }, [ requests ])

    return { requests, setRequests }
}

export default RequestsHook
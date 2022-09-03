import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react"
import { storeItem } from "../constants/general"
import { ServiceI } from "../interface/api"


const RequestsHook = () => {
    const [ requests, setRequests ] = useState<ServiceI[] | []>([])
    
    useEffect(() => {
        const handleAsync = async () => {
            const storedRequesets = await AsyncStorage.getItem('requests')
            //edit: validate stored requests
            //if stored reqeusts exists put it in state
            if(storedRequesets) {
                console.log('storedRequests: ',)
                setRequests(JSON.parse(storedRequesets))
            }
        }

        handleAsync()
        return () => {
            if(requests) return
            storeItem('requests', requests)
        }
    }, [])

    useEffect(() => {
        if(requests) storeItem('requests', requests)
    }, [ requests ])

    return { requests, setRequests }
}

export default RequestsHook
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { LocationObject } from 'expo-location';
import { add } from 'lodash';
import React, { useState, createContext, Dispatch, SetStateAction, useEffect } from 'react';
import { apiUrl, secureApi } from '../data/requests';
import { AddressI } from '../interface/api';


export interface GlobalI {
    token: string
    loading: boolean
    location?: {
        longitude: number,
        latitude: number
    }
    pickupAddress?: AddressI
    preferredCleaner: string
}

interface contextI {
    global: GlobalI
    setGlobal?: Dispatch<SetStateAction<GlobalI>>
}

export const GlobalContext = createContext<any>({});

interface GlobalContextProps {
    children: any
}

const GlobalContextProvider = (props: GlobalContextProps) => {
    const [ global, setGlobal ] = useState<GlobalI>({
        //if token doesn't exist user should
        //have to go to login screen
        token: "",
        preferredCleaner: '',
        loading: true
    })

    //get and set token from device storage
    const retreiveToken = async () => {
        try {
            //get token for device storage
            const token = await AsyncStorage.getItem('token')
            
            //if token is not falsy, store it in global contexts
            if(token) setGlobal({ ...global, token })

            //only if token exists
            //edit: need to handle invalid or expired token
            
        } catch(e) {
            console.log(e)
        }
    }

    const onTokenUpdate = async (token: string) => {
        try {
            
            if(token) {
                AsyncStorage.setItem('token', token)

                //get geo location from first pickup address
                const getPickup = await secureApi(token)
                    .get<AddressI>(`${ apiUrl }/client/retreive/pickupAddress`)
                    .then(res => {
                        return res.data
                    })
                    .catch((e) => {
                        console.log('failed: ', 'get pickups in global.tsx')
                    })

                if(getPickup) {
                    setGlobal({...global, 
                        location: {
                            latitude: getPickup.location.coordinates[0],
                            longitude: getPickup.location.coordinates[1]
                        },
                        pickupAddress: getPickup
                    })
                }
            }
        } catch {
            console.log('unable to store token')
        }
    }

    useEffect(() => {
        (async () => {
            try {
                await retreiveToken()
            } finally {
                setGlobal({...global, loading: false})
            }
        })()
    }, [])

    useEffect(() => {
        if(global.token) {
            onTokenUpdate(global.token).finally(() => setGlobal({ ...global, loading: false }))
        }
    }, [ global.token ])


    const passDown: contextI = { global, setGlobal }
        
    return (
        <GlobalContext.Provider value={ passDown }>
            { props.children }
        </GlobalContext.Provider>
    )
}
 
export default GlobalContextProvider


export const useGlobalContext = (): { 
    global: GlobalI, 
    setGlobal: Dispatch<SetStateAction<GlobalI>> 
} => React.useContext(GlobalContext)

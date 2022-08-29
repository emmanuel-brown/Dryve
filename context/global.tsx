import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { LocationObject } from 'expo-location';
import React, { useState, createContext, Dispatch, SetStateAction, useEffect } from 'react';
import useAsyncEffect from 'use-async-effect';
import { apiUrl, secureApi } from '../data/requests';
import { AddressI, CleanerI } from '../interface/api';


export interface GlobalI {
    token: string
    location?: {
        longitude: number,
        latitude: number
    }
    preferredCleaner?: CleanerI
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
        token: "",
    })
    console.log('token: ', global.token)
    useAsyncEffect(async isActive => {
        try {
            const token = await AsyncStorage.getItem('token')
            console.log('token: ', await AsyncStorage.getItem('token'))
            if(!isActive()) return

            if(token) setGlobal({ ...global, token })

            //only if token exists
            //edit: need to handle invalid or expired token
            
        } catch(e) {
            console.log(e)
        }
    }, [])

    useAsyncEffect(async isActive => {
        try {
            const token = global.token
            AsyncStorage.setItem('token', token)
            if(!isActive()) return

            if(token) {

                //get user's preferred cleaner data
                await secureApi(global.token).get<CleanerI>(`${apiUrl}client/retreive/preferredCleaner`)
                    .then(res => {
                        console.log('data: ', res.data)
                        setGlobal({ ...global, preferredCleaner: res.data })
                        return res.data
                    })
                    .catch((e) => {
                        console.log('failed: ', 'get preferredCleaner in global.tsx')
                    })
                
                

                console.log('preferredCleaner', global.preferredCleaner)

                //get geo location from first pickup address
                const getPickups: AddressI[] = await secureApi(token).get(`${ apiUrl }/client/retreive/pickups`)
                    .then(res => res.data)
                    .catch((e) => {
                        console.log('failed: ', 'get pickups in global.tsx')
                    })
                if(!isActive()) return
                
                if(getPickups.length) {
                    setGlobal({...global, location: {
                        latitude: getPickups[0].location.coordinates[0],
                        longitude: getPickups[0].location.coordinates[1]
                    }})
                }
            }

        } catch {
            console.log('unable to store token')
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

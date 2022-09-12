import { useFocusEffect } from '@react-navigation/native'
import { useState, useEffect, useCallback } from 'react'
import { apiUrl, secureApi } from '../data/requests'
import { AddressI } from '../interface/api'

const pickupsHook = (token: string) => {
    const [ pickups, setPickups ] = useState<AddressI[]>([])
    const [ pickupAddress, setPickupAddress ] = useState<AddressI>()
    const [ render, reRender ] = useState<1>(1)


    const getPickups = async () => {
        const pickupsData = await secureApi(token)
            .get<AddressI[]>(`${ apiUrl }/client/retreive/pickups`)
            .then(res => res.data)
            .catch((e) => {
                return []
            })

        setPickups(pickupsData)
        //find address with truthy pickup address
        setPickupAddress(
            pickupsData.filter(addy => addy.default)[0]
        )
    }

    // useEffect(() => {
    //     reRender
    // }, [])

    useEffect(() => {
        getPickups()
    }, [ render ])

    return {
        pickups,
        pickupAddress,
        reRender
    }
}

export default pickupsHook
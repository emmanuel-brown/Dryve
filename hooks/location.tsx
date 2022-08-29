import { useState } from 'react'
import { Alert } from 'react-native'
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location'
import useAsyncEffect from 'use-async-effect'
import { useGlobalContext } from '../context/global'

const locationHook = () => {
    const { global, setGlobal } = useGlobalContext()
    const [ locationPermissionInformation, requestPermission ] = useForegroundPermissions()
    const [ locationPerm, setLocationPerm ] = useState(false)

    const verifyPermission = async () => {
        if(locationPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission()

            return permissionResponse.granted
        }

        if(locationPermissionInformation?.status === PermissionStatus.DENIED) {
            Alert.alert(
                'Insufficient Permissions!',
                'You need to grant access to location to use this app.'
            )
            return false
        }
        return true
    }

    const getLocationHandler = async (toGlobal?: boolean) => {
        const hasPermission = await verifyPermission()
        if(!hasPermission) {
            await requestPermission()
            return false
        }

        const location = await getCurrentPositionAsync()

        toGlobal && setGlobal({ ...global, location: {
            longitude: location.coords.longitude,
            latitude: location.coords.latitude
        }})

        return location
    }

    useAsyncEffect(async isActive => {
        try {
            const locPerm = await verifyPermission()
            if(!isActive()) return

            setLocationPerm(locPerm)
        } catch(e) {
            console.log(e)
        }
    })

    return {
        locationPermission: locationPerm,
        verifyPermission,
        getLocationHandler
    }
}

export default locationHook
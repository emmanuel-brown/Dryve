import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import axios from 'axios'
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location'
import { useCallback, useEffect, useState } from 'react'
import { StyleSheet, Text, Alert } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import useAsyncEffect from 'use-async-effect'
import { getLocationHandler, getMapPreview } from '../../constants/location'
import { useGlobalContext } from '../../context/global'
import { apiUrl, getNearByClns, secureApi } from '../../data/requests'
import locationHook from '../../hooks/location'
import driverTracking from '../../hooks/orderHook'
import pickupsHook from '../../hooks/pickupAddress'
import preferredCleanerHook from '../../hooks/preferredCleaner'
import { CleanerI } from '../../interface/api'
import { MapStackParamsList } from '../../interface/navigation'
import { colors } from '../../styles/colors'

type Region = {
    longitude: number
    latitude: number
    longitudeDelta: number
    latitudeDelta: number
}

interface MarkerI {
    latitude: number
    longitude: number
    title: string
    subTitle?: string
    _id: string
}

type mapProps = NativeStackNavigationProp<MapStackParamsList, 'map'>

const Map: React.FC = () => {
    const { global, setGlobal } = useGlobalContext()
    const [ clnMarkers, setClnMarkers ] = useState<CleanerI[]>([])
    const [ region, setRegion ] = useState<Region | undefined>()
    const [ loading, setLoading ] = useState<boolean>(true)
    const [ error, setError ] = useState<boolean>(false)

    const navigation = useNavigation<mapProps>()

    const { 
        locationPermission, 
        getLocationHandler 
    } = locationHook(global, setGlobal)

    const { location, token } = global

    const { driverLoc, driver } = driverTracking(token)

    const pickupData = pickupsHook(token)
    const { pickupAddress, pickups } = pickupData

    const handleRegion = async () => {
        try {
            //get user location
            const theLocation = await getLocationHandler(true)

            let forRegion: Region = {
                longitude: 0,
                latitude: 0,
                latitudeDelta: 0,
                longitudeDelta: 0
            }

            if(pickupAddress) {
                // getMapPreview(location.coords.latitude, location.coords.longitude)
                // if(!theLocation) return
                forRegion = {
                    longitude: pickupAddress.location.coordinates[1],
                    latitude: pickupAddress.location.coordinates[0],
                    latitudeDelta: 0.0421,
                    longitudeDelta: 0.0922
                }
            } else {
                console.log('theLocation: ', theLocation)
                if(!theLocation) return
                forRegion = {
                    longitude: theLocation.coords.longitude,
                    latitude: theLocation.coords.latitude,
                    latitudeDelta: 0.0421,
                    longitudeDelta: 0.0922
                }
            }

            if(forRegion.latitude && forRegion.longitude) {
                const cleanersData = await getNearByClns(
                    token,
                    forRegion.latitude,
                    forRegion.longitude,
                    20
                )

                setClnMarkers(cleanersData)
                setRegion(forRegion)
            } else {
                // setError(true)
                throw ''
            }
        } catch(e) {
            console.log(e)
        }
    }

    useFocusEffect(
        useCallback(() => {
            // pickupData.reRender(1)
            handleRegion()
                .finally(() => {
                    setLoading(false)
                })
        }, [])
    )

    if(loading) return <Text>Loading</Text>

    const onCleanerPress = (cleanerId: string) => {
        setLoading(true)
        navigation.navigate('cleanerInfo', { cleanerId })
    }

    if(error) return <Text>Unable to access location</Text>
    
    return (
        <MapView
            region={ region }
            style={styles.mapView}
            showsUserLocation={ true }
            provider='google'
            loadingEnabled={ true }
            showsPointsOfInterest={ false }
            userInterfaceStyle={ 'dark' }
        >
            {clnMarkers && clnMarkers.map(cln => <Marker
                key={cln._id}
                pinColor={ cln.preferred ? colors.black : colors.offGold }
                title={ cln.name }
                coordinate={{ 
                    latitude: cln.address.location.coordinates[1], 
                    longitude: cln.address.location.coordinates[0]
                }}
                onPress={() => onCleanerPress(cln._id)}
                identifier={ cln._id }
            />)}

            {driverLoc && <Marker
                key={ driver?._id }
                pinColor='blue'
                title={`${driver?.firstName} ${driver?.lastName}`}
                identifier={ driver?._id }
                coordinate={{
                    latitude: driverLoc.latitude,
                    longitude: driverLoc.longitude
                }}
            />}
        </MapView>
    )
}

const styles = StyleSheet.create({
    mapView: {
        flex: 1
    }
})

export default Map
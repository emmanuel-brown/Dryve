import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import axios from 'axios'
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location'
import { useEffect, useState } from 'react'
import { StyleSheet, Text, Alert } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import useAsyncEffect from 'use-async-effect'
import { getLocationHandler, getMapPreview } from '../../constants/location'
import { useGlobalContext } from '../../context/global'
import { apiUrl, secureApi } from '../../data/requests'
import locationHook from '../../hooks/location'
import { MapStackParamsList } from '../../interface/navigation'

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
    const [ clnMarkers, setClnMarkers ] = useState<MarkerI[]>([])
    const [ region, setRegion ] = useState<Region>({
        longitude: 0,
        latitude: 0,
        //defaulting to charlotte, NC
        // longitude: -80.843124,
        // latitude: 35.227085,
        latitudeDelta: .5,
        longitudeDelta: .5
    })

    const navigation = useNavigation<mapProps>()

    const { 
        locationPermission, 
        getLocationHandler 
    } = locationHook()

    const { location, token } = global

    useAsyncEffect(async isActive => {
        try {
            //get user location
            const theLocation = await getLocationHandler(true)

            if(!isActive()) return
            if(locationPermission) {
                // getMapPreview(location.coords.latitude, location.coords.longitude)
                if(!theLocation) return
                setGlobal({ ...global, location: {
                    longitude: theLocation.coords.longitude,
                    latitude: theLocation.coords.latitude
                }})
                setRegion({
                    longitude: theLocation.coords.longitude,
                    latitude: theLocation.coords.latitude,
                    latitudeDelta: 0.0421,
                    longitudeDelta: 0.0922
                })
            } else {
                if(!location) return
                setRegion({
                    longitude: location?.longitude ? location.longitude : -80.843124,
                    latitude: location?.latitude ? location.latitude : 35.227085,
                    latitudeDelta: 0.0421,
                    longitudeDelta: 0.0922
                })
            }
            
        } catch(e) {
            console.log(e)
        }
    }, [])

    //when region updates
    useAsyncEffect(async isActive => {
        console.log('region: ', region)
        if(region && token) {
            const cleaners = await secureApi(token).post(`${apiUrl}/client/cleaners_nearby`, {
                'latitude': region.latitude,
                'longitude': region.longitude,
                'maxDistance': 20
            }).then(res => res.data)
            .catch((e) => {
                console.log('failed: ', 'get cleaners in map.tsx')
            })
            if(!isActive) return

            setClnMarkers(cleaners.map((cln: any)=> ({
                latitude: cln.address.location.coordinates[1],
                longitude: cln.address.location.coordinates[0],
                title: cln.name,
                _id: cln._id
            })))
        }
    }, [ region ])

    return (
        <MapView 
            region={ region.latitude ? region : undefined }
            style={styles.mapView}
            showsUserLocation={ true }
            provider='google'
            loadingEnabled={ true }
            showsPointsOfInterest={ false }
            userInterfaceStyle={ 'dark' }
        >
            {clnMarkers.map(cln => <Marker
                key={cln._id}
                pinColor='purple'
                title={ cln.title }
                coordinate={{ latitude: cln.latitude, longitude: cln.longitude }}
                onPress={() => navigation.navigate('cleanerInfo', { cleanerId: cln._id })}
                identifier={ cln._id }
            />)}
        </MapView>
    )
}

const styles = StyleSheet.create({
    mapView: {
        flex: 1
    }
})

export default Map
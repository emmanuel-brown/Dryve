import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { RootStackParamList } from '../../interface/navigation'
import theme, { colors } from '../../styles/colors'
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location'
import { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useGlobalContext } from '../../context/global'
import useAsyncEffect from 'use-async-effect'

type createUserProp = NativeStackNavigationProp<RootStackParamList, 'creating'>

const CreatingUser = () => {
    const [ locationPermissionInformation, requestPermission ] = useForegroundPermissions()
    const [ userText, setUserText ] = useState<string>('Creating User')
    const { global, setGlobal } = useGlobalContext()
    const [ permissions, setPermissions ] = useState({
        location: false
    })

    const navigation = useNavigation<createUserProp>()

    const verifyPermission = async () => {
        if(locationPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission()
            setPermissions({ ...permissions, location: true })

            return permissionResponse.granted
        }

        if(locationPermissionInformation?.status === PermissionStatus.DENIED) {
            setUserText('Location access is needed to do orders')
            Alert.alert(
                'Insufficient Permissions!',
                'You need to grant access to location to use this app.'
            )
            return false
        }
        return true
    }

    const getLocationHandler = async () => {
        const hasPermission = await verifyPermission()

        if(!hasPermission) {
            await requestPermission()
            return false
        }

        const location = await getCurrentPositionAsync()

        setGlobal({ ...global, location: {
            longitude: location.coords.longitude,
            latitude: location.coords.latitude
        }})

        return location
    }

    useAsyncEffect(async () => {
        const didGetlocation = await getLocationHandler().then(res => res)
        
        if(didGetlocation) {
            navigation.navigate('home')
        }
    }, [])

    useEffect(() => {
        if(Object.values(permissions).every(perm => perm === true)) {
            navigation.navigate('home')
        }
    }, [ permissions ])

    return (
        <View style={styles.container}>
            <View style={styles.bubble}>
                <Text>{ userText }</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bubble: {
        borderRadius: 300,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.secondaryOffGold,
        borderColor: colors.orange,
        borderWidth: 3,
        height: 300,
        width: 300,
    }
})

export default CreatingUser
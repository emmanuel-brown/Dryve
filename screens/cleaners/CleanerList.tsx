import React, { useCallback, useState } from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { CleanerI } from '../../interface/api'
import { useGlobalContext } from '../../context/global'
import { getNearByClns } from '../../data/requests'
import pickupsHook from '../../hooks/pickupAddress'
import { colors } from '../../styles/colors'

const Cleaner: React.FC<CleanerI> = ({
    name,
    phoneNumber,
    preferred
}: CleanerI) => {
    return (
        <View style={preferred ? s.cleaner : s.preferredCleaner}>
            <Text style={s.cleanerHead}>{ name }</Text>
            <Text style={s.cleanerHead}>{ phoneNumber }</Text>
        </View>
    )
}

const CleanerList = () => {
    const [ loading, setLoading ] = useState<boolean>(true)
    const { global } = useGlobalContext()
    const [ cleaners, setCleaners ] = useState<CleanerI[]>([])
    const { pickupAddress, update } = pickupsHook(global.token)

    const initializeCleaners = async () => {
        try {
            // if(!pickupAddress) return
            const cleanersData = await getNearByClns(
                global.token,
                35.1698945,
                -80.9762814,
                10
            )

            setCleaners(cleanersData)
        } catch(e) {
            //edit: display 'no cleaners nearby'
            console.log('initializeCleaners Error: ', e)
        }
    }

    useFocusEffect(
        useCallback(() => {
                setLoading(true)
                update().then(async () => {
                    await initializeCleaners()
                        .finally(() => setLoading(false))
                }) 
        }, [])
    )

    return (
        <View style={s.mainContainer}>
            <Text style={s.mainHeadTxt}>Cleaners Nearby</Text>
            <View style={s.listContainer}>
                <ScrollView>
                    { cleaners.map(cln => <Cleaner key={cln._id} {...cln} />) }
                </ScrollView>
            </View>
        </View>
    )
}

const s = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.darkGrey,
        paddingTop: 100
    },
    mainHeadTxt: {
        textAlign: 'center',
        fontSize: 30,
        color: colors.orange,
        fontWeight: '900',
        marginBottom: 50
    },
    listContainer: {
        height: '100%',
        marginHorizontal: 50
    },
    cleaner: {
        maxWidth: 800,
        width: '100%',
        borderRadius: 20,
        backgroundColor: colors.offGold,
        marginBottom: 20,
        padding: 20
    },
    preferredCleaner: {
        maxWidth: 800,
        width: '100%',
        borderRadius: 20,
        backgroundColor: colors.offGold,
        borderColor: colors.orange,
        borderWidth: 2,
        marginBottom: 20,
        padding: 20
    },
    cleanerHead: {
        textAlign: 'center',
        color: colors.black,
        fontWeight: '800'
    }
})

export default CleanerList
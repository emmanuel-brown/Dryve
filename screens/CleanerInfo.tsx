import { useState, useEffect } from 'react'
import { View, Text, Linking, StyleSheet, Touchable, TouchableOpacity, ScrollView } from 'react-native'
import useAsyncEffect from 'use-async-effect'
import { apiUrl, secureApi } from '../data/requests'
import { useGlobalContext } from '../context/global'
import { CleanerI, ServiceI } from '../interface/api'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { MapStackParamsList } from '../interface/navigation'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { colors } from '../styles/colors'
import { stringPrice } from '../constants/money'
import axios from 'axios'

type cleanerNavProps = NativeStackNavigationProp<MapStackParamsList, 'cleanerInfo'>

const Service = ({
    title,
    price,
    description
}: ServiceI) => {
    return (
        <View style={s.service}>
            <Text style={s.servHead}>{ title }</Text>
            <Text style={s.servPrice}>{ stringPrice(price) }</Text>
        </View>
    )
}

const CleanerInfo: React.FC = () => {
    const [ cleaner, setCleaner ] = useState<CleanerI>()
    const { global } = useGlobalContext()
    const token = global.token

    const navigation = useNavigation<cleanerNavProps>()
    const { cleanerId } = useRoute<RouteProp<MapStackParamsList, 'cleanerInfo'>>().params

    useAsyncEffect(async isActive => {
        try {
            const getCleaner: CleanerI = await secureApi(token).get(`/client/cleaner/${ cleanerId }`)
                .then(res => res.data)
            if(!isActive) return

            setCleaner(getCleaner)
        } catch(e) {
            //redirect
            console.log(e)
        }
    }, [])

    if(!cleaner) {
        return (
            <View>
                <Text>Unable to Retreive Cleaner</Text>
            </View>
        )
    }

    const setPreferredCleaner = async () => {
        const preferredCleaner = await secureApi(token).put(`${apiUrl}/client/preferred_cleaner/${cleanerId}`)
    }

    const isAssigned = cleanerId === global.preferredCleaner?._id

    return (
        <View style={s.container}>
            <View style={s.infoContainer}>
                <Text style={s.head}>{ cleaner.name }</Text>
                <TouchableOpacity onPress={() => Linking.openURL(`tel:${ cleaner.phoneNumber }`)}>
                    <Text style={s.head}>{ cleaner.phoneNumber }</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => !isAssigned && setPreferredCleaner}>
                    <View style={s.assignBttn}>
                        <Text style={s.assignBttnTxt}>{
                            isAssigned ? 'Assign Cleaner'
                            : 'Assigned Cleaner'
                        }</Text>
                    </View>
                </TouchableOpacity>

            </View>
            <ScrollView >
                <View style={s.serviceContainer}>
                    {cleaner.services.map(svs => <>
                            <Service {...svs} />
                            <Service {...svs} />
                            <Service {...svs} />
                            <Service {...svs} />
                            <Service {...svs} />
                            <Service {...svs} />
                            <Service {...svs} />
                            <Service {...svs} />
                            <Service {...svs} />
                            <Service {...svs} />
                            <Service {...svs} />
                            <Service {...svs} />
                            <Service {...svs} />
                            <Service {...svs} />
                            <Service {...svs} />
                            <Service {...svs} />
                            <Service {...svs} />
                            <Service {...svs} />
                        </>
                    )}
                </View>
            </ScrollView>
        </View>
    )
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.darkGrey
    },
    infoContainer: {
        height: '30%',
        maxWidth: 500,
        alignItems: 'center',
    },
    head: {
        fontSize: 20,
        color: colors.offGold
    },
    assignBttn: {
        backgroundColor: colors.black,
        minWidth: '40%',
        textAlign: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        marginTop: '10%'
    },
    assignBttnTxt: {
        color: colors.offGold,
        fontSize: 18,
    },
    serviceContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    service: {
        width: '50%',
        alignItems: 'center',
        height: 100,
        borderColor: colors.offGold,
        borderBottomColor: colors.offGold,
        borderWidth: 1,
        padding: 10
    },
    servHead: {
        color: colors.offGold,
        fontWeight: 'bold',
        fontSize: 20,
    },
    servPrice: {
        color: colors.secondaryOffGold,
        fontWeight: 'bold',
        fontSize: 18,
    },
    servDescription: {
        textAlign: 'center',
    },
})

export default CleanerInfo
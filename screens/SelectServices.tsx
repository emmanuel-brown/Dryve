import { useEffect, useState } from "react"
import { useGlobalContext } from "../context/global"
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { ServiceI } from "../interface/api"
import { colors } from "../styles/colors"
import { OrderStackParams } from "../interface/navigation"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"

interface RequestsI  {
    title: string
    quantity: number
}

type selectServicesProps = NativeStackNavigationProp<OrderStackParams, 'selectServices'>

const Request = ({
    title,
    quantity
}: RequestsI) => {

    return (
        <View>
            <View>
                <Text>{title}</Text>
                <Text>{quantity}</Text>
            </View>
        </View>
    )
}

/*
    
*/
const SelectServices: React.FC = () => {
    const { global, setGlobal } = useGlobalContext()
    const navigation = useNavigation<selectServicesProps>()
    const { 
        requests,
        setRequests
    } = useRoute<RouteProp<OrderStackParams, 'selectServices'>>().params
    //required services
    const [ desiredSvs, setDesiredSvs ] = useState<string[]>()
    //cln is short for cleaner
    const cln = global.preferredCleaner
    if(!cln) return (
        <Text>No preferred cleaner</Text>
    )
    const services = cln.services


    useEffect(() => {
        /*
            If cleaner does not exist
            route to nearby cleaners
        */
        if(!cln) {
            //edit: create nearby cleaner screen
        }
    })

    return (
        <View style={s.container}>
            <ScrollView horizontal={ true }>
                <View style={s.banner}>
                    {services.map(svs => <Request 
                        key={svs._id}
                        title={ svs.title }
                        quantity={ 1 }
                    />)}
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
    banner: {
        height: 70,
        width: '100%',
        backgroundColor: colors.black,
        alignItems: 'center',
        flexDirection: 'row'
    }
})

export default SelectServices
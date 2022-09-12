import { useEffect, useState } from "react"
import { useGlobalContext } from "../../context/global"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import { QuantityT, ServiceI, ServiceRequestsI } from "../../interface/api"
import { colors } from "../../styles/colors"
import { OrderStackParams } from "../../interface/navigation"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { stringPrice } from "../../constants/money"
import { storeItem, uniqueWithQuantity } from "../../constants/general"
import RequestsHook from "../../hooks/requests"
import _ from "lodash"
import preferredCleanerHook from "../../hooks/preferredCleaner"

interface RequestsI  {
    title: string
    quantity: number
}

type SelectServicesProps = NativeStackNavigationProp<OrderStackParams, 'selectServices'>

const Request = ({
    title,
    quantity
}: RequestsI) => {

    return (
        <View style={s.selServContainer}>
            <View style={s.selServTxt}>
                <Text style={s.selServTitle}>{title}</Text>
                <Text style={s.selServQuan}>{quantity}</Text>
            </View>
        </View>
    )
}


interface ServiceFCI extends ServiceI {
    plus: Function
    minus: Function
}

const Service = ({
    title,
    price,
    description,
    plus,
    minus
}: ServiceFCI) => {

    return (
        <TouchableOpacity>
            <View style={s.servContainer}>
                <View style={s.servTxt}>
                    <Text style={s.servTitle}>{title}</Text>
                    <Text style={s.servDescription}>{description}</Text>
                    <Text style={s.servPrice}>{ stringPrice(price) }</Text>
                </View>
                <TouchableOpacity onPress={() => minus()}>
                    <View style={s.minus}>
                        <Text style={s.opTxt}>-</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => plus()}>
                    <View style={s.plus}>
                        <Text style={s.opTxt}>+</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

/*
    
*/

// interface Props {
//     navigation: NavigationScreenProp<SelectServicesProps>
// }
const SelectServices: React.FC = () => {
    const { global, setGlobal } = useGlobalContext()
    const navigation = useNavigation<SelectServicesProps>()
    const { 
        preferredCleaner,
        requests,
        setRequests 
    } = preferredCleanerHook(global.token)   

    const addMinus = (service: ServiceI, isMinus?: boolean) => {
        if(!isMinus) {
            setRequests([...requests, service ])
        } else {
            /*
                okay so there is a much better
                way to do this... but it works
            */
            if(!requests.length) return
            let didUpdate = false
            const newReqs: ServiceI[] = []
            requests.forEach(req => {
                if(didUpdate) return newReqs.push(req)
                if(req._id === service._id) {
                    didUpdate = true
                    return
                } else {
                    newReqs.push(req)
                }
            })
            
            setRequests(newReqs)
        }
    }

    //cln is short for cleaner
    const cln = preferredCleaner
    if(!cln?._id) return (
        <Text>No preferred cleaner</Text>
    )
    const services = cln.services

    const filteredReqs = () => {
        return uniqueWithQuantity<ServiceI>(requests, '_id')
    }

    return (
        <View style={s.container}>
            <View style={s.banner}>
                <ScrollView horizontal={ true } style={s.scrollBanner}>
                        {requests && filteredReqs().map(svs => <Request 
                            key={svs._id}
                            title={ svs.title }
                            //@ts-ignore
                            quantity={ svs.quantity }
                        />)}
                </ScrollView>
            </View>
            <View style={s.servicesContainer}>
                <ScrollView style={s.servicesCntrScroll}>
                        {services.map(svs => <Service
                            key={svs._id}
                            {...svs}
                            plus={ () => addMinus(svs) }
                            minus={ () => addMinus(svs, true) }
                        />)}
                </ScrollView>
            </View>
            <TouchableOpacity
                onPress={() => navigation.navigate('pricing')}
                style={s.sumbitBttn}
            >
                <Text style={s.submitBttnTxt}>Request</Text>
            </TouchableOpacity>
        </View>
    )
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.darkGrey
    },
    banner: {
        width: '100%',
        height: 70,
        backgroundColor: colors.black,
        alignItems: 'center',
        flexDirection: 'row'
    },
    scrollBanner: {
        // width: '100%',
    },
    selServContainer: {
        backgroundColor: 'blue',
        minWidth: 100,
        height: 35,
        borderRadius: 100,
        marginHorizontal: 5,
    },
    selServTxt: {
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingTop: 5.5,
    },
    selServTitle: {
        color: 'white',
        fontSize: 12,
        marginRight: 7
    },
    selServQuan: {
        color: 'white',
        fontStyle: 'italic'
    },
    servicesContainer: {
        justifyContent: 'center',
    },
    servicesCntrScroll: {
    },
    servContainer: {
        position: 'relative',
        maxWidth: 1000,
        borderRadius: 20,
        backgroundColor: colors.offGold,
        margin: 12,
        padding: 10,
    },
    servTxt: {
        
    },
    servTitle: {
        fontWeight: '900',
        fontSize: 18
    },
    servPrice: {
        fontSize: 15,
    },
    servDescription: {
        fontStyle: 'italic'
    },
    plus: {
        position: 'absolute',
        width: 50,
        height: 50,
        backgroundColor: colors.black,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        right: 10,
        bottom: 10,
    },
    minus: {
        position: 'absolute',
        width: 50,
        height: 50,
        backgroundColor: colors.orange,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        right: 90,
        bottom: 10,
    },
    opTxt: {
        color: 'white',
        fontSize: 20,
    },
    sumbitBttn: {
        position: 'absolute',
        left: '50%',
        transform: [{ 
            translateX: -(Dimensions.get('window').width / 3)
        }],
        bottom: 30,
        height: 80,
        backgroundColor: colors.orange,
        width: '70%',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitBttnTxt: {
        textAlign: 'center',
        fontSize: 20,
    }
})

export default SelectServices
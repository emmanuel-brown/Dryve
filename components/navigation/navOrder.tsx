import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { MapStackParamsList, OrderStackParams } from "../../interface/navigation"
import Map from '../../components/map/map'
import CleanerInfo from "../../screens/CleanerInfo"
import { useEffect, useState } from "react"
import { ServiceI } from "../../interface/api"
import selectServices from "../../screens/order/SelectServices"
import Pricing from "../../screens/order/Pricing"


const Stack = createNativeStackNavigator<OrderStackParams>()

/*
    **selected services will be stored in
        local storage when this component
        unmounts
*/
const OrderNavigation = () => {
    /* 
        initialRouteName should be checking if
        requests already exists
    */
    return (
        <Stack.Navigator initialRouteName={ 'selectServices' } id='order'>
            <Stack.Screen
                name='selectServices'
                component={ selectServices }
            />
            <Stack.Screen
                name='pricing'
                component={ Pricing }
            />
        </Stack.Navigator>
    )
}

export default OrderNavigation
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { MapStackParamsList, OrderStackParams } from "../../interface/navigation"
import Map from '../../components/map/map'
import CleanerInfo from "../../screens/CleanerInfo"
import { useState } from "react"
import { ServiceI } from "../../interface/api"
import selectServices from "../../screens/SelectServices"
import useAsyncEffect from "use-async-effect"
import AsyncStorage from "@react-native-async-storage/async-storage"


const Stack = createNativeStackNavigator<OrderStackParams>()

/*
    **selected services will be stored in
        local storage when this component
        unmounts
*/
const OrderNavigation = () => {
    const [ requests, setRequests ] = useState<ServiceI[]>() 
    //checking if requests exists
    const isRequests = !!requests

    useAsyncEffect(async isActive => {
            const storedRequesets = await AsyncStorage.getItem('requests')
            if(!isActive()) return

            //edit: validate stored requests
            //if stored reqeusts exists put it in state
            if(storedRequesets) {
                setRequests(JSON.parse(storedRequesets))
            }
        },
        //on unmount
        async () => {
            const strRequests = JSON.stringify(requests)
            await AsyncStorage.setItem('requests', strRequests)
                .then(() => console.log('requests stored'))
        },
        []
    )


    /* 
    initialRouteName should be checking if
    requests already exists
    */
    return (
        <Stack.Navigator initialRouteName={ 'selectServices' }>
            <Stack.Screen
                name='selectServices'
                component={ selectServices }
                initialParams={{
                    requests,
                    setRequests
                }}
            />
        </Stack.Navigator>
    )
}

export default OrderNavigation
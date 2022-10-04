import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { MapStackParamsList, OrderStackParams } from "../../interface/navigation"
import Map from '../../components/map/map'
import CleanerInfo from "../../screens/cleaners/CleanerInfo"


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
        <Stack.Navigator initialRouteName='orderList' id='order'>
            <Stack.Screen
                name='ordersList'
                component={ <></> }
            />
        </Stack.Navigator>
    )
}

export default OrderNavigation
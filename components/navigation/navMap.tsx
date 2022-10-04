import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { MapStackParamsList } from "../../interface/navigation"
import Map from '../../components/map/map'
import CleanerInfo from "../../screens/cleaners/CleanerInfo"
import AptScreen from "../../screens/apartment/Apartment"


const Stack = createNativeStackNavigator<MapStackParamsList>()

const MapNavigation = () => {

    return(
        <Stack.Navigator initialRouteName='map'>
            <Stack.Screen
                name='map'
                component={ Map }
            />
            <Stack.Screen 
                name='cleanerInfo'
                component={ CleanerInfo }
            />
            <Stack.Screen 
                name='apartment'
                component={ AptScreen }
            />
        </Stack.Navigator>
    )
}

export default MapNavigation
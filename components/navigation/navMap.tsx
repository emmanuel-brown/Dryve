import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { MapStackParamsList } from "../../interface/navigation"
import Map from '../../components/map/map'
import CleanerInfo from "../../screens/cleaners/CleanerInfo"
import AptScreen from "../../screens/apartment/Apartment"
import BuildingInfoScreen from "../../screens/apartment/Building"
import Unit from "../../screens/apartment/unit"


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
                options={{
                    title: 'Cleaner'
                }}
            />
            <Stack.Screen 
                name='apartment'
                component={ AptScreen }
                options={{
                    title: 'Apartment'
                }}
            />
            <Stack.Screen 
                name='aptBld'
                component={ BuildingInfoScreen }
                options={{
                    title: 'Building'
                }}
            />
            <Stack.Screen 
                name='aptUnit'
                component={ Unit }
                options={{
                    title: 'Unit'
                }}
            />
        </Stack.Navigator>
    )
}

export default MapNavigation
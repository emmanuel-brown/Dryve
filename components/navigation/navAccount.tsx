import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { AccountStackParams } from "../../interface/navigation"
import Map from '../../components/map/map'
import CleanerInfo from "../../screens/cleaners/CleanerInfo"
import Account from "../../screens/account/account"


const Stack = createNativeStackNavigator<AccountStackParams>()

const AccountNavigation = () => {

    return(
        <Stack.Navigator 
            initialRouteName='home'
        >
            <Stack.Screen
                name='home'
                component={ Account }
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}

export default AccountNavigation
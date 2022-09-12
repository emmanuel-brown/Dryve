import { View, Text, StyleSheet } from 'react-native'
import { useGlobalContext } from '../context/global'
import theme from '../styles/colors'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CleanerInfo from './CleanerInfo';
import { NavigationContainer } from '@react-navigation/native'
import MapNavigation from '../components/navigation/navMap'
import { MainButtonParams } from '../interface/navigation';
import OrderNavigation from '../components/navigation/navOrder';

const Tab = createBottomTabNavigator<MainButtonParams>()

const Home: React.FC<{token: string}> = ({ 
    token 
}:{token: string}) => {

    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName='mapView'>
                <Tab.Screen 
                    name="mapView" 
                    component={ MapNavigation }
                    options={{
                        tabBarLabel: 'Map',
                        headerShown: false
                    }}
                />
                <Tab.Screen 
                    name="order" 
                    component={ OrderNavigation }
                    options={{
                        tabBarLabel: 'Order',
                        headerShown: false
                    }} 
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        backgroundColor: theme.background,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: theme.background,
    },
    footerTxt: {
        color: theme.text,
        fontSize: 20,
    }
})

export default Home
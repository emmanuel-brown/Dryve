import { StyleSheet } from 'react-native'
import theme from '../styles/colors'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import MapNavigation from '../components/navigation/navMap'
import { MainButtonParams } from '../interface/navigation'
import CleanerList from './cleaners/CleanerList'
import AccountNavigation from '../components/navigation/navAccount'

const Tab = createBottomTabNavigator<MainButtonParams>()

const Home = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName='mapView'>
                <Tab.Screen 
                    name='cleaners'
                    component={ CleanerList }
                    options={{
                        tabBarLabel: 'Cleaners',
                        headerShown: false
                    }} 
                />
                <Tab.Screen 
                    name="mapView" 
                    component={ MapNavigation }
                    options={{
                        tabBarLabel: 'Map',
                        headerShown: false
                    }}
                />
                <Tab.Screen 
                    name="account" 
                    component={ AccountNavigation }
                    options={{
                        tabBarLabel: 'Account',
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
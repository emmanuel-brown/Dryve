import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StyleSheet, Text, View } from 'react-native'
import GlobalContextProvider from './context/global'
import SignLogin from './screens/signLogin'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <GlobalContextProvider>
        <Stack.Navigator initialRouteName='login'>
          <Stack.Screen name="login" component={ SignLogin } options={{ headerShown: false }}/>
        </Stack.Navigator>
      </GlobalContextProvider>
    </NavigationContainer>
  )
}
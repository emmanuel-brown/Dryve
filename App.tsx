import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StyleSheet, Text, View } from 'react-native'
import GlobalContextProvider from './context/global'
import { RootStackParamList } from './interface/navigation'
import Login from './screens/signLogin'
import SignUp from './screens/signUp'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <NavigationContainer>
      <GlobalContextProvider>
        <Stack.Navigator initialRouteName='login'>
          <Stack.Screen name='login' component={ Login } options={{ headerShown: false }}/>
          <Stack.Screen name='signup' component={ SignUp } options={{ headerShown: false }}/>
        </Stack.Navigator>
      </GlobalContextProvider>
    </NavigationContainer>
  )
}
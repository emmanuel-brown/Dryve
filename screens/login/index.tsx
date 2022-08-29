import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import GlobalContextProvider, { useGlobalContext } from '../../context/global'
import { RootStackParamList } from '../../interface/navigation'
import CreatingUser from './creatingUser'
import Login from './Login'
import SignUp from './signUp'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  const [ initialRouteName, setInitialRouteName ] = useState<keyof RootStackParamList>()
  const { global, setGlobal } = useGlobalContext()

  // useEffect(() => {
  //   if(global.token && global.location) {
  //     setInitialRouteName('home')
  //   } else {
  //     setInitialRouteName('login')
  //   }
  // }, [])
  
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName={ 'login' }>
          <Stack.Screen name='login' component={ Login } options={{ headerShown: false }}/>
          <Stack.Screen name='signup' component={ SignUp } options={{ headerShown: false }}/>
          <Stack.Screen name='creating' component={ CreatingUser } options={{ headerShown: false }}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}
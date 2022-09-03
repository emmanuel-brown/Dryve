import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import GlobalContextProvider, { useGlobalContext } from '../context/global'
import { RootStackParamList } from '../interface/navigation'
import Login from './login'
import Home from './app'
import useAsyncEffect from 'use-async-effect'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function Index() {
  const [ isAuth, setIsAuth ] = useState<boolean>(false)
  const [ initialRouteName, setInitialRouteName ] = useState<keyof RootStackParamList>()
  const { global, setGlobal } = useGlobalContext()

  if(global.loading) {
    return <Text>Loading</Text>
  }
  
  return (
    <>
      { !!global.token ? <Home token={global.token} /> : <Login /> }
    </>
  )
}
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import GlobalContextProvider, { useGlobalContext } from './context/global'
import { RootStackParamList } from './interface/navigation'
import Index from './screens'

export default function App() {
  
  return (
    <GlobalContextProvider>
      <Index />
    </GlobalContextProvider>
  )
}
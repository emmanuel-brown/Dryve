import { Button, NativeSyntheticEvent, StyleSheet, Text, TextInput, TextInputChangeEventData, TouchableOpacity, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import theme from '../styles/colors';
import { useState } from 'react';
import axios from 'axios';
import { useGlobalContext } from '../context/global';

interface ValuesI {
  email: string,
  password: string
}

const SignLogin = () => {
    const [ values, setValues ] = useState<ValuesI>({
      email: "",
      password: ""
    })
    const [ erros, setErrors ] = useState<ValuesI>({
      email: "",
      password: ""
    })
    const [ invalid, setInvalid ] = useState<string>("")
    const { global, setGlobal } = useGlobalContext()


    const handleChange = (input: "email" | "password", value: string) => {
      setValues({
        ...values,
        [input]: value
      })
    }

    const login = async () => {
      try {
        const loginData: any = await axios.post('https://guarded-temple-56367.herokuapp.com/client/login', {
          username: values.email.trim(),
          password: values.password
        })

        setInvalid("")

        const receivedToken: string = loginData.data

        setGlobal({
          ...global,
          token: receivedToken
        })
      } 
      catch (e: any) {
        setValues({
          ...values,
          password: ""
        })

        if(e.response.status === 401) {
          setInvalid("Invalid username or password")
        }
        if(e.response.status >= 500) {
          setInvalid("Something went wrong, please comeback later")
        }
      }
    }


    return (
        <View style={styles.container}>
            <View style={styles.headerView}>
              <Text style={styles.header}>Welcome Back Dryver!</Text>
            </View>

            <View style={styles.form}>
              <Text 
                style={styles.label}
              >Email:</Text>
              <TextInput 
                style={styles.textInput}
                onChangeText={ (e) => handleChange("email", e) }
                value={ values.email }
              />
              <Text style={styles.label}>Password:</Text>
              <TextInput 
                style={styles.textInput}
                onChangeText={ (e) => handleChange("password", e) }
                value={ values.password }
              />
              <TouchableOpacity 
                style={styles.loginBttn}
                onPress={() => login()}
              >
                <Text style={styles.bttnTxt}>Login</Text>
              </TouchableOpacity>
            </View>

            { invalid !== "" && <Text style={ styles.invalidText }>{ invalid }</Text> }

            <TouchableOpacity style={styles.signUpBttn}>
              <Text style={styles.signUpBttnTxt}>Sign Up</Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      paddingTop: '50%',
      flex: 3,
      backgroundColor: theme.background,
      alignItems: 'center',
      // justifyContent: 'space-around',
      white: 'white',
    },
    headerView: {
      height: 100
    },
    header: {
      color: theme.header,
      fontSize: 24,
    },
    form: {
      // flex: 2,
      width: '80%',
      justifyContent: 'space-around',
      textAlign: 'left',
      minHeight: 90,
    },
    label: {
      color: theme.inputLabel,
      fontSize: 20,
    },
    textInput: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      fontSize: 20,
      backgroundColor: theme.inputBackground,
      marginBottom: 10,
      borderRadius: 10
    },
    loginBttn: {
      marginTop: 20,
      backgroundColor: theme.inputBackground,
      borderRadius: 100,
      alignItems: 'center',
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
    signUpBttn: {
      backgroundColor: theme.buttonBackground,
      width: 180,
      height: 180,
      borderRadius: 100,
      justifyContent: 'center',
      marginTop: 20,
    },
    bttnTxt: {
      color: theme.buttonText,
      fontSize: 20,
      // textAlign: 'center',
      alignSelf: 'center'
    },
    signUpBttnTxt: {
      color: theme.buttonText,
      fontSize: 20,
      // textAlign: 'center',
      alignSelf: 'center',
      marginBottom: 10,
    },
    invalidText: {
      color: theme.errorText,
      marginTop: 10,
    }
  });

export default SignLogin
  
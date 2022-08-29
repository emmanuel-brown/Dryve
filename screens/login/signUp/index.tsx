import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FormBttn, Selector, TI } from '../../../components/form'
import { statesShort } from '../../../constants/address'
import { dateToUnix } from '../../../constants/time'
import validation from '../../../constants/validation'
import { useGlobalContext } from '../../../context/global'
import { RootStackParamList } from '../../../interface/navigation'
import theme from '../../../styles/colors'
import AddressInfo from './address'
import GeneralInfo from './general'
import SetupPass from './setPassword'

export interface ValuesI {
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    dob: string,
    streetLineOne: string,
    streetLineTwo: string,
    zipcode: string,
    state: string,
    city: string
    password: string
    secPassword: string
}

type signUpProps = NativeStackNavigationProp<RootStackParamList, 'signup'>

const SignUp = () => {
    const { global, setGlobal } = useGlobalContext()
    const [ values, setValues ] = useState<ValuesI>({
        firstName: "Emmanuel",
        lastName: "Brown",
        phoneNumber: "803-579-8542",
        email: "emmanuelbrown1310@gmail.com",
        dob: "10/13/2001",
        streetLineOne: "8940 Rachel Way",
        streetLineTwo: "Apt 4301",
        zipcode: "28278",
        state: "NC",
        city: "Charlotte",
        password: "12345678",
        secPassword: "12345678"
    })

    const navigation = useNavigation<signUpProps>()

    const [ form, setForm ] = useState<string>()

    useEffect(() => {
        setForm("general")
    }, [])

    const signUp = async () => {
        try {
            const postValues = { 
                firstName: values.firstName.trim(),
                lastName: values.lastName.trim(),
                dob: dateToUnix(values.dob),
                phoneNumber: values.phoneNumber.trim(),
                email: values.email.trim(),
                username: values.email.trim(),
                password: values.password,
                address: {
                    street_address_line_1: values.streetLineOne.trim(),
                    street_address_line_2: values.streetLineTwo.trim(),
                    state: values.state.trim(),
                    city: values.city.trim(),
                    zipcode: values.zipcode.trim(),
                    country: 'United States'
                }
            }

            navigation.navigate('creating')
            const receivedToken = await axios.post(
                'https://guarded-temple-56367.herokuapp.com/client/', 
                postValues
            ).then(res => res.data)

            setGlobal({
                ...global,
                token: receivedToken
            })

           
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerView}>
                <Text style={styles.header}>Create An Account</Text>
            </View>
        
            {form === "general" && <GeneralInfo 
                setValues={ setValues } 
                values={ values } 
                onNext={ setForm }                
            /> }

            {form === "address" && <AddressInfo 
                setValues={ setValues } 
                values={ values } 
                onNext={ setForm }     
            /> }

            {form === 'password' && <SetupPass 
                setValues={ setValues } 
                values={ values } 
                onNext={ setForm }  
                onSumbit={ signUp }
            />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
        paddingTop: 110,
        alignContent: 'center'
    },
    headerView: {
        height: 100,
        alignSelf: 'center',
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
        alignSelf: 'center'
    },
    label: {
        color: theme.inputLabel,
        fontSize: 15,
    },
    textInput: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        fontSize: 20,
        backgroundColor: theme.inputBackground,
        marginBottom: 5,
        borderRadius: 5,
        height: 50,
    },
    inputError: {
        color: theme.errorText,
        marginBottom: 1,
    },
    stateDropdown: {
        width: '30%',
    },
    subSect: {
        justifyContent: 'space-between',
        gap: 10,
        flexDirection: 'row'
    }
})

export default SignUp
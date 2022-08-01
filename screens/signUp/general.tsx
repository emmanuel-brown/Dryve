import React, { useEffect, useState } from "react"
import { View, StyleSheet } from "react-native"
import { ValuesI } from "."
import { FormBttn, TI } from "../../components/form"
import validation from "../../constants/validation"
import theme from "../../styles/colors"


interface SignUpFormI {
    setValues: React.Dispatch<React.SetStateAction<ValuesI>>
    values: ValuesI
    onNext: Function
}

type Form = {
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    dob: string
}

const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dob: ""
}

const GeneralInfo: React.FC<SignUpFormI> = ({
    setValues,
    values,
    onNext
}: SignUpFormI) => {
    const [ formValues, setFormValues ] = useState<Form>(defaultValues)

    const [ formErrors, setFormErrors ] = useState<Form>(defaultValues)

    const handleChange = (name: string, text: string) => {
        setFormValues({
            ...formValues,
            [ name ]: text
        })
    }

    useEffect(() => {
        setFormValues({
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            phoneNumber: values.phoneNumber,
            dob: values.dob
        })
    }, [])

    const handleNextBttn = () => {
        const handledError = validation<Form>(formValues)
        setFormErrors({...handledError})

        if(!Object.values(handledError).every(prop => prop === "")) return

        console.log("it got here")

        setValues({ ...values, ...formValues })

        onNext('address')
    }

    return (
        <View style={styles.form}>
            <TI 
                label='First Name'
                name='firstName'
                handleChange={ handleChange }
                value={ formValues.firstName }
                error={ formErrors.firstName }
            />

            <TI 
                label='Last name'
                name='lastName'
                handleChange={ handleChange }
                value={ formValues.lastName }
                error={ formErrors.lastName }
            />

            <TI 
                label='Phone Number'
                name='phoneNumber'
                handleChange={ handleChange }
                value={ formValues.phoneNumber }
                error={ formErrors.phoneNumber }
                useMask={ true }
                maskType='custom'
                mask='999-999-9999'
                keyboardType='numeric'
            />

            <TI 
                label='Email'
                name='email'
                handleChange={ handleChange }
                value={ formValues.email }
                error={ formErrors.email }
            />

            <TI 
                label='Date of Birth'
                name='dob'
                handleChange={ handleChange }
                value={ formValues.dob }
                error={ formErrors.dob }
                placeHolder='MM/DD/YYYY'
                useMask={ true }
                maskType='custom'
                mask='99/99/9999'
                keyboardType='numeric'
            />

            <FormBttn 
                title='Next'
                onPress={ () => handleNextBttn() }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        // flex: 2,
        width: '80%',
        justifyContent: 'space-around',
        textAlign: 'left',
        minHeight: 90,
        alignSelf: 'center'
    }
})

export default GeneralInfo
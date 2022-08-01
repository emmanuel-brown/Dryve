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
    onSumbit?: Function
}

type Form = {
    password: string
    secPassword: string
}

const defaultValues = {
    password: "",
    secPassword: ""
}

const SetupPass: React.FC<SignUpFormI> = ({
    setValues,
    values,
    onNext,
    onSumbit
}: SignUpFormI) => {
    const [ formValues, setFormValues ] = useState<Form>(defaultValues)

    const [ formErrors, setFormErrors ] = useState<Form>(defaultValues)

    const handleChange = (name: string, text: string) => {
        setFormValues({
            ...formValues,
            [ name ]: text.trim()
        })
    }

    useEffect(() => {
        setFormValues({
            password: values.password,
            secPassword: values.secPassword
        })
    }, [])

    const handleNextBttn = () => {
        const handledError = validation<Form>(formValues)
        setFormErrors({...handledError})

        if(!Object.values(handledError).every(prop => prop === "")) return

        setValues({ ...values, ...formValues })

        onSumbit !== undefined && onSumbit()
    }

    return (
        <View style={styles.form}>
            <TI 
                label='Password (must be 8 characters)'
                name='password'
                secureTextEntry={ true }
                handleChange={ handleChange }
                value={ formValues.password }
                error={ formErrors.password }
            />

            <TI 
                label='Re-enter password'
                name='secPassword'
                secureTextEntry={ true }
                handleChange={ handleChange }
                value={ formValues.secPassword }
                error={ formErrors.secPassword }
            />

            <FormBttn 
                title='Next'
                onPress={ () => handleNextBttn() }
            />
            <FormBttn 
                title='Back'
                onPress={ () => onNext('address') }
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

export default SetupPass
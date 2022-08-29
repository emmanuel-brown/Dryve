import axios from "axios"
import React, { useEffect, useState } from "react"
import { View, StyleSheet } from "react-native"
import { ValuesI } from "."
import { FormBttn, Selector, TI } from "../../../components/form"
import { statesShort } from "../../../constants/address"
import validation from "../../../constants/validation"
import theme from "../../../styles/colors"


interface SignUpFormI {
    setValues: React.Dispatch<React.SetStateAction<ValuesI>>
    values: ValuesI
    onNext: Function
    onBack?: Function
}

type Form = {
    streetLineOne: string
    streetLineTwo: string
    zipcode: string
    state: string
    city: string
}

const defaultValues: Form = {
    streetLineOne: "",
    streetLineTwo: "",
    zipcode: "",
    state: "",
    city: ""
}

const AddressInfo: React.FC<SignUpFormI> = ({
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
            streetLineOne: values.streetLineOne,
            streetLineTwo: values.streetLineTwo,
            zipcode: values.zipcode,
            state: values.state,
            city: values.city
        })
    }, [])

    const handleNextBttn = () => {
        const handledError = validation<Form>(formValues)
        setFormErrors({...handledError})

        if(!Object.values(handledError).every(prop => prop === "")) return

        setValues({ ...values, ...formValues })

        onNext('password')
    }

    return (
        <View style={styles.form}>
            <TI 
                label='Street Address'
                name='streetLineOne'
                handleChange={ handleChange }
                value={ formValues.streetLineOne }
                error={ formErrors.streetLineOne }
            />

            <TI 
                label='Street Address Line 2'
                name='streetLineTwo'
                handleChange={ handleChange }
                value={ formValues.streetLineTwo }
                error={ formErrors.streetLineTwo }
            />

            <TI 
                label='City'
                name='city'
                handleChange={ handleChange }
                value={ formValues.city }
                error={ formErrors.city }
            />

            <View style={styles.subSect}>
                <TI 
                    label='Postal Code'
                    name='zipcode'
                    handleChange={ handleChange }
                    value={ formValues.zipcode }
                    error={ formErrors.zipcode }
                    customStyles={{ width: '65%' }}
                />

                <Selector
                    label='State'
                    name='state'
                    data={ statesShort }
                    onSelect={ (state: string) => {
                        setFormValues({...formValues, state})
                    }}
                    value={ formValues.state }
                    search={ true }
                    customStyles={ styles.stateDropdown }
                    error={ formErrors.state }
                />
            </View>

            <FormBttn 
                title='Next'
                onPress={ () => handleNextBttn() }
            />
            <FormBttn 
                title='Back'
                onPress={ () => onNext("general") }
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

export default AddressInfo
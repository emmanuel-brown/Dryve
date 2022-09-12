import { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { uniqueWithQuantity } from '../../constants/general'
import { stringPrice } from '../../constants/money'
import { createOrder } from '../../constants/order'
import { useGlobalContext } from '../../context/global'
import RequestsHook from '../../hooks/requests'
import { ServiceI } from '../../interface/api'
import { colors } from '../../styles/colors'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { OrderStackParams } from '../../interface/navigation'
import { useNavigation } from '@react-navigation/native'
import preferredCleanerHook from '../../hooks/preferredCleaner'

type PricingProps = NativeStackNavigationProp<OrderStackParams, 'pricing'>

const Service = ({
    title,
    price,
    description,
    quantity,
}: ServiceI & { quantity: number }) => {

    return (
        <TouchableOpacity>
            <View style={s.servContainer}>
                <View style={s.servTxt}>
                    <Text style={s.servTitle}>{title}</Text>
                    <Text style={s.servDescription}>{description}</Text>
                    <Text style={s.servPrice}>{ stringPrice(price) }</Text>
                    <Text style={s.servTitle}>{quantity}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const Pricing = () => {
    //ensure component knows not to submit twice
    const [ sumbitPress, setSubmitPressed ] = useState<boolean>(false)
    const { global } = useGlobalContext() 

    const {
        pickupAddress,
        token
    } = global

    const { 
        preferredCleaner,
        requests 
    } = preferredCleanerHook(global.token)

    const navigation = useNavigation<PricingProps>()

    const handleSumbit = async () => {
        try {
            setSubmitPressed(true)

            if(
                !pickupAddress ||
                !preferredCleaner
            ) return
            
            await createOrder({
                cleanerId: preferredCleaner._id,
                pickupAddress: pickupAddress._id,
                cardId: 'pm_1LWSrfHjPJFKHwj44sFNUMLW',
                requests: uniqueWithQuantity<ServiceI>(requests, '_id'),
                token
            })

            navigation.getParent()?.navigate('mapView')

        } catch {
            //edit: handle if fail to create order
        } finally {
            setSubmitPressed(false)
        }
    }

    return (
        <View style={s.container}>
            <Text>Cart data</Text>
            {uniqueWithQuantity<ServiceI>(requests, '_id').map(req => (
                //@ts-ignore
                <Service key={ req._id } quantity={req.quantity} {...req} />
            ))}
            <TouchableOpacity
                onPress={() => !sumbitPress && handleSumbit()}
                style={s.sumbitBttn}
            >
                <Text style={s.submitBttnTxt}>Request</Text>
            </TouchableOpacity>
        </View>
    )
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.darkGrey
    },
    servicesCntrScroll: {
    },
    servContainer: {
        position: 'relative',
        maxWidth: 1000,
        borderRadius: 20,
        backgroundColor: colors.offGold,
        margin: 12,
        padding: 10,
    },
    servTxt: {
        
    },
    servTitle: {
        fontWeight: '900',
        fontSize: 18
    },
    servPrice: {
        fontSize: 15,
    },
    servDescription: {
        fontStyle: 'italic'
    },
    sumbitBttn: {
        position: 'absolute',
        left: '50%',
        transform: [{ 
            translateX: -(Dimensions.get('window').width / 3)
        }],
        bottom: 30,
        height: 80,
        backgroundColor: colors.orange,
        width: '70%',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitBttnTxt: {
        textAlign: 'center',
        fontSize: 20,
    }
})

export default Pricing
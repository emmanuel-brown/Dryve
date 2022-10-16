import { RouteProp, useRoute } from '@react-navigation/native'
import {
    Text,
    View,
    StyleSheet,
    ScrollView
} from 'react-native'
import { MapStackParamsList } from '../../interface/navigation'
import { colors } from '../../styles/colors'

const BuildingInfoScreen = () => {
    const route = useRoute<RouteProp<MapStackParamsList, 'aptBld'>>()
    const { building, units } = route.params

    const unitsMap = Object.entries(units)

    return(
        <View style={ s.container }>
            <View style={ s.intro }>
                <Text style={ s.address }>Building #</Text>
                <Text style={ s.name }>{ building }</Text>
            </View>
            <ScrollView>
                <View style={ s.optsList }>
                    {
                        unitsMap.map(unit => (
                            <View style={ s.opt }>
                                <Text style={ s.optTxt }>{ unit[0] }</Text>
                            </View>
                        ))
                    }
                </View>
            </ScrollView>
        </View>
    )
}

const s = StyleSheet.create({
    loading: {
        color: 'white',
        textAlign: 'center',
        fontSize: 30,
    },
    container: {
        flex: 1,
        backgroundColor: colors.darkGrey,
    },
    intro: {
        alignItems: 'center',
        marginVertical: 20,
        marginHorizontal: 20
    },
    address: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center'
    },
    name: {
        color: colors.orange,
        fontSize: 25
    },
    optsList: {
        // width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },
    opt: {
        width: '40%',
        backgroundColor: colors.orange,
        border: 'white',
        borderRadius: 10,
        paddingVertical: 15,
        borderBottomWidth: 2,
        marginBottom: 15,
    },
    optTxt: {
        fontSize: 20,
        // color: 'white',
        textAlign: 'center'
    }
})

export default BuildingInfoScreen
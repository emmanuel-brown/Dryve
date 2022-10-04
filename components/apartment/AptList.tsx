import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { AptI } from '../../interface/api'
import { colors } from '../../styles/colors'

const AptList: React.FC<{
    buildings: AptI['buildings']
}> = ({buildings}: Pick<AptI, 'buildings'>) => {

    const blds = Object.entries(buildings)

    return (
        <ScrollView>
            {
                blds.map(bld => (
                    <View style={ s.apt } key={bld[0]}>
                        <Text style={ s.aptHead }>{ bld[0] }</Text>
                    </View>
                ))
            }
            
        </ScrollView>
    )
}

const s = StyleSheet.create({
    listContainer: {
        height: '100%',
        marginHorizontal: 50
    },
    apt: {
        maxWidth: 800,
        width: '100%',
        borderRadius: 20,
        backgroundColor: colors.offGold,
        marginBottom: 20,
        padding: 20
    },
    aptHead: {
        textAlign: 'center',
        color: colors.black,
        fontWeight: '800'
    }
})

export default AptList
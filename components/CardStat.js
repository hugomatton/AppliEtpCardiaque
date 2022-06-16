import { View, Text, StyleSheet, Dimensions } from 'react-native'

import { GlobalStyles } from '../constants/styles'

function CardStat({nb, goodRep, children}) {
    return (
        <View style={[styles.infoContainer, goodRep ? styles.colorGoodRep : styles.colorBadRep]}>
            <View style={styles.numberContainer}>
                <Text style={[styles.textInfo, { color: goodRep ? 'green' : 'orange' }]}>
                    {nb}
                </Text>
            </View>
            <Text
                style={[styles.textInfo]}
            >
                {children}
            </Text>
        </View>
    )
}

export default CardStat

const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    infoContainer: {
        padding: 20,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: 'black',
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4
    },
    colorGoodRep: {
        backgroundColor: 'green',
    },
    colorBadRep: {
        backgroundColor: 'orange'
    },
    numberContainer: {
        backgroundColor: GlobalStyles.colors.secondary,
        width: deviceWidth > 450 ? 46 : 36,
        height: deviceWidth > 450 ? 46 : 36,
        borderRadius:deviceWidth > 450 ? 23 : 18,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInfo: {
        fontSize: deviceWidth > 450 ? 30 : 20,
        textAlign: 'center',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: GlobalStyles.colors.secondary
    },
})
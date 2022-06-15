import { View, Text, StyleSheet, Dimensions } from 'react-native'

import { GlobalStyles } from '../constants/styles'

function ProgressBar({ totalStep, step, pourcentage }) {
    return (
        <View>
            <View style={styles.bar}>
                <View style={styles.containerProgressBar}>
                    <View style={[styles.progress, { flex: step }]} ></View>
                    <View style={[styles.rest, { flex: totalStep - step }]}></View>
                </View>
                <View style={styles.containerScore}>
                    <Text style={styles.score}>
                        {pourcentage ?
                            ((step / totalStep) * 100).toFixed(0) + '%' :
                            step + ' / ' + totalStep}
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default ProgressBar

const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    bar: {
        height: deviceWidth > 450 ? 36 : 24,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    containerProgressBar: {
        backgroundColor: 'white',
        borderRadius: deviceWidth > 450 ? 16 : 12,
        flexDirection: 'row',
        overflow: 'hidden',
        flex: 4,
        borderColor: GlobalStyles.colors.secondary,
        borderWidth: 0.5
    },
    progress: {
        height: deviceWidth > 450 ? 36 : 24,
        borderRadius: deviceWidth > 450 ? 16 : 12,
        backgroundColor: GlobalStyles.colors.accent
    },
    rest: {
        height: deviceWidth > 450 ? 36 : 24,
        backgroundColor: GlobalStyles.colors.secondary
    },
    containerScore: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    score: {
        color: GlobalStyles.colors.secondary,
        fontSize: deviceWidth > 450 ? 28 : 18,
        fontWeight: '600',
    },

})
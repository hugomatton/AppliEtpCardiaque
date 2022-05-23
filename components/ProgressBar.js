import {View, Text, StyleSheet} from 'react-native'

import {GlobalStyles} from '../constants/styles'
import Info from './Info'

function ProgressBar({totalStep, step }){
    return(
        <View>
            <View style={styles.bar}>
                <View style={styles.containerProgressBar}>
                    <View style={[styles.progress, {flex: step}]} ></View>
                    <View style={[styles.rest, {flex: totalStep - step}]}></View>
                </View>
                <View style={styles.containerScore}>
                    <Text style={styles.score}>{((step/totalStep)*100).toFixed(0)}%</Text>
                </View>
            </View>
            <Info
                over={totalStep/step === 1}
            />
        </View>
    )
}

export default ProgressBar

const styles = StyleSheet.create({
    bar: {
        height: 24,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    containerProgressBar: {
        backgroundColor: 'white',
        borderRadius: 12,
        flexDirection: 'row',
        overflow: 'hidden',
        flex: 4,
        borderColor: GlobalStyles.colors.secondary,
        borderWidth: 0.5
    },
    progress: {
        height: 24,
        backgroundColor: GlobalStyles.colors.accent 
    },
    rest: {
        height: 24,
        backgroundColor: GlobalStyles.colors.secondary
    },
    containerScore:{
        flex: 1,
        alignItems: 'center'
    },
    score: {
        color: GlobalStyles.colors.secondary,
        fontSize: 18,
        fontWeight: '600'
    }
})
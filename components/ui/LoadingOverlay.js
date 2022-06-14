import {View, ActivityIndicator, StyleSheet} from 'react-native'
import { GlobalStyles } from '../../constants/styles'

function LoadingOverlay(){
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={GlobalStyles.colors.secondary}/>
        </View>
    )
}

export default LoadingOverlay

const styles = StyleSheet.create({
    container : {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: GlobalStyles.colors.main
    }
})
import {View, Text, StyleSheet} from 'react-native'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import { GlobalStyles } from '../../constants/styles'

function RadioButton({pressed, onPress}){
    return(
        <Pressable onPress={onPress}>
            <View style={styles.main}>
                {pressed && <View style={styles.pressed}></View>}
            </View>
        </Pressable>
    )
}

export default RadioButton

const styles = StyleSheet.create({
    main: {
        height: 30,
        width: 30,
        backgroundColor: 'white',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: GlobalStyles.colors.main,
        borderWidth: 1
    },
    pressed: {
        height: 20,
        width: 20,
        backgroundColor: 'green',
        borderRadius: 10
    }
})
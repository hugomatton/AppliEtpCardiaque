import {View, Pressable, Text, StyleSheet} from 'react-native'
import { GlobalStyles } from '../../constants/styles'

function Button({children, onPress, fontSize, color, bgColor}){

    return(
        <View>
            <Pressable onPress={onPress} style={({pressed})=> pressed && styles.pressed}>
                <View style={[styles.button, {backgroundColor: bgColor}]}>
                    <Text style={[styles.buttonText, {fontSize: fontSize, color: color}]}>{children}</Text>
                </View>
            </Pressable>
        </View>
    )
}

export default Button

const styles = StyleSheet.create({
    button:{
        borderRadius: 20,
        padding: 16,
        shadowColor: 'black',
        shadowRadius: 4,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.4
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        color: GlobalStyles.colors.secondary
    },
    pressed: {
        opacity: 0.75,
        borderRadius: 4,
    }
})
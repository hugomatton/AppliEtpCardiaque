import {View, Pressable, Text, StyleSheet, Dimensions} from 'react-native'
import { GlobalStyles } from '../../constants/styles'

function Button({children, onPress, fontSize, color, bgColor, style}){

    return(
        <View style={style}>
            <Pressable onPress={onPress} style={({pressed})=> pressed && styles.pressed}>
                <View style={[styles.button, {backgroundColor: bgColor}]}>
                    <Text style={[styles.buttonText, {fontSize: fontSize, color: color}]}>{children}</Text>
                </View>
            </Pressable>
        </View>
    )
}

export default Button

const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    button:{
        borderRadius: 20,
        padding: deviceWidth > 450 ? 23 : 16,
        shadowColor: 'black',
        shadowRadius: 4,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.4,
        elevation: 2,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        color: GlobalStyles.colors.secondary,
    },
    pressed: {
        opacity: 0.75,
        borderRadius: 4,
    }
})
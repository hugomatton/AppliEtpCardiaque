import { View, Pressable, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function QuizzButton({children, onPress}){

    return(
        <View style={styles.outerView}>
            <Pressable 
                style={({pressed})=> pressed && styles.pressed}
                onPress={onPress}
            >
                <View style={styles.innerView}>
                    <Text style={styles.text}>{children}</Text>
                </View>
            </Pressable>
        </View>
    )
}

export default QuizzButton

const styles = StyleSheet.create({
    outerView:{
        width: '40%',
        borderRadius: 20,
        backgroundColor: 'green',
        shadowColor: 'black',
        shadowRadius: 4,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.4
    },
    innerView: {
        padding: 20,
    },
    pressed:{
        opacity: 0.75,
    },
    text: {
        textAlign: 'center',
        color: GlobalStyles.colors.secondary,
        fontSize: 15,
        textTransform: 'uppercase',
        fontWeight: 'bold'
    }
})
import {View, Text, StyleSheet} from 'react-native'

function Info({over}){
    return (
        <View>
            {over ?
            <Text style={styles.text}>
                Bravo vous avez pris connaissances de toutes les notions, testez vous en faisant le Quizz
            </Text>
            :
            <Text style={styles.text}>
                Il vous reste des notions à lire
            </Text>
            }
        </View>
    )
}

export default Info

const styles = StyleSheet.create({
    text: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20
    }
})
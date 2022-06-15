import {View, Text, StyleSheet, Dimensions} from 'react-native'

function Info({over}){
    return (
        <View>
            {over ?
            <Text style={styles.text}>
                Bravo vous avez pris connaissances de toutes les notions, testez vous en faisant le Quiz
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

const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    text: {
        color: 'white',
        textAlign: 'center',
        fontSize: deviceWidth > 450 ? 30 : 20
    }
})
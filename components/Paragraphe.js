import {View, Text, Image, StyleSheet} from 'react-native'
import { GlobalStyles } from '../constants/styles'

function Paragraphe({subtitle, text, imageUrl}){
    return(
        <View style={styles.paragraphe}>
            <Text style={styles.title}>{subtitle} : </Text>
            <Text style={styles.text}>{text}</Text>
            <View>
                <Image
                    style={styles.image}
                    source={{
                        uri: imageUrl ? imageUrl : 'http://via.placeholder.com/640x360',
                    }}
                />
            </View>
        </View>
    )
}

export default Paragraphe

const styles = StyleSheet.create({
    paragraphe: {
        marginVertical: 10,
        width: '100%'
    },
    title:{
        marginLeft: 20,
        padding: 10,
        fontSize: 25,
        fontWeight: '500' ,
        color: GlobalStyles.colors.main        
    },
    text: {
        textAlign: 'justify' ,
        fontSize: 18,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 15
    },
    image:{
        height: 200,
    }
})
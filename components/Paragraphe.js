import { View, Text, Image, StyleSheet } from 'react-native'
import { GlobalStyles } from '../constants/styles'

function Paragraphe({ subtitle, text, imageUrl }) {
    return (
        <View style={styles.paragraphe}>
            <View style={styles.titleContainer}>
                <View style={styles.puce}></View>
                <Text style={styles.title}>{subtitle} : </Text>
            </View>
            <Text style={styles.text}>{text}</Text>
            {
                !!imageUrl &&
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={{
                            uri: imageUrl ? imageUrl : 'http://via.placeholder.com/640x360',
                        }}
                    />
                </View>
            }
        </View>
    )
}

export default Paragraphe

const styles = StyleSheet.create({
    paragraphe: {
        marginVertical: 10,
        width: '100%',
    },
    title: {
        marginLeft: 20,
        padding: 10,
        fontSize: 25,
        fontWeight: '500',
        color: GlobalStyles.colors.main
    },
    puce: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: GlobalStyles.colors.main,
        marginLeft: 20
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        textAlign: 'justify',
        fontSize: 18,
        marginLeft: 15,
        marginRight: 15,
    },
    imageContainer: {
        flex: 1,
    },
    image: {
        height: 300,
        width: '100%'
    }
})
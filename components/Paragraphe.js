import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { GlobalStyles } from '../constants/styles'

import DisplayImage from './ui/DisplayImage'

function Paragraphe({ subtitle, text, imageUrl, height, width }) {
    return (
        <View style={styles.paragraphe}>
            { !!subtitle &&
            <View style={styles.titleContainer}>
                <View style={styles.puce}></View>
                <Text style={styles.title}>{subtitle} : </Text>
            </View>
            }
            {!!text &&
                <Text style={styles.text}>{text}</Text>
            }
            {
                (!!imageUrl && !!height && !!width) &&
                <View style={styles.imageContainer}>
                    <DisplayImage
                        imageUrl={imageUrl}
                        height={height}
                        width={width}
                    />
                </View>
            }
        </View>
    )
}

export default Paragraphe

const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    paragraphe: {
        marginBottom: 4,
        width: '100%',
        backgroundColor: GlobalStyles.colors.secondary
    },
    title: {
        marginLeft: 20,
        padding: 10,
        fontSize: deviceWidth > 450 ? 40 : 27,
        fontWeight: '500',
        color: GlobalStyles.colors.accent
    },
    puce: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: GlobalStyles.colors.accent,
        marginLeft: 20
    },
    titleContainer: {
        paddingRight: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        textAlign: 'justify',
        fontSize: deviceWidth > 450 ? 30 : 22,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 20
    },
    imageContainer: {
        flex: 1,
    },
 
})
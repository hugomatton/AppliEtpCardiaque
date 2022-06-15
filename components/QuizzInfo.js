import { View, Text, FlatList, Image, StyleSheet, Dimensions } from 'react-native'

import { GlobalStyles } from '../constants/styles'

function QuizzInfo({ errors }) {

    function renderError(itemData) {
        const error = itemData.item
        return (
            <View style={styles.questionContainer}>
                <Text style={styles.textQuestion}>{error.question}</Text>
                <Text style={styles.textReponse}>Bonne réponse : {error[error.bonneReponse]}</Text>
            </View>
        )
    }

    let content = (
        <View>
            <Text style={styles.title}>Vous vous êtes trompé sur les questions suivantes</Text>
            <FlatList
                data={errors}
                keyExtractor={(error) => error.id}
                renderItem={renderError}
                alwaysBounceVertical={false}
            />
        </View>
    )

    if (errors.length === 0) {
        content = (
            <View>
                <Text style={styles.title}>Vous avez répondu juste à toutes les questions ! Félicitation</Text>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={require('../assets/trophe.png')}/>
                </View>
            </View>
        )
    }

    return (
        content
    )

}

export default QuizzInfo

const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    infoContainer: {

    },
    title: {
        marginTop: 30,
        color: GlobalStyles.colors.secondary,
        fontSize: deviceWidth > 450 ? 30 : 20,
        fontWeight: '400',
        textAlign: 'center'
    },
    questionContainer: {
        backgroundColor: GlobalStyles.colors.secondary,
        marginVertical: 10,
        padding: deviceWidth > 450 ? 32 : 16,
        borderRadius: 10
    },
    textQuestion: {
        color: GlobalStyles.colors.main,
        fontSize: deviceWidth > 450 ? 30 : 20,
        fontWeight: '400',
    },
    textReponse: {
        fontSize: deviceWidth > 450 ? 28 : 18,
        fontWeight: deviceWidth > 450 ? '400' : '300',
        marginTop: 10
    },
    image:{
        marginTop: deviceWidth > 450 ? 100 : 50,
        height: deviceWidth > 450 ? 400 : 200,
        width: 'auto'
    }
   
})
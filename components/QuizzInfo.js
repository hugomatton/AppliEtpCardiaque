import {View, Text, FlatList, StyleSheet} from 'react-native'
import { GlobalStyles } from '../constants/styles'

function QuizzInfo({errors}){

    function renderError(itemData){
        const error = itemData.item
        return(
            <View style={styles.questionContainer}>
                <Text style={styles.textQuestion}>{error.question}</Text>
                <Text style={styles.textReponse}>Bonne réponse : {error[error.bonneReponse]}</Text>
            </View>
        )
    }

    if(errors.length === 0){
        return(
            <View>
                <Text style={styles.title}>Vous avez répondu juste à toutes les questions ! Félicitation</Text>
            </View>
        )
    }
    else{
        return(
            <View>
                <Text style={styles.title}>Vous vous êtes trompé sur les questions suivantes</Text>
                <FlatList
                    data={errors}
                    keyExtractor={(error)=>error.id}
                    renderItem={renderError}
                    alwaysBounceVertical={false}
                />
            </View>
        )
    }
    
}

export default QuizzInfo

const styles = StyleSheet.create({
    infoContainer: {

    },
    title: {
        color: GlobalStyles.colors.secondary,
        fontSize: 20,
        fontWeight: '400',
        textAlign: 'center'
    },
    questionContainer: {
        backgroundColor: GlobalStyles.colors.secondary,
        marginVertical: 10,
        padding: 15,
        borderRadius: 10
    },
    textQuestion : {
        color: GlobalStyles.colors.main,
        fontSize: 20,
        fontWeight: '400',
    },
    textReponse: {
        fontSize: 20,
        fontWeight: '300',
        marginTop: 10
    }
})
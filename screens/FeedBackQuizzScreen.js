import { View, Text, StyleSheet, Dimensions } from 'react-native'

import { GlobalStyles } from '../constants/styles'
import QuizzInfo from '../components/QuizzInfo'
import Button from '../components/ui/Button'
import CardStat from '../components/CardStat'

function FeedBackQuizzScreen({ route, navigation }) {

    const nb_good_rep = route.params.nb_good_rep
    const nb_bad_rep = route.params.nb_bad_rep
    const errors = route.params.errors

    return (
        <View style={styles.main}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Compte rendu du Quiz</Text>
            </View>
            <View style={styles.cardStatContainer}>
                <CardStat nb={nb_good_rep} goodRep>{nb_good_rep > 1 ? 'Bonnes réponses' : 'Bonne réponse'}</CardStat>
                <CardStat nb={nb_bad_rep}>{nb_bad_rep > 1 ? 'Mauvaises réponses' : 'Mauvaise réponse'}</CardStat>
            </View>
            <View style={styles.quizzInfoContainer}>
                <QuizzInfo errors={errors} />
            </View>
            <View style={styles.buttonsContainer}>
                <Button
                    bgColor={GlobalStyles.colors.accent}
                    color='white'
                    fontSize={Dimensions.get('window').width > 450 ? 25 : 18}
                    style={styles.button}
                    onPress={() => { navigation.goBack() }}
                >
                    Continuer
                </Button>
            </View>
        </View>
    )
}

export default FeedBackQuizzScreen

const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: GlobalStyles.colors.main,
        paddingTop: 60,
        paddingHorizontal: deviceWidth > 450 ? 120 : 24,
    },
    titleContainer:{
        flex: 1,
        justifyContent: 'center'
    },
    title: {
        color: GlobalStyles.colors.secondary,
        fontSize: 30,
        fontWeight: '500',
        textAlign: 'center',
    },
    cardStatContainer: {
        flex: 3,
        justifyContent: 'space-around'
    },
    quizzInfoContainer: {
        flex: deviceWidth > 450 ? 10 : 7,
        justifyContent: 'center',
    },
    buttonsContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    button: {
        flex: 1,
    }
})
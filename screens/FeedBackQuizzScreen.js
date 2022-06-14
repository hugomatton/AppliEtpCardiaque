import { View, Text, StyleSheet, Dimensions } from 'react-native'

import { GlobalStyles } from '../constants/styles'
import QuizzInfo from '../components/QuizzInfo'
import Button from '../components/ui/Button'

function FeedBackQuizzScreen({ route, navigation }) {

    const nb_good_rep = route.params.nb_good_rep
    const nb_bad_rep = route.params.nb_bad_rep
    const errors = route.params.errors

    return (
        <View style={styles.main}>
            <View>
                <Text style={styles.title}>Compte rendu du Quiz</Text>
                <View style={[styles.infoContainer, styles.colorGoodRep]}>
                    <View style={styles.numberContainer}>
                        <Text style={[styles.textInfo, { color: 'green' }]}>
                            {nb_good_rep}
                        </Text>
                    </View>
                    <Text
                        style={[styles.textInfo]}
                    >
                        {nb_good_rep > 1 ? 'Bonnes réponses' : 'Bonne réponse'}
                    </Text>
                </View>
                <View style={[styles.infoContainer, styles.colorBadRep]}>
                    <View style={styles.numberContainer}>
                        <Text style={[styles.textInfo, { color: 'orange' }]}>
                            {nb_bad_rep}
                        </Text>
                    </View>
                    <Text
                        style={[styles.textInfo]}
                    >
                        {nb_bad_rep > 1 ? 'Mauvaises réponses' : 'Mauvaise réponse'}
                    </Text>
                </View>
                <QuizzInfo errors={errors} />
            </View>
            <View style={styles.buttonsContainer}>
                <Button
                    bgColor={GlobalStyles.colors.main}
                    color='white'
                    fontSize={Dimensions.get('window').width > 450 ? 25 : 18}
                    style={[styles.button, { marginLeft: 10 }]}
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
        paddingBottom: 30,
        paddingHorizontal: deviceWidth > 450 ? 120 : 24,
        justifyContent: 'space-between'
    },
    title: {
        color: GlobalStyles.colors.secondary,
        fontSize: 30,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 25
    },
    infoContainer: {
        padding: 20,
        marginBottom: 20,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: 'black',
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4
    },
    colorGoodRep: {
        backgroundColor: 'green',
    },
    colorBadRep: {
        backgroundColor: 'orange'
    },
    numberContainer: {
        backgroundColor: GlobalStyles.colors.secondary,
        width: deviceWidth > 450 ? 46 : 36,
        height: deviceWidth > 450 ? 46 : 36,
        borderRadius:deviceWidth > 450 ? 23 : 18,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInfo: {
        fontSize: deviceWidth > 450 ? 30 : 20,
        textAlign: 'center',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: GlobalStyles.colors.secondary
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 30
    },
    button: {
        flex: 1,
    }
})
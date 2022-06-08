import {View, Text, Button, StyleSheet} from 'react-native'

import { GlobalStyles } from '../constants/styles'
import QuizzInfo from '../components/QuizzInfo'

function FeedBackQuizzScreen ({route, navigation}){

    const nb_good_rep = route.params.nb_good_rep
    const nb_bad_rep = route.params.nb_bad_rep
    const errors = route.params.errors

    return(
        <View style={styles.main}>
            <View style={[styles.infoContainer, styles.colorGoodRep]}>
                <View style={styles.numberContainer}>
                    <Text style={[styles.textInfo, {color: 'green'}]}>
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
                    <Text style={[styles.textInfo, {color: 'orange'}]}>
                        {nb_bad_rep}
                    </Text>
                </View>
                <Text 
                    style={[styles.textInfo]}
                >
                    {nb_bad_rep > 1 ? 'Mauvaises réponses' : 'Mauvaise réponse'}
                </Text>
            </View>
            <QuizzInfo errors={errors}/>
            <Button title='Go back' onPress={()=>{navigation.goBack()}}/>
        </View>
    )
}

export default FeedBackQuizzScreen

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: GlobalStyles.colors.main,
        padding: 30,
        paddingTop: 80
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
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.4
    },
    colorGoodRep: {
        backgroundColor: 'green'
    },
    colorBadRep: {
        backgroundColor: 'orange'
    },
    numberContainer: {
        backgroundColor: GlobalStyles.colors.secondary,
        width: 36,
        height: 36,
        borderRadius: '18',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInfo: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: GlobalStyles.colors.secondary
    },
   
})
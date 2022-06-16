import { Text, View, StyleSheet, Dimensions } from "react-native";
import { useState, useEffect } from "react";
import { GlobalStyles } from "../constants/styles";

import RadioButton from "./ui/RadioButton";

function Question({question, setReponses, reponses}){

    const [choix, setChoix] = useState({
                                            reponseA : false,
                                            reponseB : false,
                                            reponseC : false,
                                            reponseD : false
                                        })
    
    function handleChange(reponse){
        //pour gérer l'affichage
        let currentState = {
            reponseA : false,
            reponseB : false,
            reponseC : false,
            reponseD : false
        }
        currentState[reponse] = ! choix[reponse]
        setChoix(currentState)
    }

    //Permet de mettre à jour la liste des réponses à chaque fois que le choix change
    useEffect(()=>{
        let reponsesTab = [...reponses]
        //On enleve la réponse à la question de la liste pour y ajouter la nouvelle
        reponsesTab = reponses.filter((reponse)=> reponse.idQuestion !== question.id)
        //Si réponse A est coché
        if(choix.reponseA){
            //On ajoute réponse A associé à l'id de la question à la liste des réponse
            reponsesTab.push({reponse:'reponseA', idQuestion: question.id})
        }
        if(choix.reponseB){
            reponsesTab.push({reponse:'reponseB', idQuestion: question.id})
        }
        if(choix.reponseC){
            reponsesTab.push({reponse:'reponseC', idQuestion: question.id})
        }
        if(choix.reponseD){
            reponsesTab.push({reponse:'reponseD', idQuestion: question.id})
        }
        
        setReponses(reponsesTab)
    },[choix])

    return(
        <View style={styles.main}>
            <View style={styles.questionContainer}>
                <Text style={styles.questionText}>{question.question}</Text>
            </View>
            <View style={styles.responseContainer}>
                <Text style={styles.reponseText}>A - {question.reponseA}</Text>
                <RadioButton pressed={choix.reponseA} onPress={handleChange.bind(this, 'reponseA')}/>
            </View>
            <View style={styles.responseContainer}>
                <Text style={styles.reponseText}>B - {question.reponseB}</Text>
                <RadioButton pressed={choix.reponseB} onPress={handleChange.bind(this, 'reponseB')}/>
            </View>
            <View style={styles.responseContainer}>
                <Text style={styles.reponseText}>C - {question.reponseC}</Text>
                <RadioButton pressed={choix.reponseC} onPress={handleChange.bind(this, 'reponseC')}/>
            </View>
            <View style={styles.responseContainer}>
                <Text style={styles.reponseText}>D - {question.reponseD}</Text>
                <RadioButton pressed={choix.reponseD} onPress={handleChange.bind(this, 'reponseD')}/>
            </View>
        </View>
    )
}

export default Question

const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    main: {
        marginVertical:  deviceWidth > 450 ? 32 : 16,
        backgroundColor: GlobalStyles.colors.secondary,
        padding: deviceWidth > 450 ? 32 : 16,
        borderRadius: 20,
        shadowColor: 'black',
        shadowRadius: 4,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.4,
    },
    questionContainer: {
        marginBottom: 15
    },
    responseContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: deviceWidth > 450 ? 16 : 8
    },
    reponseText: {
        fontSize: deviceWidth > 450 ? 30 : 22,
    },
    questionText: {
        fontSize: deviceWidth > 450 ? 40 : 27,
        fontWeight: '500',
        textAlign: 'center',
        color: GlobalStyles.colors.main
    }
})
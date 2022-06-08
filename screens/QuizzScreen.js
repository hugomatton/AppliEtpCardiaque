import { FlatList, View, StyleSheet, Alert } from 'react-native'
import { useLayoutEffect, useEffect, useState } from 'react'
import axios from 'axios'

import IconButton from '../components/ui/IconButton'
import Question from '../components/Question'
import LoadingOverlay from '../components/ui/LoadingOverlay'
import { GlobalStyles } from '../constants/styles'
import ProgressBar from '../components/ProgressBar'
import Button from '../components/ui/Button'

function QuizzScreen({ navigation }) {

    const [questions, setQuestions] = useState([])
    const [reponses, setReponses] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => {
                return <IconButton icon="arrow-back" color="white" onPress={() => { navigation.goBack() }} />
            }
        })
    }, [])

    useEffect(() => {
        async function getQuestions() {
            setIsLoading(true)
            const response = await axios.get('https://etpchu-default-rtdb.firebaseio.com/questions.json')
            setIsLoading(false)
            const questionsTab = []
            for (let question in response.data) {
                questionsTab.push({ ...response.data[question], id: question })
            }
            setQuestions(questionsTab)
        }
        getQuestions()
    }, [])

    function checkReponse(){
        //variable que l'on retourne
        let nb_good_rep = 0
        let nb_bad_rep = 0
        let errors = []
        //on verifie que l'utilisateur a répondu à toute les questions
        if(reponses.length !== questions.length){
            Alert.alert('Vous devez répondre à toutes les questions')
            return
        }
        //on verifie que les réponses sont correctes
        for(let reponse of reponses){
            for(let question of questions){
                if(question.id === reponse.idQuestion){
                    //On regarde si la réponse correspond à la réponse exacte
                    if(question.bonneReponse === reponse.reponse){
                        nb_good_rep = nb_good_rep + 1
                    }
                    else{
                        nb_bad_rep = nb_bad_rep + 1
                        errors.push(question)
                    }
                }
            }
        }
        navigation.goBack()
        console.log({nb_good_rep: nb_good_rep, nb_bad_rep: nb_bad_rep, errors: errors })
        navigation.navigate('quizzFeedBack', {nb_good_rep: nb_good_rep, nb_bad_rep: nb_bad_rep, errors: errors })
    }

    function onSubmit(){
        checkReponse()
    }

    function renderQuestion(itemData) {
        return (
            <Question
                question={itemData.item}
                reponses={reponses}
                setReponses={setReponses}
            />
        )
    }

    function renderButtonValidation(){
        return(
            <View style={styles.buttonContainer}>
                <Button 
                    onPress={onSubmit}
                    color='white'
                    bgColor='green'
                    fontSize={18}
                >
                    Valider
                </Button>
            </View>
        )
    }

    if (isLoading) {
        return (
            <LoadingOverlay />
        )
    }

    return (
        <View style={styles.main}>
            <ProgressBar
                totalStep={questions.length}
                step={reponses.length}
                pourcentage={false}
            />
            <FlatList
                data={questions}
                keyExtractor={(item) => item.id}
                renderItem={renderQuestion}
                ListFooterComponent={renderButtonValidation}
            />
        </View>
    )
}

export default QuizzScreen

const styles = StyleSheet.create({
    main: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.main
    },
    buttonContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    }
})
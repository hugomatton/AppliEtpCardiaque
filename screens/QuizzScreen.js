import { FlatList, View, StyleSheet } from 'react-native'
import { useLayoutEffect, useEffect, useState } from 'react'
import axios from 'axios'

import IconButton from '../components/ui/IconButton'
import Question from '../components/Question'
import LoadingOverlay from '../components/ui/LoadingOverlay'
import { GlobalStyles } from '../constants/styles'
import ProgressBar from '../components/ProgressBar'
import QuizzButton from '../components/ui/QuizzButton'

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
                <QuizzButton>VALIDER</QuizzButton>
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
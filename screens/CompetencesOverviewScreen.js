import { View, FlatList, StyleSheet, Dimensions } from 'react-native'
import { useEffect, useState, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import CompetenceCard from '../components/CompetenceCard'
import { fetchCompetences } from '../util/http'
import LoadingOverlay from '../components/ui/LoadingOverlay'
import { GlobalStyles } from '../constants/styles'
import ProgressBar from '../components/ProgressBar'
import { CompetencesContext } from '../store/competences-context'
import Button from '../components/ui/Button'

function CompetencesOverviewScreen({ navigation }) {

    //la liste des compétences
    const [competences, setCompetences] = useState([])

    //le contexte contenant les compétences valides
    const competencesCtx = useContext(CompetencesContext)

    //Variable indiquant si la liste des compétences est en train de charger
    const [isLoading, setIsLoading] = useState(false)

    /**
     * Initialise la liste des compétences avec une requête httes
     * Initilise le context des compétences validés
     */
    useEffect(() => {
        //Initialisation de la liste des compétences
        async function getCompetences() {
            setIsLoading(true)
            const competencesList = await fetchCompetences()
            setIsLoading(false)
            setCompetences(competencesList)
        }
        getCompetences()
        //Initialisation du contexte
        async function getCompetencesOver() {
            const competenceValides = await AsyncStorage.getAllKeys()
            competencesCtx.setCompetences(competenceValides)
        }
        getCompetencesOver()
    }, [])


    /**
     * Retourne un composant CompetenceCard pour la faltlist
     */
    function renderCompetenceCard(itemData) {
        //données que l'on passe au composant
        const title = itemData.item.title
        const id = itemData.item.id
        //fonction exécuté lorsqu'on appuie sur la CompetenceCard
        function pressHandler() {
            navigation.navigate("CompetenceDetail", { competenceTitle: title, competenceId: id })
        }
        return (
            <CompetenceCard
                onPress={pressHandler}
                title={title}
                isOver={competencesCtx.competences.indexOf(id) !== -1}
            />
        )
    }

    function navigateToQuizz(){
        navigation.navigate('quizz')
    }

    //Si le chargement est en cour on retour le LoadingOverlay
    if (isLoading) {
        return <LoadingOverlay />
    }

    return (
        <View style={styles.rootContainer}>
            <View style={styles.progressBarContainer}>
                <ProgressBar
                    accueil
                    pourcentage
                    step={competencesCtx.competences.length} //bug avec asyncstorage qui conserve compétence supprimée
                    totalStep={competences.length}
                />
            </View>
            <View                     
                style={styles.flatListContainer}
            >
                <FlatList
                    data={competences}
                    keyExtractor={(item) => item.title}
                    renderItem={renderCompetenceCard}
                    alwaysBounceVertical={false}
                />
            </View>
            <View style={styles.buttonQuizzContainer}>
                <Button 
                    onPress={navigateToQuizz}
                    bgColor='green'
                    fontSize={Dimensions.get('window').width > 450 ? 25 : 18}
                    color='white'
                >
                    Testez vous
                </Button>
            </View>
        </View>
    )
}

export default CompetencesOverviewScreen

const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        paddingHorizontal: deviceWidth > 450 ? 100 : 24,
        backgroundColor: GlobalStyles.colors.main
    },
    progressBarContainer: {
        marginVertical: 20,
    },
    flatListContainer: {
        flex: 10,
    },
    buttonQuizzContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 38,
        paddingTop: 20,
    }
})
import { View, FlatList, StyleSheet, Dimensions } from 'react-native'
import { useEffect, useState, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import CompetenceCard from '../components/CompetenceCard'
import { fetchCompetences } from '../util/http'
import LoadingOverlay from '../components/ui/LoadingOverlay'
import ProgressBar from '../components/ProgressBar'
import Button from '../components/ui/Button'
import Info from '../components/Info'
import { NotionsContext } from '../store/notions-context'
import { CompetencesContext } from '../store/competences-context'
import { GlobalStyles } from '../constants/styles'

function CompetencesOverviewScreen({ navigation }) {

    //la liste des compétences
    const [competences, setCompetences] = useState([])

    //le contexte contenant les compétences valides
    const competencesCtx = useContext(CompetencesContext)

    //le contexte contenant les notions présentes dans l'application
    const notionsCtx = useContext(NotionsContext)

    //Variable indiquant si la liste des compétences est en train de charger
    const [isLoading, setIsLoading] = useState(false)

    /**
     * Initialise la liste des compétences avec une requête httes
     * Initilise le context des compétences validés
     */
    useEffect(() => {
        /**
         * Fonction permettant de récupérer les compétences grace à une requete http
         */
        async function getCompetences() {
            setIsLoading(true)
            const competencesList = await fetchCompetences()
            setIsLoading(false)
            setCompetences(competencesList)
        }
        getCompetences()
        /*
         * Fonction permettant l'nitialisation du contexte compétences
         */
        async function getCompetencesOver() {
            //on récupère l'id des compétences qui sont validées
            const competenceValides = await AsyncStorage.getAllKeys()
            //On les mets dans le contexte
            competencesCtx.setCompetences(competenceValides)
        }
        getCompetencesOver()
        /**
         * Fonction permettant l'initialisation du contexte notions
         */
        function setNotionsCtx(){
            notionsCtx.setNotions(competences)
        }
        setNotionsCtx()
    }, [])


    /**
     * Retourne un composant CompetenceCard pour la flatlist
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
                isOver={competencesCtx.competences.indexOf(id) !== -1} //on regarde si l'id de la compétence se trouve dans le contexte --> Si oui la compétence est validée
            />
        )
    }

    /**
     * Retourne le nombre de compétences valides
     */
    function nbCompetencesValides() {
        let compteur = 0
        //On parcours les compétences reçues grace à la requete HTTP
        for (let c of competences) {
            //On regarde si ces compétences ont leur id enregistré dans le localstorage
            if (competencesCtx.competences.indexOf(c.id) !== -1) {
                //Si oui --> compétence validée
                compteur++
            }
        }
        return compteur
    }

    function navigateToQuizz() {
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
                    step={nbCompetencesValides()}
                    totalStep={competences.length}
                />
                <Info
                    over={competences.length / nbCompetencesValides() === 1}
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
                    style={styles.button}
                    onPress={navigateToQuizz}
                    //onPress={()=>{console.log(notionsCtx.notions)}}
                    bgColor={GlobalStyles.colors.accent}
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 30
    },
    button: {
        flex: 1
    }
})
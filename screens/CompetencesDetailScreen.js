import { View, FlatList, StyleSheet, Dimensions } from 'react-native'
import { useLayoutEffect, useState, useEffect, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Paragraphe from '../components/Paragraphe'
import { fetchCompetenceById } from '../util/http'
import LoadingOverlay from '../components/ui/LoadingOverlay'
import { GlobalStyles } from '../constants/styles'
import IconButton from '../components/ui/IconButton'
import Button from '../components/ui/Button'
import { CompetencesContext } from '../store/competences-context'

function CompetenceDetailScreen({ navigation, route }) {

    //la compétence que l'on souhaite afficher
    const [competence, setCompetence] = useState({ paragraphes: [], title: '' })

    //contexte des competences valides
    const competencesCtx = useContext(CompetencesContext)

    //variable indiquant si la competence est en train de se charger
    const [isLoading, setIsLoading] = useState(false)

    //récupère le titre de la compétence sur laquelle on a cliqué 
    const competenceTitle = route.params.competenceTitle
    //récupère le titre de la compétence sur laquelle on a cliqué 
    const competenceId = route.params.competenceId

    /**
     * Affiche le header en prenant compte de la compétence sur laquelle on a cliqué
     */
    useLayoutEffect(() => {
        navigation.setOptions({
            title: competenceTitle,
            headerLeft: () => {
                return <IconButton icon="arrow-back" color="white" onPress={() => { navigation.goBack() }} />
            }
        })
    }, [])

    /**
     * Charge la compétence en fonction de son id
     */
    useEffect(() => {
        //chargement de la compétence
        async function fetchCompetence() {
            setIsLoading(true)
            const competence = await fetchCompetenceById(competenceId)
            setIsLoading(false)
            setCompetence(competence)
        }
        fetchCompetence()
    }, [competenceId])

    /**
     * Si la compétence est terminé cette fonction la passe à non terminé
     * Et si la compétence n'est pas terminée vice versa
     */
    async function stateCompetenceHandler() {
        //si compétence est terminée
        if (competenceIsOver()) {
            //on la passe en non terminée
            await AsyncStorage.removeItem(competenceId)
            competencesCtx.deleteCompetence(competenceId)
        }
        //sinon
        else {
            await AsyncStorage.setItem(competenceId, competenceId)
            competencesCtx.addCompetence(competenceId)
        }
        navigation.goBack()
    }

    /**
     * Fonction rendant le composant paragraphe pour la flatlist
     */
    function renderParagraphe(itemData) {
        const item = itemData.item
        return (
            <Paragraphe
                subtitle={item.subtitle}
                text={item.text}
                imageUrl={item.imageUrl}
            />
        )

    }

    /**
     * Fonction permettant de savoir si la compétence est terminée
     */
    function competenceIsOver() {
        return competencesCtx.competences.indexOf(competenceId) !== -1
    }

    //si la compétence est en cour de chargement on retour le loading overlay
    if (isLoading) {
        return <LoadingOverlay />
    }

    return (
        <View style={styles.rootContainer}>
            <FlatList
                style={{width: '100%'}}
                data={competence.paragraphes}
                keyExtractor={(item) => item.id}
                alwaysBounceVertical={false}
                renderItem={renderParagraphe}
            />
            <View style={styles.buttonContainer}>
                <Button
                    bgColor={GlobalStyles.colors.main}
                    color={GlobalStyles.colors.secondary}
                    fontSize={Dimensions.get('window').width > 450 ? 25 : 18}
                    onPress={stateCompetenceHandler}
                >
                    {competenceIsOver() ?
                        "Indiquer que cette compétence n'est pas terminée"
                        :
                        "Indiquer que cette compétence est terminée"
                    }
                </Button>
            </View>
        </View>
    )
}


export default CompetenceDetailScreen


const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: GlobalStyles.colors.main,
        position: 'relative',
    },
    buttonContainer: {
        paddingBottom: 22,
        paddingTop: 10,
        position: 'absolute',
        zIndex: 2,
        bottom: 10
    }
})
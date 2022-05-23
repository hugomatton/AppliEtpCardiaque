import {View, FlatList, StyleSheet, Text} from 'react-native'
import { useEffect, useState, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import CompetenceCard from '../components/CompetenceCard'
import {fetchCompetences} from '../util/http'
import LoadingOverlay from '../components/ui/LoadingOverlay'
import { GlobalStyles } from '../constants/styles'
import ProgressBar from '../components/ProgressBar'
import {CompetencesContext} from '../store/competences-context'

function CompetencesOverviewScreen({navigation}){

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
    useEffect(()=>{
        //Initialisation de la liste des compétences
        async function getCompetences(){
            setIsLoading(true)
            const competencesList = await fetchCompetences()
            setIsLoading(false)
            setCompetences(competencesList)
        }
        getCompetences()
        //Initialisation du contexte
        async function getCompetencesOver(){
            const competenceValides = await AsyncStorage.getAllKeys()
            competencesCtx.setCompetences(competenceValides)
        }
        getCompetencesOver()
    },[])


    /**
     * Retourne un composant CompetenceCard pour la faltlist
     */
    function renderCompetenceCard(itemData){
        //données que l'on passe au composant
        const title = itemData.item.title
        const id = itemData.item.id
        //fonction exécuté lorsqu'on appuie sur la CompetenceCard
        function pressHandler(){
            navigation.navigate("CompetenceDetail", {competenceTitle: title, competenceId: id})
        }
        return(
            <CompetenceCard 
                onPress={pressHandler} 
                title={title}
                isOver={competencesCtx.competences.indexOf(id) !== -1}   
            />
        )
    }

    //Si le chargement est en cour on retour le LoadingOverlay
    if(isLoading){
        return <LoadingOverlay/>
    }

    return(
        <View style={styles.rootContainer}>
            <View style={styles.progressBarContainer}>
                <ProgressBar 
                    step={competencesCtx.competences.length} //bug avec asyncstorage qui conserve compétence supprimée
                    totalStep={competences.length}
                />
            </View>
            <FlatList
                data={competences}
                StickyHeaderComponent={()=> <Text>Hey</Text>}
                keyExtractor={(item)=> item.title}
                renderItem={renderCompetenceCard}
            />
        </View>
    )
}   

export default CompetencesOverviewScreen

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        paddingHorizontal: 24,
        backgroundColor: GlobalStyles.colors.main
    },
    progressBarContainer: {
        marginVertical: 20,
    }
})
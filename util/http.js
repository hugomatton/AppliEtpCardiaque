import axios from 'axios'

const BACKEND_URL = 'https://etpchu-default-rtdb.firebaseio.com'

export async function fetchCompetences(){
    const response = await axios.get(BACKEND_URL+'/competences.json')
    const competences = []
    for (const key in response.data){
        const competenceObj = {
            id : key,
            title: response.data[key].title,
            paragraphes: response.data[key].paragraphes
        }
        competences.push(competenceObj)
    }
    return competences
}

export async function fetchCompetenceById(competenceId){
    const response = await axios.get(`${BACKEND_URL}/competences/${competenceId}.json`)
    return response.data
}
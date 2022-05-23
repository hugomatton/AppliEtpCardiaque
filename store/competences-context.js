import { createContext, useReducer } from "react";

export const CompetencesContext = createContext({
    competencesId: [],
    addCompetence: (competenceId) => {},
    deleteCompetence: (competenceId) => {},
    setCompetences: () => {}
})

function competencesReducer(state, action){
    switch (action.type) {
        case 'ADD':
            return [action.payload, ...state]
        case 'DELETE':
            return state.filter((competence) => competence !== action.payload)
        case 'SET':
            return action.payload
        default:
            return state
    }
}

function CompetencesContextProvider({children}){

    const [competencesState, dispatch] = useReducer(competencesReducer ,[])

    function addCompetence(competenceId){
        dispatch({type: 'ADD', payload: competenceId})
    }

    function deleteCompetence(competenceId){
        dispatch({type: 'DELETE', payload: competenceId})
    }

    function setCompetences(competences){
        dispatch({type: 'SET', payload: competences })
    }

    const value ={
        competences: competencesState,
        addCompetence: addCompetence,
        deleteCompetence: deleteCompetence,
        setCompetences: setCompetences
    }

    return (
        <CompetencesContext.Provider value={value}>
            {children}
        </CompetencesContext.Provider>
    )
}

export default CompetencesContextProvider
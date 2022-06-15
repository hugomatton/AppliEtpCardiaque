/*
    Ce contexte contient les notions que doit afficher l'application
*/

import { createContext, useState } from "react";

export const NotionsContext = createContext({
    notions : [],
    setNotions: (notions) => {}
})

function NotionsContextProvider({children}){

    const [notionsList, setNotionsList] = useState([])

    function setNotions(notions){
        setNotionsList(notions)
    }

    const value = {
        notions: notionsList,
        setNotions: setNotions
    }

    return (
        <NotionsContext.Provider value={value}>
            {children}
        </NotionsContext.Provider>
    )
}

export default NotionsContextProvider
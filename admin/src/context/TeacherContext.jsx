import { createContext } from "react";

export const TeacherContext = createContext()

const TeacherContextProvider = (props)=> {

    const value = {

    }

    return (
        <TeacherContext.Provider value={value}>
            {props.children}
        </TeacherContext.Provider>
    )

}

export default TeacherContextProvider
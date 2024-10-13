import { createContext, useEffect, useState } from "react";
import { doctors} from "/src/assets/assets.js"
import axios from "axios"
import { toast } from "react-toastify";


export const AppContext = createContext();


const AppContextProvider = (props)=> {

const currncySymbol = "$"
const backendUrl = import.meta.env.VITE_BACKEND_URL
const [teachers, setTeachers] = useState([])
const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):false)



    const getTeacherData = async ()=> { 
        try {
            
            const {data} = await axios.get(backendUrl + '/api/teachers/list')
            if (data.success) {
                setTeachers(data.teachers)
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const value = {
        doctors,currncySymbol,token,setToken,backendUrl,getTeacherData
    }

    useEffect(()=> {
        getTeacherData()
    } , [])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider
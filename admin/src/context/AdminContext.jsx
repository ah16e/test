import { createContext, useState } from "react";
import axios from "axios";
import { toast} from "react-toastify"






export const AdminContext = createContext()

const AdminContextProvider = (props)=> {

    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ?localStorage.getItem('aToken'): '')
    const [teacher , setTeachers] = useState([])
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getAllTeacher = async ()=> { 
        try {
            
            const {data} = await axios.post(backendUrl + '/api/admin/all-teacher' , {} , {headers: aToken})
            if (data.success) {
                setTeachers(data.doctors)
                console.log(data.teacher);
                
            }else{
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const changeAvailability = async (docId)=> {

        try {

            const {data} = await axios.post(backendUrl +  '/api/admin/change-availaiblity' , {docId},{headers:{aToken}})
            if (data.success) {
                toast.success(data.message)
                getAllTeacher()
            }else{
                toast.error(data.message)
            }
            
        } catch (error) {
            toast.error(error.message)
        }

    }

    const value = {
        aToken,setAToken,
        backendUrl,teacher,getAllTeacher,changeAvailability

    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )

}

export default AdminContextProvider
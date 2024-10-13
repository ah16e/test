import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    const [token, setToken] = useState(localStorage.getItem('token')); // Retrieve token from localStorage
    const [teacher, setTeachers] = useState([]);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const getAllTeacher = async () => {
        try {
          const { data } = await axios.get(`${backendUrl}/teachers/`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log('Response Data:', data); // Log response data
          setTeachers(data); // Set the data array directly to state
        } catch (error) {
          console.error('Error fetching teachers:', error.response || error);
          toast.error(error.message);
        }
      };
      
      
    const value = {
        token, setToken,
        backendUrl, teacher, getAllTeacher
    };

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;

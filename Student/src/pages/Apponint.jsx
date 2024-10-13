import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import info from "/src/assets/info_icon.svg"
import videoa from '/src/assets/video/techer2.mp4'
import { toast } from 'react-toastify'
import axios from 'axios'

export default function Apponint() {

  const {docId} = useParams();
  const { doctors ,currncySymbol , backendUrl  ,token , getTeacherData } = useContext(AppContext);
  const navigate = useNavigate()
  const daysOfweek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const [docInfo , setDocInfo] = useState(null);
  const [teachers , setTeachers] = useState([]);
  const [slotIndex , setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId)
      setDocInfo(docInfo)
      
  }

  const getAvilabelSlots = async () => {
    setTeachers([])

    let today = new Date();



    for(let i =0 ; i < 7 ;i++) {


      let currntDate = new Date(today)
      currntDate.setDate(today.getDate()+i)


      let endTime = new Date()
      endTime.setDate(today.getDate()+i)
      endTime.setHours(21,0,0,0)


      if(today.getDate() === currntDate.getDate()){
        currntDate.setHours(currntDate.getHours() > 10 ? currntDate.getHours() + 1 : 10)
        currntDate.setMinutes(currntDate.getMinutes() > 30 ? 30 : 0)
      }else{
        currntDate.setHours(10)
        currntDate.setMinutes(0)
      }

      let timeSlots = []
      while(currntDate < endTime ){
        let formattedTime = currntDate.toLocaleTimeString([] , {hour: '2-digit' , minute: '2-digit'})
        
        timeSlots.push({
          datetime: new Date(currntDate),
          time: formattedTime
        })

        currntDate.setMinutes(currntDate.getMinutes() + 30)
      }
      setTeachers(prev => ([...prev, timeSlots]))
    }
  }


  const bookAppointment = async ()=> { 

    if (!token) {
      toast.warn('Login to book Appointment')
      return navigate('/login')
    }
    try {
      
      const date = docSlots[slotIndex][0].datetime

      let day = date.getDate()
      let month = date.getMonth()+1
      let year = date.getFullYear()
      
      const slotDate  = day + "_" + month + "_" + year
      
      const {data} =  await axios.post(backendUrl + '/api/user/book-appointment',{docId , slotDate , slotTime}  ,  {headers:{token}})
      if (data.success) {
        toast.success(data.message)
        getTeacherData()
        navigate('/my-appointments')
      }else{
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }


  useEffect(()=> {
    fetchDocInfo()
  } , [doctors,docId]);

  useEffect(()=> {
      getAvilabelSlots()
  } , [docInfo])


  useEffect(()=> {
    console.log(teachers);
    
  } , [teachers])

  return docInfo && (
    <div>

        <div className='flex flex-col sm:flex-row gap-4'>
          <div>
            <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
          </div>

          <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
            <p className='flex items-center gap-2 text-2xl font-semibold  text-gray-900'>{docInfo.name}</p>
            <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
              <p>{docInfo.degree}</p>
            </div>

            <div>
              <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3' >About <img src={info} alt="" /></p>
              <p className='text-sm text-gray-500 max-w-[700px] mt-1 '>{docInfo.about}</p>
            </div>
            <p className='text-gray-500 font-medium mt-4'>
              Appointment fee: <span className='text-gray-600'>{currncySymbol}{docInfo.fees}</span>
            </p>
          </div>
        </div>

      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Booking Slots</p>
        <div className=' flex gap-3 items-center  w-full  mt-4'>
          {
            teachers.length && teachers.map((item,index)=>(
              <div key={index}  onClick={()=> setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}`} >
                  <p>{item[0] && daysOfweek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))
          }
        </div>
        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {teachers.length && teachers[slotIndex].map((item,index)=>(
            <p onClick={()=> setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-800 border border-gray-200'}`} key={index}>
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>
        <button onClick={()=> bookAppointment()} className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full'>Appointment</button>
      </div>


          <div className='flex flex-col justify-center mt-4 pb-4 items-center'>
            <div className='sm:py-5 md:flex-col'>
            <video width={600} height={400} controls autoPlay loop muted>
            <source src={videoa} type="video/mp4" />
          </video>
            </div>
          </div>


    </div>
  )
}

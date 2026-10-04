import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUserData } from './redux/userSlice'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import InterviewPage from './pages/InterviewPage'
import InterviewHistory from './pages/InterviewHistory'
import Pricing from './pages/Pricing'
import InterviewReport from './pages/InterviewReport'
function App() {
 const dispatch = useDispatch()
  useEffect(()=>{
    const getUser = async () => {
      try 
      {
        const token = localStorage.getItem("accessToken");
        console.log("TOKEN:", token);
        if (!token) {
        dispatch(setUserData(null));
        return;
      }
        const result = await axios.get("/api/auth/curent-user", {
           headers: {
    Authorization: `Bearer ${token}`,
  },
}
        )
        dispatch(setUserData(result.data.data))
      } 
      catch (error) 
      {
        console.log(error)
        dispatch(setUserData(null))
      }
    }
    getUser()

  },[dispatch])

  return (
  <Routes>
        <Route path='/' element={<Home/>}/>
          <Route path='/interview' element={<InterviewPage/>}/>
            <Route path='/history' element={<InterviewHistory/>}/>
  <Route path='/pricing' element={<Pricing/>}/>
  <Route path='/report/:id' element={<InterviewReport/>}/>
  </Routes>
    
  )
}

export default App;

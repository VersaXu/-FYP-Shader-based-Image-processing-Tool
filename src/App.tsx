import React, { useReducer, useEffect } from 'react'
import RouterPages from './router'
import { BrowserRouter } from 'react-router-dom'
import CusLayout from './layout/Layout'
import { appReducer, DEFAULT_STORE_STATE, AppContext } from './store'
import { useUserStore } from './store/useUserStore'
import axios from 'axios'

const App = () => {
  const baseName = import.meta.env.VITE_ROUTER_BASE
  axios.defaults.baseURL = 'http://localhost:1337/api'
  const [state, dispatch] = useReducer(appReducer, { ...DEFAULT_STORE_STATE })

  // 判断是否登录
  const { recoverUser, user } = useUserStore()
  useEffect(() => {
    const fetchData = async () => {
      await recoverUser()
    }
    fetchData()
    console.log('APP 执行一次recoverUser:' + user)
  }, [user])

  return (
    <BrowserRouter basename={baseName}>
      <AppContext.Provider value={{ state, dispatch }}>
        <CusLayout Element={() => <RouterPages />} />
      </AppContext.Provider>
    </BrowserRouter>
  )
}
export default App

import React, { useReducer } from 'react'
import RouterPages from './router'
import { BrowserRouter } from 'react-router-dom'
import CusLayout from './layout/Layout'
import { appReducer, DEFAULT_STORE_STATE, AppContext } from './store'

const App = () => {
  const baseName = import.meta.env.VITE_ROUTER_BASE
  const [state, dispatch] = useReducer(appReducer, { ...DEFAULT_STORE_STATE })
  return (
    <BrowserRouter basename={baseName}>
      <AppContext.Provider value={{ state, dispatch }}>
        <CusLayout Element={() => <RouterPages />} />
      </AppContext.Provider>
    </BrowserRouter>
  )
}
export default App

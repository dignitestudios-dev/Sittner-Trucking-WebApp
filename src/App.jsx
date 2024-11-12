import { ToastContainer } from 'react-toastify'
import './App.css'
import { MyContextProvider } from './context/GlobalContext'
import AppRoutes from './routes/AppRoutes'
function App() {
 
  return (
 <>
         <ToastContainer  />
 <MyContextProvider>
      <AppRoutes />
    </MyContextProvider>
 </>
  )
}

export default App

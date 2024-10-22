import { ToastContainer } from 'react-toastify'
import './App.css'
import { MyContextProvider } from './context/GlobalContext'
import AppRoutes from './routes/AppRoutes'
function App() {
 
  return (
    <MyContextProvider>
         <ToastContainer  />
      <AppRoutes />
    </MyContextProvider>
  )
}

export default App

import './App.css'
import { MyContextProvider } from './context/GlobalContext'
import AppRoutes from './routes/AppRoutes'
function App() {
  window.addEventListener('load', async () => {
    if (navigator.serviceWorker) {
      await navigator.serviceWorker.register('/service-worker.ts')
      console.log('service worker registered successfully')
    }
  })
  return (
    <MyContextProvider>
      <AppRoutes />
    </MyContextProvider>
  )
}

export default App

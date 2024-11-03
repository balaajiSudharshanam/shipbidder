import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import UserContext from './context/UserContextProvider.jsx'
import { BrowserRouter } from 'react-router-dom'
import FormContextProvider from './context/FormContextProvide.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <UserContext>
      <FormContextProvider>


    <App />
      </FormContextProvider>
    </UserContext>
    </BrowserRouter>
  </StrictMode>,
)

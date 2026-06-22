import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './LoginPage'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

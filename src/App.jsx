import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import DashBoard from './components/Dashboard'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<DashBoard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
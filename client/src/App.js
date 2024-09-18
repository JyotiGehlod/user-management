import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Rejister from './Components/Rejister'
import EditUser from './Action/EditUser'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={< Home />} />
        <Route path='/rejister' element={< Rejister />} />
        <Route path='/editUser/:id' element={<EditUser />} />
      </Routes>
    </Router>
  )
}

export default App;

import React from 'react'
import { BrowserRouter as Router, Routes, Route, Links} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import BoardPage from './pages/BoardPage';
import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/board/:id" element={<BoardPage />} />

      </Routes>
    </Router>
  )
}

export default App

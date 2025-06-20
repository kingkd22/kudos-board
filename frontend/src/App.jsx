import React, { useState, useEffect }from 'react'
import { BrowserRouter as Router, Routes, Route, Links} from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import Dashboard from './components/Dashboard';
import BoardPage from './pages/BoardPage';
import './App.css'
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
  }, [])

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className={`app-container ${theme}`}>
      <Router>
        <Header onToggleTheme={toggleTheme} theme={theme} />
        <Routes>
          <Route path="/" element={<Dashboard theme={theme} />} />
          <Route path="/board/:id" element={<BoardPage theme={theme} />} />
        </Routes>
        <Footer />
      </Router>
      <ToastContainer />
    </div>
  )
}

export default App

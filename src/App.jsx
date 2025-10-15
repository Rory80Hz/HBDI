import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import NameEntry from './components/NameEntry'
import AdjectiveSelection from './components/AdjectiveSelection'
import ProfileResults from './components/ProfileResults'
import TeamMap from './components/TeamMap'
import TeamResults from './components/TeamResults'
import './App.css'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem('hbdiUserData')
    return saved ? JSON.parse(saved) : { name: '', selections: [] }
  })

  useEffect(() => {
    localStorage.setItem('hbdiUserData', JSON.stringify(userData))
  }, [userData])

  const updateUserData = (data) => {
    setUserData(prev => ({ ...prev, ...data }))
  }

  return (
    <Router>
      <ScrollToTop />
      <div className="app">

        
        <main className="app-main">
          <Routes>
            <Route 
              path="/" 
              element={
                <NameEntry 
                  name={userData.name} 
                  onNameSubmit={(name) => updateUserData({ name })} 
                />
              } 
            />
            <Route 
              path="/assessment" 
              element={
                <AdjectiveSelection 
                  selections={userData.selections}
                  onSelectionsUpdate={(selections) => updateUserData({ selections })}
                />
              } 
            />
            <Route 
              path="/results" 
              element={
                <ProfileResults 
                  userData={userData}
                />
              } 
            />
            <Route 
              path="/team-map" 
              element={<TeamMap />} 
            />
            <Route 
              path="/team-results" 
              element={<TeamResults />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

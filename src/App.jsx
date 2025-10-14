import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import NameEntry from './components/NameEntry'
import AdjectiveSelection from './components/AdjectiveSelection'
import ProfileResults from './components/ProfileResults'
import './App.css'

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
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

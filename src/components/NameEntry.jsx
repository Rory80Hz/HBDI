import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './NameEntry.css'

const NameEntry = ({ name, onNameSubmit }) => {
  const [inputName, setInputName] = useState(name || '')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputName.trim()) {
      onNameSubmit(inputName.trim())
      navigate('/assessment')
    }
  }

  return (
    <div className="name-entry">
      <div className="name-entry-card">
        <h2>Welcome to the HBDI Assessment</h2>
        <p>
          The Herrmann Brain Dominance Index (HBDI) is a tool that helps you understand 
          your thinking preferences. This assessment will take about 5-10 minutes to complete.
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Enter your name:</label>
            <input
              type="text"
              id="name"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              placeholder="Your name"
              required
              autoFocus
            />
          </div>
          
          <button type="submit" className="btn-primary">
            Start Assessment
          </button>
        </form>
        
        <div className="info-section">
          <h3>What you'll do:</h3>
          <ol>
            <li>Choose between pairs of adjectives that best describe you</li>
            <li>Complete all 24 pairs</li>
            <li>View your personalized brain dominance profile</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

export default NameEntry
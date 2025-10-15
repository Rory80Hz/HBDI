import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/TeamMap.css'

function TeamMap() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    purpose: '',
    possibilities: '',
    people: '',
    process: ''
  })
  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    const scores = ['purpose', 'possibilities', 'people', 'process']
    scores.forEach(score => {
      const value = formData[score]
      if (!value || value === '') {
        newErrors[score] = 'Score is required'
      } else {
        const numValue = parseInt(value)
        if (isNaN(numValue) || numValue < 0 || numValue > 12) {
          newErrors[score] = 'Score must be between 0 and 12'
        }
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    // Get existing team data
    const existingTeamData = JSON.parse(localStorage.getItem('hbdiTeamData') || '[]')
    
    // Create new team member entry
    const newMember = {
      id: Date.now(), // Simple ID generation
      name: formData.name.trim(),
      scores: {
        purpose: parseInt(formData.purpose),
        possibilities: parseInt(formData.possibilities),
        people: parseInt(formData.people),
        process: parseInt(formData.process)
      },
      timestamp: new Date().toISOString()
    }
    
    // Add to team data
    const updatedTeamData = [...existingTeamData, newMember]
    localStorage.setItem('hbdiTeamData', JSON.stringify(updatedTeamData))
    
    // Navigate to team results
    navigate('/team-results')
  }

  return (
    <div className="team-map-container">
      <div className="team-map-content">
        <header className="team-map-header">
          <h1>Add Team Member</h1>
          <p>Enter your name and HBDI scores to add yourself to the team map</p>
        </header>

        <form onSubmit={handleSubmit} className="team-map-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="scores-section">
            <h3>HBDI Scores (0-12 each)</h3>
            <p className="scores-description">
              Enter your scores for each thinking preference category
            </p>
            
            <div className="scores-grid">
              <div className="form-group">
                <label htmlFor="purpose">
                  <span className="score-label">Purpose (Blue)</span>
                  <span className="score-description">Analytical, Logical, Technical</span>
                </label>
                <input
                  type="number"
                  id="purpose"
                  name="purpose"
                  min="0"
                  max="12"
                  value={formData.purpose}
                  onChange={handleInputChange}
                  placeholder="0"
                  className={errors.purpose ? 'error' : ''}
                />
                {errors.purpose && <span className="error-message">{errors.purpose}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="possibilities">
                  <span className="score-label">Possibilities (Yellow)</span>
                  <span className="score-description">Creative, Conceptual, Artistic</span>
                </label>
                <input
                  type="number"
                  id="possibilities"
                  name="possibilities"
                  min="0"
                  max="12"
                  value={formData.possibilities}
                  onChange={handleInputChange}
                  placeholder="0"
                  className={errors.possibilities ? 'error' : ''}
                />
                {errors.possibilities && <span className="error-message">{errors.possibilities}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="people">
                  <span className="score-label">People (Red)</span>
                  <span className="score-description">Interpersonal, Emotional, Spiritual</span>
                </label>
                <input
                  type="number"
                  id="people"
                  name="people"
                  min="0"
                  max="12"
                  value={formData.people}
                  onChange={handleInputChange}
                  placeholder="0"
                  className={errors.people ? 'error' : ''}
                />
                {errors.people && <span className="error-message">{errors.people}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="process">
                  <span className="score-label">Process (Green)</span>
                  <span className="score-description">Organized, Sequential, Planned</span>
                </label>
                <input
                  type="number"
                  id="process"
                  name="process"
                  min="0"
                  max="12"
                  value={formData.process}
                  onChange={handleInputChange}
                  placeholder="0"
                  className={errors.process ? 'error' : ''}
                />
                {errors.process && <span className="error-message">{errors.process}</span>}
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              onClick={() => navigate('/')}
              className="secondary-button"
            >
              Back to Home
            </button>
            <button type="submit" className="primary-button">
              Add to Team
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TeamMap
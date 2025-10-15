import { useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { calculateScores } from '../data/hbdiData'
import './ProfileResults.css'

// Updated color mapping for the correct diagonal quadrant positions
const colorMapping = {
  blue: { name: "Purpose", description: "Interpersonal, Emotional, Spiritual", position: "top-left" },
  yellow: { name: "Possibilities", description: "Creative, Conceptual, Artistic", position: "top-right" },
  red: { name: "People", description: "Leadership, Results-oriented, Decisive", position: "bottom-right" },
  green: { name: "Process", description: "Analytical, Logical, Technical", position: "bottom-left" }
};

const ProfileResults = ({ userData }) => {
  const canvasRef = useRef(null)
  const navigate = useNavigate()

  const scores = calculateScores(userData.selections || [])
  const maxScore = Math.max(...Object.values(scores))
  const dominantColor = Object.entries(scores).find(([, score]) => score === maxScore)?.[0]

  const drawBrainProfile = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 60

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw concentric circles (grid) with scale numbers
    ctx.strokeStyle = '#e0e0e0'
    ctx.lineWidth = 1
    ctx.fillStyle = '#7f8c8d'
    ctx.font = '12px Arial'
    ctx.textAlign = 'center'
    
    for (let i = 1; i <= 4; i++) {
      const circleRadius = (radius / 4) * i
      ctx.beginPath()
      ctx.arc(centerX, centerY, circleRadius, 0, 2 * Math.PI)
      ctx.stroke()
      
      // Add scale numbers (3, 6, 9, 12)
      const scaleValue = i * 3
      ctx.fillText(scaleValue.toString(), centerX + circleRadius + 5, centerY - 5)
    }

    // Draw diagonal axis lines
    ctx.strokeStyle = '#bdc3c7'
    ctx.lineWidth = 2
    
    // Diagonal line from top-left to bottom-right
    ctx.beginPath()
    ctx.moveTo(centerX - radius * 0.707, centerY - radius * 0.707)
    ctx.lineTo(centerX + radius * 0.707, centerY + radius * 0.707)
    ctx.stroke()
    
    // Diagonal line from top-right to bottom-left
    ctx.beginPath()
    ctx.moveTo(centerX + radius * 0.707, centerY - radius * 0.707)
    ctx.lineTo(centerX - radius * 0.707, centerY + radius * 0.707)
    ctx.stroke()

    // Draw quadrant labels outside the chart area
    ctx.font = 'bold 14px Arial'
    ctx.textAlign = 'center'
    
    // Purpose (Top-Left) - Blue, positioned just outside chart
    ctx.fillStyle = '#3498db'
    ctx.fillText('Purpose (Blue)', centerX - radius * 0.8, centerY - radius * 0.8)
    
    // Possibilities (Top-Right) - Yellow, positioned just outside chart
    ctx.fillStyle = '#f1c40f'
    ctx.fillText('Possibilities (Yellow)', centerX + radius * 0.8, centerY - radius * 0.8)
    
    // People (Bottom-Right) - Red, positioned just outside chart
    ctx.fillStyle = '#e74c3c'
    ctx.fillText('People (Red)', centerX + radius * 0.8, centerY + radius * 0.9)
    
    // Process (Bottom-Left) - Green, positioned just outside chart
    ctx.fillStyle = '#2ecc71'
    ctx.fillText('Process (Green)', centerX - radius * 0.8, centerY + radius * 0.9)

    // Calculate points for each quadrant (diagonal positions)
    const maxScore = 12  // Corrected: maximum possible score is 12, not 24
    const points = {
      blue: { // Purpose - Top-Left
        x: centerX - (scores.blue / maxScore) * radius * 0.707,
        y: centerY - (scores.blue / maxScore) * radius * 0.707
      },
      yellow: { // Possibilities - Top-Right
        x: centerX + (scores.yellow / maxScore) * radius * 0.707,
        y: centerY - (scores.yellow / maxScore) * radius * 0.707
      },
      red: { // People - Bottom-Right
        x: centerX + (scores.red / maxScore) * radius * 0.707,
        y: centerY + (scores.red / maxScore) * radius * 0.707
      },
      green: { // Process - Bottom-Left
        x: centerX - (scores.green / maxScore) * radius * 0.707,
        y: centerY + (scores.green / maxScore) * radius * 0.707
      }
    }

    // Draw the profile shape (clockwise from top-left: Purpose -> Possibilities -> People -> Process)
    ctx.beginPath()
    ctx.moveTo(points.blue.x, points.blue.y)
    ctx.lineTo(points.yellow.x, points.yellow.y)
    ctx.lineTo(points.red.x, points.red.y)
    ctx.lineTo(points.green.x, points.green.y)
    ctx.closePath()
    
    // Fill with semi-transparent color
    ctx.fillStyle = 'rgba(52, 152, 219, 0.3)'
    ctx.fill()
    
    // Stroke the outline
    ctx.strokeStyle = '#2980b9'
    ctx.lineWidth = 3
    ctx.stroke()

    // Draw points
    Object.entries(points).forEach(([color, point]) => {
      ctx.beginPath()
      ctx.arc(point.x, point.y, 8, 0, 2 * Math.PI)
      ctx.fillStyle = color === 'yellow' ? '#f1c40f' : 
                      color === 'blue' ? '#3498db' :
                      color === 'red' ? '#e74c3c' : '#2ecc71'
      ctx.fill()
      ctx.strokeStyle = '#2c3e50'
      ctx.lineWidth = 2
      ctx.stroke()
    })
  }, [scores])

  useEffect(() => {
    if (!userData.name || !userData.selections || userData.selections.length === 0) {
      navigate('/')
      return
    }

    drawBrainProfile()
  }, [userData, navigate, drawBrainProfile])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const resetAssessment = () => {
    localStorage.removeItem('hbdiUserData')
    navigate('/')
  }

  if (!userData.name || !userData.selections) {
    return null
  }

  return (
    <div className="profile-results">
      <div className="results-header">
        <h2>Here is your HBDI Profile {userData.name}!</h2>
        <p>Based on your selections, here is your Herrmann Brain Dominance profile.</p>
      </div>

      <div className="results-content">
        <div className="profile-visualization-large">
          <canvas 
            ref={canvasRef} 
            width={500} 
            height={500}
            className="brain-chart-large"
          />
        </div>

        <div className="score-breakdown-horizontal">
          <h3>Your Scores</h3>
          <div className="score-items-grid">
            {['blue', 'yellow', 'red', 'green'].map((color) => (
              <div key={color} className="score-item-card">
                <div className={`score-color-large ${color}`}></div>
                <div className="score-info">
                  <div className="score-label">
                    {colorMapping[color].name}
                  </div>
                  <div className="score-description">
                    {colorMapping[color].description}
                  </div>
                  <div className="score-value">
                    {scores[color]} out of 24 ({Math.round((scores[color] / 24) * 100)}%)
                  </div>
                  <div className="score-bar">
                    <div 
                      className="score-fill"
                      style={{ 
                        width: `${(scores[color] / 24) * 100}%`,
                        backgroundColor: color === 'yellow' ? '#f1c40f' : 
                                        color === 'blue' ? '#3498db' :
                                        color === 'red' ? '#e74c3c' : '#2ecc71'
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="dominant-style">
        <h3>Your Dominant Thinking Style</h3>
        <div className="dominant-info">
          {maxScore > 0 && dominantColor && (
            <div className="dominant-color">
              <div className={`dominant-indicator ${dominantColor}`}></div>
              <div>
                <strong>{colorMapping[dominantColor].name} Dominant</strong>
                <p>{colorMapping[dominantColor].description}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="team-options">
        <h3>Want to compare with your team?</h3>
        <div className="team-buttons">
          <button 
            onClick={() => navigate('/team-map')}
            className="btn-team"
          >
            Add to Team Map
          </button>
          <button 
            onClick={() => navigate('/team-results')}
            className="btn-team"
          >
            View Team Results
          </button>
        </div>
      </div>

      <div className="results-actions">
        <button onClick={resetAssessment} className="btn-primary">
          Retry
        </button>
        <button onClick={() => window.print()} className="btn-primary">
          Print Results
        </button>
      </div>      
    </div>
  )
}

export default ProfileResults
import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/TeamResults.css'

function TeamResults() {
  const navigate = useNavigate()
  const canvasRef = useRef(null)
  const [teamData, setTeamData] = useState([])
  const [hoveredMember, setHoveredMember] = useState(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('hbdiTeamData') || '[]')
    setTeamData(data)
  }, [])

  const getTopTwoScores = (scores) => {
    const scoreEntries = Object.entries(scores).map(([key, value]) => ({
      category: key,
      score: value
    }))
    
    // Sort by score descending and take top 2
    scoreEntries.sort((a, b) => b.score - a.score)
    return scoreEntries.slice(0, 2)
  }

  const drawTeamMap = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    
    // Set actual size in memory (scaled up for retina displays)
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    
    // Scale the drawing context back down
    ctx.scale(dpr, dpr)
    
    // Set canvas style size to match container
    canvas.style.width = rect.width + 'px'
    canvas.style.height = rect.height + 'px'
    
    const width = rect.width
    const height = rect.height
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(centerX, centerY) - 80
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height)
    
    // Draw background
    ctx.fillStyle = '#f8f9fa'
    ctx.fillRect(0, 0, width, height)
    
    // Draw concentric circles for scale
    ctx.strokeStyle = '#e9ecef'
    ctx.lineWidth = 1
    ctx.fillStyle = '#6c757d'
    ctx.font = '12px Arial'
    ctx.textAlign = 'center'
    
    for (let i = 1; i <= 4; i++) {
      const circleRadius = (radius / 4) * i
      ctx.beginPath()
      ctx.arc(centerX, centerY, circleRadius, 0, 2 * Math.PI)
      ctx.stroke()
      
      // Add scale numbers (3, 6, 9, 12)
      const scaleValue = i * 3
      ctx.fillText(scaleValue.toString(), centerX + circleRadius + 10, centerY - 5)
    }

    // Draw diagonal axis lines
    ctx.strokeStyle = '#dee2e6'
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
    
    // Purpose (Blue) - Top left, positioned just outside chart
    ctx.fillStyle = '#0d6efd'
    ctx.fillText('Purpose (Blue)', centerX - radius * 0.8, centerY - radius * 0.8)
    
    // Possibilities (Yellow) - Top right, positioned just outside chart  
    ctx.fillStyle = '#ffc107'
    ctx.fillText('Possibilities (Yellow)', centerX + radius * 0.8, centerY - radius * 0.8)
    
    // People (Red) - Bottom right, positioned just outside chart
    ctx.fillStyle = '#dc3545'
    ctx.fillText('People (Red)', centerX + radius * 0.8, centerY + radius * 0.9)
    
    // Process (Green) - Bottom left, positioned just outside chart
    ctx.fillStyle = '#198754'
    ctx.fillText('Process (Green)', centerX - radius * 0.8, centerY + radius * 0.9)
    
    // Draw team member dots - only highest score with names
    teamData.forEach((member) => {
      const topTwo = getTopTwoScores(member.scores)
      
      if (topTwo.length >= 1) {
        // Get the highest scoring category (first if tied)
        const highestCategory = topTwo[0].category
        
        // Calculate position for highest score only
        const position = {
          purpose: {
            x: centerX - (member.scores.purpose / 12) * radius * 0.707,
            y: centerY - (member.scores.purpose / 12) * radius * 0.707
          },
          possibilities: {
            x: centerX + (member.scores.possibilities / 12) * radius * 0.707,
            y: centerY - (member.scores.possibilities / 12) * radius * 0.707
          },
          people: {
            x: centerX + (member.scores.people / 12) * radius * 0.707,
            y: centerY + (member.scores.people / 12) * radius * 0.707
          },
          process: {
            x: centerX - (member.scores.process / 12) * radius * 0.707,
            y: centerY + (member.scores.process / 12) * radius * 0.707
          }
        }
        
        const dotPosition = position[highestCategory]
        
        // Draw the main dot
        ctx.beginPath()
        ctx.arc(dotPosition.x, dotPosition.y, 6, 0, 2 * Math.PI)
        ctx.fillStyle = hoveredMember === member.id ? '#fd7e14' : '#495057'
        ctx.fill()
        ctx.strokeStyle = 'white'
        ctx.lineWidth = 2
        ctx.stroke()
        
        // Draw person's name next to the dot
        ctx.fillStyle = '#333'
        ctx.font = '11px Arial'
        ctx.textAlign = 'left'
        ctx.fillText(member.name, dotPosition.x + 10, dotPosition.y + 4)
        
        // If this member is hovered, draw their full profile
        if (hoveredMember === member.id) {
          // Calculate all four points for full profile
          const allPoints = {
            purpose: position.purpose,
            possibilities: position.possibilities,
            people: position.people,
            process: position.process
          }
          
          // Draw the profile shape
          ctx.beginPath()
          ctx.moveTo(allPoints.purpose.x, allPoints.purpose.y)
          ctx.lineTo(allPoints.possibilities.x, allPoints.possibilities.y)
          ctx.lineTo(allPoints.people.x, allPoints.people.y)
          ctx.lineTo(allPoints.process.x, allPoints.process.y)
          ctx.closePath()
          
          // Fill with semi-transparent color
          ctx.fillStyle = 'rgba(52, 152, 219, 0.2)'
          ctx.fill()
          
          // Stroke the outline
          ctx.strokeStyle = '#3498db'
          ctx.lineWidth = 2
          ctx.stroke()
          
          // Draw all four points
          Object.entries(allPoints).forEach(([category, point]) => {
            ctx.beginPath()
            ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI)
            ctx.fillStyle = category === 'purpose' ? '#0d6efd' :
                            category === 'possibilities' ? '#ffc107' :
                            category === 'people' ? '#dc3545' : '#198754'
            ctx.fill()
            ctx.strokeStyle = 'white'
            ctx.lineWidth = 1
            ctx.stroke()
          })
        }
        
        // Store position for hover detection
        member.canvasPosition = dotPosition
      }
    })
  }, [teamData, hoveredMember])

  useEffect(() => {
    if (teamData.length > 0) {
      drawTeamMap()
    }
  }, [teamData, drawTeamMap])

  const handleCanvasMouseMove = (e) => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    setMousePos({ x: e.clientX, y: e.clientY })
    
    // Check if mouse is over any team member dot
    let foundMember = null
    teamData.forEach(member => {
      if (member.canvasPosition) {
        const distance = Math.sqrt(
          Math.pow(x - member.canvasPosition.x, 2) + 
          Math.pow(y - member.canvasPosition.y, 2)
        )
        if (distance <= 12) { // Slightly larger hit area
          foundMember = member.id
        }
      }
    })
    
    setHoveredMember(foundMember)
    canvas.style.cursor = foundMember ? 'pointer' : 'default'
  }

  const handleCanvasMouseLeave = () => {
    setHoveredMember(null)
  }

  const removeMember = (memberId) => {
    const updatedTeamData = teamData.filter(member => member.id !== memberId)
    setTeamData(updatedTeamData)
    localStorage.setItem('hbdiTeamData', JSON.stringify(updatedTeamData))
  }

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to remove all team members?')) {
      setTeamData([])
      localStorage.removeItem('hbdiTeamData')
    }
  }

  const hoveredMemberData = hoveredMember ? teamData.find(m => m.id === hoveredMember) : null

  return (
    <div className="team-results-container">
      <div className="team-results-content">
        <header className="team-results-header">
          <h1>Team HBDI Map</h1>
          <p>Visualization of team member thinking preferences</p>
        </header>

        {teamData.length === 0 ? (
          <div className="no-data">
            <p>No team members added yet.</p>
            <button 
              onClick={() => navigate('/team-map')}
              className="primary-button"
            >
              Add First Team Member
            </button>
          </div>
        ) : (
          <>
            <div className="canvas-container">
              <canvas
                ref={canvasRef}
                className="team-canvas"
                onMouseMove={handleCanvasMouseMove}
                onMouseLeave={handleCanvasMouseLeave}
              />
              
              {hoveredMemberData && (
                <div 
                  className="tooltip"
                  style={{
                    left: mousePos.x + 10,
                    top: mousePos.y - 80,
                    position: 'fixed'
                  }}
                >
                  <h4>{hoveredMemberData.name}</h4>
                  <div className="tooltip-scores">
                    <div>Purpose: {hoveredMemberData.scores.purpose}</div>
                    <div>Possibilities: {hoveredMemberData.scores.possibilities}</div>
                    <div>People: {hoveredMemberData.scores.people}</div>
                    <div>Process: {hoveredMemberData.scores.process}</div>
                  </div>
                </div>
              )}
            </div>

            <div className="team-table-section">
              <div className="table-header">
                <h3>Team Members ({teamData.length})</h3>
                <div className="table-actions">
                  <button 
                    onClick={() => navigate('/team-map')}
                    className="add-button"
                  >
                    + Add Member
                  </button>
                  <button 
                    onClick={clearAllData}
                    className="clear-button"
                  >
                    Clear All
                  </button>
                </div>
              </div>
              
              <div className="table-container">
                <table className="team-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Purpose</th>
                      <th>Possibilities</th>
                      <th>People</th>
                      <th>Process</th>
                      <th>Total</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamData.map(member => (
                      <tr key={member.id}>
                        <td className="name-cell">{member.name}</td>
                        <td className="score-cell blue">{member.scores.purpose}</td>
                        <td className="score-cell yellow">{member.scores.possibilities}</td>
                        <td className="score-cell red">{member.scores.people}</td>
                        <td className="score-cell green">{member.scores.process}</td>
                        <td className="total-cell">
                          {Object.values(member.scores).reduce((sum, score) => sum + score, 0)}
                        </td>
                        <td className="actions-cell">
                          <button 
                            onClick={() => removeMember(member.id)}
                            className="remove-button"
                            title="Remove member"
                          >
                            ×
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        <div className="navigation-actions">
          <button 
            onClick={() => navigate('/')}
            className="secondary-button"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default TeamResults
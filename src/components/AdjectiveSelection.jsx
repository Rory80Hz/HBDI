import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { adjectivePairs, adjectiveDefinitions } from '../data/hbdiData'
import './AdjectiveSelection.css'

const AdjectiveSelection = ({ selections, onSelectionsUpdate }) => {
  const [currentSelections, setCurrentSelections] = useState(selections || [])
  const [hoveredWord, setHoveredWord] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Initialize selections array if empty
    if (currentSelections.length === 0) {
      setCurrentSelections(new Array(adjectivePairs.length).fill(null))
    }
  }, [currentSelections.length])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleSelection = (pairIndex, side) => {
    const newSelections = [...currentSelections]
    newSelections[pairIndex] = side
    setCurrentSelections(newSelections)
    onSelectionsUpdate(newSelections)
  }

  const handleSubmit = () => {
    const completedSelections = currentSelections.filter(s => s !== null)
    if (completedSelections.length === adjectivePairs.length) {
      navigate('/results')
    }
  }

  const completedCount = currentSelections.filter(s => s !== null).length
  const isComplete = completedCount === adjectivePairs.length

  return (
    <div className="adjective-selection">
      <div className="selection-header">
        <h2>Choose Your Preferences</h2>
        <p>Select one adjective from each pair that best describes you. Hover over words to see their meanings.</p>
        <div className="progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(completedCount / adjectivePairs.length) * 100}%` }}
            ></div>
          </div>
          <span>{completedCount} of {adjectivePairs.length} completed</span>
        </div>
        <div className="definition-panel">
          <div className="definition-content">
            {hoveredWord ? (
              <>
                <h3>{hoveredWord}</h3>
                <p>{adjectiveDefinitions[hoveredWord]}</p>
              </>
            ) : (
              <div className="definition-placeholder">
                <h3>Hover over an adjective</h3>
                <p>Move your mouse over any adjective to see its definition and help guide your selection.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="selection-content">
        <div className="pairs-container">
          {adjectivePairs.map((pair, index) => (
            <div key={pair.id} className="adjective-pair">
              <div className="pair-number">{pair.id}</div>
              
              <div className="pair-options">
                <button
                  className={`adjective-option left ${currentSelections[index] === 'left' ? 'selected' : ''}`}
                  onClick={() => handleSelection(index, 'left')}
                  onMouseEnter={() => setHoveredWord(pair.left.word)}
                  onMouseLeave={() => setHoveredWord(null)}
                >
                  {pair.left.word}
                </button>
                
                <div className="vs">vs</div>
                
                <button
                  className={`adjective-option right ${currentSelections[index] === 'right' ? 'selected' : ''}`}
                  onClick={() => handleSelection(index, 'right')}
                  onMouseEnter={() => setHoveredWord(pair.right.word)}
                  onMouseLeave={() => setHoveredWord(null)}
                >
                  {pair.right.word}
                </button>
              </div>
            </div>
          ))}
        </div>

        
      </div>

      <div className="selection-footer">
        <button 
          className={`btn-complete ${isComplete ? 'enabled' : 'disabled'}`}
          onClick={handleSubmit}
          disabled={!isComplete}
        >
          {isComplete ? 'View My Profile' : `Complete ${adjectivePairs.length - completedCount} more`}
        </button>
      </div>
    </div>
  )
}

export default AdjectiveSelection
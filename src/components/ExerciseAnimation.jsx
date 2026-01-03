import { useState } from 'react'
import StickFigure from './StickFigure'
import { getExerciseAnimation } from '../data/exerciseAnimations'
import './ExerciseAnimation.css'

function ExerciseAnimation({ exerciseId, exerciseName }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const animationConfig = getExerciseAnimation(exerciseId)

  if (!animationConfig) {
    return null
  }

  return (
    <div className="exercise-animation-container">
      <button
        className="animation-toggle-button"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-label={isExpanded ? 'Hide exercise demo' : 'Show exercise demo'}
      >
        <span className="animation-icon">💪</span>
        <span className="animation-text">
          {isExpanded ? 'Hide' : 'Show'} Exercise Demo
        </span>
        <span className={`animation-arrow ${isExpanded ? 'expanded' : ''}`}>▼</span>
      </button>

      {isExpanded && (
        <div className="animation-content">
          <div className="animation-svg-container">
            <svg 
              viewBox="0 0 100 100" 
              className="exercise-svg"
              preserveAspectRatio="xMidYMid meet"
            >
              <StickFigure
                headX={animationConfig.headX || 50}
                headY={animationConfig.headY || 20}
                bodyParts={animationConfig.bodyParts || {}}
                exerciseType={animationConfig.exerciseType}
                className={animationConfig.className}
              />
            </svg>
          </div>
          {animationConfig.description && (
            <p className="animation-description">{animationConfig.description}</p>
          )}
        </div>
      )}
    </div>
  )
}

export default ExerciseAnimation


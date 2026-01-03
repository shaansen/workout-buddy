import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { workoutSchedule, weekDays } from '../data/workouts'
import { getDayProgress, saveDayProgress, getDateKey, isDayComplete, markDayComplete, getDayOfWeek } from '../utils/storage'
import './Workout.css'

function Workout() {
  const { day } = useParams()
  const workout = workoutSchedule[day]
  const [completedSets, setCompletedSets] = useState({})
  const dateKey = getDateKey()

  useEffect(() => {
    if (!workout) return

    const initialCompleted = {}
    workout.exercises.forEach((exercise) => {
      initialCompleted[exercise.id] = getDayProgress(dateKey, exercise.id)
    })
    setCompletedSets(initialCompleted)
  }, [day, dateKey, workout])

  if (!workout) {
    return (
      <div className="workout-container">
        <div className="error-message">
          <h2>Workout not found</h2>
          <Link to="/" className="back-button">Back to Schedule</Link>
        </div>
      </div>
    )
  }

  const dayLabel = weekDays.find((d) => d.key === day)?.label || day

  const toggleSet = (exerciseId, setNumber) => {
    const current = completedSets[exerciseId] || []
    const newCompleted = current.includes(setNumber)
      ? current.filter((s) => s !== setNumber)
      : [...current, setNumber].sort((a, b) => a - b)

    setCompletedSets((prev) => ({
      ...prev,
      [exerciseId]: newCompleted,
    }))

    saveDayProgress(dateKey, exerciseId, newCompleted)
    
    // Check if all sets are complete and mark day as complete
    setTimeout(() => {
      const dayKey = getDayOfWeek(new Date(dateKey))
      if (isDayComplete(dateKey, dayKey)) {
        markDayComplete(dateKey, dayKey)
      }
    }, 100)
  }

  const getTotalProgress = () => {
    let totalSets = 0
    let completed = 0
    workout.exercises.forEach((exercise) => {
      totalSets += exercise.sets
      completed += (completedSets[exercise.id] || []).length
    })
    return { completed, total: totalSets }
  }

  const progress = getTotalProgress()
  const completionPercentage = progress.total > 0 
    ? Math.round((progress.completed / progress.total) * 100) 
    : 0

  return (
    <div className="workout-container">
      <div className="workout-header">
        <Link to="/" className="back-link">← Back</Link>
        <h1 className="workout-title">{dayLabel}: {workout.name}</h1>
        <div className="workout-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <span className="progress-text">
            {progress.completed}/{progress.total} sets completed
          </span>
        </div>
      </div>

      <div className="exercises-list">
        {workout.exercises.map((exercise, exerciseIndex) => {
          const exerciseCompleted = completedSets[exercise.id] || []
          const isComplete = exerciseCompleted.length === exercise.sets
          const isYogaDay = exercise.id.includes('yoga') && workout.exercises.length === 1

          return (
            <div 
              key={exercise.id} 
              className={`exercise-card ${isComplete ? 'complete' : ''}`}
            >
              <div className="exercise-header">
                <h2 className="exercise-name">
                  {exerciseIndex + 1}. {exercise.name}
                </h2>
                {!isYogaDay && <span className="exercise-reps">{exercise.reps} reps</span>}
              </div>

              {isYogaDay ? (
                <div className="yoga-completion">
                  <button
                    onClick={() => {
                      const newCompleted = exerciseCompleted.length > 0 ? [] : [1]
                      setCompletedSets((prev) => ({
                        ...prev,
                        [exercise.id]: newCompleted,
                      }))
                      saveDayProgress(dateKey, exercise.id, newCompleted)
                      setTimeout(() => {
                        const dayKey = getDayOfWeek(new Date(dateKey))
                        if (newCompleted.length > 0) {
                          markDayComplete(dateKey, dayKey)
                        }
                      }, 100)
                    }}
                    className={`yoga-button ${exerciseCompleted.length > 0 ? 'completed' : ''}`}
                  >
                    {exerciseCompleted.length > 0 ? '✓ Completed' : 'Mark as Complete'}
                  </button>
                </div>
              ) : (
                <div className="sets-container">
                  <p className="sets-label">
                    {exercise.sets} sets • Rest {exercise.rest}s between sets
                  </p>
                  <div className="sets-grid">
                    {Array.from({ length: exercise.sets }, (_, i) => {
                      const setNumber = i + 1
                      const isCompleted = exerciseCompleted.includes(setNumber)

                      return (
                        <button
                          key={setNumber}
                          onClick={() => toggleSet(exercise.id, setNumber)}
                          className={`set-button ${isCompleted ? 'completed' : ''}`}
                          aria-label={`Set ${setNumber} ${isCompleted ? 'completed' : 'not completed'}`}
                        >
                          <span className="set-number">{setNumber}</span>
                          {isCompleted && (
                            <span className="checkmark">✓</span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Workout


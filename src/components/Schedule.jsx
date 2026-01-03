import { Link } from 'react-router-dom'
import { workoutSchedule, weekDays } from '../data/workouts'
import { getDayOfWeek, getDateKey, getProgress, isDayComplete } from '../utils/storage'
import './Schedule.css'

function Schedule() {
  const today = new Date()
  const todayDayOfWeek = getDayOfWeek(today)
  const progress = getProgress()

  const getCompletionStatus = (dayKey) => {
    const workout = workoutSchedule[dayKey]
    if (!workout) return { completed: 0, total: 0 }
    
    const dateKey = getDateKey(today)
    let totalSets = 0
    let completedSets = 0

    workout.exercises.forEach((exercise) => {
      const completed = progress[dateKey]?.[exercise.id] || []
      totalSets += exercise.sets
      completedSets += completed.length
    })

    return { completed: completedSets, total: totalSets }
  }

  return (
    <div className="schedule-container">
      <div className="schedule-header">
        <h1 className="schedule-title">Weekly Schedule</h1>
        <Link to="/stats" className="stats-link">
          📊 Stats
        </Link>
      </div>
      <div className="schedule-grid">
        {weekDays.map(({ key, label }) => {
          const workout = workoutSchedule[key]
          const status = getCompletionStatus(key)
          const isToday = key === todayDayOfWeek
          const dateKey = getDateKey(today)
          const dayComplete = isDayComplete(dateKey, key)
          const completionPercentage = status.total > 0 
            ? Math.round((status.completed / status.total) * 100) 
            : 0

          return (
            <Link
              key={key}
              to={`/workout/${key}`}
              className={`schedule-card ${isToday ? 'today' : ''} ${dayComplete ? 'day-complete' : ''}`}
            >
              <div className="schedule-card-header">
                <h2>{label}</h2>
                <div className="badges">
                  {isToday && <span className="today-badge">Today</span>}
                  {dayComplete && <span className="complete-badge">✓ Complete</span>}
                </div>
              </div>
              <div className="schedule-card-body">
                <p className="workout-name">{workout.name}</p>
                {status.total > 0 ? (
                  <div className="progress-info">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${completionPercentage}%` }}
                      />
                    </div>
                    <span className="progress-text">
                      {status.completed}/{status.total} sets
                    </span>
                  </div>
                ) : (
                  <p className="rest-day">Rest/Yoga Day</p>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Schedule


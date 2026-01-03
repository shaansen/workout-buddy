import { Link } from 'react-router-dom'
import { useState } from 'react'
import { getWeeklyStats, getAllWeeksData, getDateKey } from '../utils/storage'
import { weekDays, workoutSchedule } from '../data/workouts'
import './WeeklyStats.css'

function WeeklyStats() {
  const [selectedWeek, setSelectedWeek] = useState(0)
  const allWeeks = getAllWeeksData()
  const currentWeek = getWeeklyStats()
  
  // Combine current week with historical weeks
  const weeks = [currentWeek, ...allWeeks.filter(w => {
    // Don't duplicate current week
    const currentWeekStart = getDateKey(new Date())
    const weekStart = getDateKey(w.weekData[0].date)
    return weekStart !== currentWeekStart
  })]

  const displayWeek = weeks[selectedWeek] || currentWeek
  const today = new Date()
  const todayDateKey = getDateKey(today)

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const getWeekRange = (weekData) => {
    if (weekData.weekData.length === 0) return ''
    const start = weekData.weekData[0].date
    const end = weekData.weekData[weekData.weekData.length - 1].date
    return `${formatDate(start)} - ${formatDate(end)}`
  }

  return (
    <div className="stats-container">
      <div className="stats-header">
        <Link to="/" className="back-link">← Back</Link>
        <h1 className="stats-title">Weekly Consistency</h1>
      </div>

      {weeks.length > 1 && (
        <div className="week-selector">
          {weeks.map((week, index) => {
            const isCurrentWeek = index === 0
            return (
              <button
                key={index}
                onClick={() => setSelectedWeek(index)}
                className={`week-button ${selectedWeek === index ? 'active' : ''}`}
              >
                {isCurrentWeek ? 'This Week' : `Week ${weeks.length - index}`}
              </button>
            )
          })}
        </div>
      )}

      <div className="stats-summary">
        <div className="stat-card">
          <div className="stat-value">{displayWeek.completedDays}</div>
          <div className="stat-label">Days Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{displayWeek.totalDays}</div>
          <div className="stat-label">Total Workout Days</div>
        </div>
        <div className="stat-card highlight">
          <div className="stat-value">{displayWeek.consistency}%</div>
          <div className="stat-label">Consistency</div>
        </div>
      </div>

      <div className="week-calendar">
        <h2 className="calendar-title">Week Overview</h2>
        <p className="week-range">{getWeekRange(displayWeek)}</p>
        <div className="calendar-grid">
          {displayWeek.weekData.map((day, index) => {
            const isToday = day.dateKey === todayDateKey
            const workout = workoutSchedule[day.dayKey]
            const isWorkoutDay = workout && workout.exercises.length > 0 && 
              !workout.exercises[0].id.includes('yoga')
            
            return (
              <div
                key={index}
                className={`calendar-day ${day.isComplete ? 'complete' : ''} ${isToday ? 'today' : ''} ${!isWorkoutDay ? 'rest-day' : ''}`}
              >
                <div className="day-label">{day.label}</div>
                <div className="day-date">{formatDate(day.date)}</div>
                <div className="day-status">
                  {day.isComplete ? (
                    <span className="status-icon complete">✓</span>
                  ) : isWorkoutDay ? (
                    <span className="status-icon incomplete">○</span>
                  ) : (
                    <span className="status-icon rest">—</span>
                  )}
                </div>
                <div className="day-name">
                  {workout ? workout.name : 'Rest'}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {weeks.length > 1 && (
        <div className="historical-stats">
          <h2 className="historical-title">Historical Performance</h2>
          <div className="historical-list">
            {weeks.map((week, index) => {
              const isCurrentWeek = index === 0
              return (
                <div key={index} className="historical-item">
                  <div className="historical-week">
                    {isCurrentWeek ? 'This Week' : `Week ${weeks.length - index}`}
                    <span className="historical-range">{getWeekRange(week)}</span>
                  </div>
                  <div className="historical-progress">
                    <div className="historical-bar">
                      <div
                        className="historical-fill"
                        style={{ width: `${week.consistency}%` }}
                      />
                    </div>
                    <span className="historical-percentage">{week.consistency}%</span>
                  </div>
                  <div className="historical-details">
                    {week.completedDays} of {week.totalDays} days
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default WeeklyStats


import { workoutSchedule } from '../data/workouts'

const STORAGE_KEY = 'workout-tracker-progress'

export const getProgress = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch (error) {
    console.error('Error reading progress:', error)
    return {}
  }
}

export const saveProgress = (progress) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch (error) {
    console.error('Error saving progress:', error)
  }
}

export const getDayProgress = (dateKey, exerciseId) => {
  const progress = getProgress()
  return progress[dateKey]?.[exerciseId] || []
}

export const saveDayProgress = (dateKey, exerciseId, completedSets) => {
  const progress = getProgress()
  if (!progress[dateKey]) {
    progress[dateKey] = {}
  }
  progress[dateKey][exerciseId] = completedSets
  saveProgress(progress)
}

export const getDateKey = (date = new Date()) => {
  return date.toISOString().split('T')[0]
}

export const getDayOfWeek = (date = new Date()) => {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  return days[date.getDay()]
}

export const isDayComplete = (dateKey, dayKey) => {
  const workout = workoutSchedule[dayKey]
  if (!workout) return false
  
  const progress = getProgress()
  const dayProgress = progress[dateKey] || {}
  
  // For yoga/rest days, consider complete if marked
  if (workout.exercises.length === 1 && workout.exercises[0].id.includes('yoga')) {
    return dayProgress[workout.exercises[0].id]?.length > 0 || dayProgress._complete === true
  }
  
  // For workout days, check if all sets are completed
  let totalSets = 0
  let completedSets = 0
  
  workout.exercises.forEach((exercise) => {
    const completed = dayProgress[exercise.id] || []
    totalSets += exercise.sets
    completedSets += completed.length
  })
  
  return totalSets > 0 && completedSets === totalSets
}

export const markDayComplete = (dateKey, dayKey) => {
  const progress = getProgress()
  if (!progress[dateKey]) {
    progress[dateKey] = {}
  }
  progress[dateKey]._complete = true
  progress[dateKey]._dayKey = dayKey
  saveProgress(progress)
}

export const getWeekData = (startDate = new Date()) => {
  // Get Monday of the current week
  const monday = new Date(startDate)
  const day = monday.getDay()
  const diff = monday.getDate() - day + (day === 0 ? -6 : 1) // Adjust when day is Sunday
  monday.setDate(diff)
  monday.setHours(0, 0, 0, 0)
  
  const weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  const weekData = []
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(monday)
    date.setDate(monday.getDate() + i)
    const dateKey = getDateKey(date)
    const dayKey = getDayOfWeek(date)
    const isComplete = isDayComplete(dateKey, dayKey)
    
    weekData.push({
      date,
      dateKey,
      dayKey,
      label: weekDays[i].charAt(0).toUpperCase() + weekDays[i].slice(1),
      isComplete,
    })
  }
  
  return weekData
}

export const getWeeklyStats = (startDate = new Date()) => {
  const weekData = getWeekData(startDate)
  const completedDays = weekData.filter(day => day.isComplete).length
  // Count all days with scheduled activities (workouts or yoga), excluding pure rest days
  const totalDays = weekData.filter(day => {
    const workout = workoutSchedule[day.dayKey]
    if (!workout) return false
    // Count days with exercises (workouts and yoga)
    // Sunday is yoga/rest, so we count it if it has the yoga exercise
    return workout.exercises.length > 0
  }).length
  
  return {
    weekData,
    completedDays,
    totalDays,
    consistency: totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0,
  }
}

export const getAllWeeksData = () => {
  const progress = getProgress()
  const allDates = Object.keys(progress).sort()
  
  if (allDates.length === 0) return []
  
  // Group dates by week
  const weeks = {}
  allDates.forEach(dateKey => {
    const date = new Date(dateKey)
    const weekStart = getWeekStart(date)
    const weekKey = getDateKey(weekStart)
    
    if (!weeks[weekKey]) {
      weeks[weekKey] = []
    }
    weeks[weekKey].push(dateKey)
  })
  
  return Object.keys(weeks).sort().reverse().map(weekKey => {
    const weekStart = new Date(weekKey)
    return getWeeklyStats(weekStart)
  })
}

const getWeekStart = (date) => {
  const monday = new Date(date)
  const day = monday.getDay()
  const diff = monday.getDate() - day + (day === 0 ? -6 : 1)
  monday.setDate(diff)
  monday.setHours(0, 0, 0, 0)
  return monday
}


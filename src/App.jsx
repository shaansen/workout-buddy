import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Schedule from './components/Schedule'
import Workout from './components/Workout'
import WeeklyStats from './components/WeeklyStats'
import './App.css'

function App() {
  return (
    <BrowserRouter basename="/workout-buddy">
      <Routes>
        <Route path="/" element={<Schedule />} />
        <Route path="/workout/:day" element={<Workout />} />
        <Route path="/stats" element={<WeeklyStats />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

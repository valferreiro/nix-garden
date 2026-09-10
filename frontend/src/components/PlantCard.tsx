import { useState } from 'react'

type Habit = {
  id: number
  name: string
  completions: string[]
}

type Plant = {
  emoji: string
  stage: string
}

type PlantCardProps = {
  habit: Habit
  plant: Plant
  streak: number
  onToggle: (habitId: number) => void
  onDelete: (habitId: number) => void
}

function PlantCard({
  habit,
  plant,
  streak,
  onToggle,
  onDelete,
}: PlantCardProps) {
  const [isGrowing, setIsGrowing] = useState(false)

  const today = new Date()

  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')

  const todayString = `${year}-${month}-${day}`

  const completedToday = habit.completions.includes(todayString)

  const handleToggle = () => {
    onToggle(habit.id)

    if (!completedToday) {
      setIsGrowing(true)

      setTimeout(() => {
        setIsGrowing(false)
      }, 600)
    }
  }

  return (
    <div
      className={`plant-card ${
        completedToday ? 'completed' : ''
      } ${isGrowing ? 'growing' : ''}`}
    >
      <button
        type="button"
        className="plant-action"
        onClick={handleToggle}
        aria-label={`Completar hábito ${habit.name}`}
      >
        <span className={`plant ${plant.stage}`}>
          {plant.emoji}
        </span>
      </button>

      <span className="plant-name">
        {habit.name}
      </span>

      <span className="plant-streak">
        {streak === 0
          ? 'Nueva semilla'
          : `${streak} ${
              streak === 1 ? 'día' : 'días'
            }`}
      </span>

      <button
        type="button"
        className="delete-button"
        onClick={() => onDelete(habit.id)}
      >
        Eliminar
      </button>
    </div>
  )
}

export default PlantCard
import { useState } from 'react'
 
type Habit = {
    id: number
    name: string
    completed: boolean
    streak: number
}

type Plant = {
    emoji: string
    stage: string
}

type PlantCardProps = {
    habit: Habit
    plant: Plant
    onToggle: (habitId: number) => void
    onDelete: (habitId: number) => void
}

function PlantCard({
    habit,
    plant,
    onToggle,
    onDelete,
}: PlantCardProps) {

    const [isGrowing, setIsGrowing] = useState(false)
    const handleToggle = () => {
        onToggle(habit.id)

        if (!habit.completed) {
            setIsGrowing(true)

            setTimeout(() => {
                setIsGrowing(false)
            }, 600)
        }
    }

    return (
        <div
            className={`plant-card ${
                habit.completed ? 'completed' : ''
            } ${isGrowing ? 'growing' : ''}`}
            >
            <button
            type="button"
            className="plant-action"
            onClick={handleToggle}
            >
            <span className={`plant ${plant.stage}`}>
                {plant.emoji}
            </span>
            </button>

            <span className="plant-name">{habit.name}</span>

            <span className="plant-streak">
            {habit.streak === 0
                ? 'Nueva semilla'
                : `${habit.streak} ${
                    habit.streak === 1 ? 'día' : 'días'
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
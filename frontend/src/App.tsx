import { useEffect, useState } from 'react'
import './App.css'

type Habit = {
  id: number
  name: string
  completed: boolean
  streak: number
}

function App() {
  const [habits, setHabits] = useState<Habit[]>(() => {
  const savedHabits = localStorage.getItem("nix-garden-items")

  if (!savedHabits) {
    return []
  }

  return JSON.parse(savedHabits)
})

  const [habitName, setHabitName] = useState('')

  useEffect(() => {
    localStorage.setItem(
      "nix-garden-items",
      JSON.stringify(habits)
    )
  }, [habits])

  const toggleHabit = (habitId: number) => {
  setHabits((currentHabits) =>
    currentHabits.map((habit) =>
      habit.id === habitId
        ? {
            ...habit,
            completed: !habit.completed,
            streak: habit.completed
              ? Math.max(0, habit.streak - 1)
              : habit.streak + 1,
          }
        : habit,
    ),
  )
}

const deleteHabit = (habitId: number) => {
  setHabits((currentHabits) =>
  currentHabits.filter((habit) => habit.id !== habitId))
}

const completeHabits = habits.filter(
  (habit) => habit.completed
).length

const progress = 
  habits.length === 0
  ? 0
  : (completeHabits / habits.length) * 100

const getGardenMessage = () => {
  if (habits.length === 0) {
    return "¡Planta tu primera semilla! 🌱"
  }
  
  if (completeHabits === habits.length) {
    return "¡Tu jardín está floreciendo! 🌷✨"
  }

  if (completeHabits > 0) {
    return "¡Sigue cultivando! 🪴"
  }

  return "Las plantas esperan un poco de tu cariño 🧚🏻‍♀️"
}

const getPlant = (streak: number) => {
  if (streak >= 7) {
    return {
      emoji: "✨",
      stage: "flower",
    }
  }

  if (streak >= 3) {
    return {
      emoji: "🌷",
      stage: "bloom",
    }
  }

  if (streak >= 1) {
    return {
      emoji: "🌿",
      stage: "sprout",
    }
  }

  return {
    emoji: "🌱",
    stage: "seed",
  }
}

  return (
    <main className="garden">
      <header className="garden-header">
        <p className="garden-kicker">A little garden for your habits</p>

        <h1>Nix Garden</h1>

        <p className="garden-description">
          
        </p>
      </header>

      <div className='"garden-progress'> 
        <p>Tu jardín el día hoy :)</p>

        <strong>
          {completeHabits} / {habits.length} hábitos
        </strong>

        <p className="garden-message">
          {getGardenMessage()}
        </p>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <section className="garden-space" aria-label="Tu jardín">
        {habits.length === 0 ? (
          <p className="empty-garden">
            ¡Tu jardín está esperando su primera semilla! 🌱
          </p>
        ) : (
          <div className="plants">
            {habits.map((habit) => {
              const plant = getPlant(habit.streak)

              return (
                  <div className={`plant-card ${habit.completed ? 'completed' : ''}`}>

                    <button 
                      type="button"
                      className="plant-action"
                      onClick={() => toggleHabit(habit.id)}
                      > 

                      <span className={`plant ${plant.stage}`}>
                        {plant.emoji}
                      </span>
                  </button>
                  
                  <span className="plant-name">{habit.name}</span>
                  <span className="plant-streak">
                    {habit.streak === 0
                      ? 'Nueva semilla'
                      : `${habit.streak} ${habit.streak === 1 ? 'día' : 'días'}`}
                  </span>

                  <button 
                      type="button"
                      className="delete-button"
                      onClick={() => deleteHabit(habit.id)}
                      > Eliminar 
                  </button>

                </div>
              )
            })}
          </div>
        )}
      </section>

      <form
        className='habit-form'
        onSubmit = {(event) => {
          event.preventDefault()

          if (!habitName.trim()) {
            return
          }

          setHabits((currentHabits) => [
            ...currentHabits,
            {
              id: Date.now(),
              name: habitName.trim(),
              completed: false,
              streak: 0
            },
          ])

          setHabitName('')
        }}
        >
          <input
            type="text"
            value={habitName}
            onChange={(event) => setHabitName(event.target.value)}
            placeholder="¿Qué hábito quieres cultivar hoy?"
            aria-label="Nombre del hábito"
          />

          <button type="submit" className="plant-button">
            Plantar 🌱
          </button>
      </form>
    </main>
  )
}

export default App
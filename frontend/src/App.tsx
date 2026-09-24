import { useEffect, useState } from 'react'
import './App.css'
import PlantCard from './components/PlantCard'
import Nix from './components/Nix'
import Dashboard from './components/dashboard'
import GardenStatus from './components/GardenStatus'
import { calculateStreak, getToday } from './utils/streak'
import { getGardenStage } from './utils/garden'
import { getNixStage }  from './utils/nix'
import { getDashboardStats } from './utils/dashboard'

type Habit = {
  id: number
  name: string
  completions: string[]
}

const getPlant = (streak: number) => {
  if (streak >= 7) {
    return {
      emoji: '✨',
      stage: 'flower',
    }
  }

  if (streak >= 3) {
    return {
      emoji: '🌷',
      stage: 'bloom',
    }
  }

  if (streak >= 1) {
    return {
      emoji: '🌿',
      stage: 'sprout',
    }
  }

  return {
    emoji: '🌱',
    stage: 'seed',
  }
}

function App() {
  const [habits, setHabits] = useState<Habit[]>(() => {
    const savedHabits = localStorage.getItem('nix-garden-items')

    if (!savedHabits) {
      return []
    } 
    
    const parsedHabits = JSON.parse(savedHabits)

    return parsedHabits.map((habit: Habit & {
      completed?: boolean
      streak?: number
    }) => ({
      id: habit.id,
      name: habit.name,
      completions: habit.completions ?? [],
    }))
  })  

  const [habitName, setHabitName] = useState('')

  useEffect(() => {
    localStorage.setItem(
      'nix-garden-items',
      JSON.stringify(habits),
    )
  }, [habits])

  const today = getToday()

  const toggleHabit = (habitId: number) => {
    setHabits((currentHabits) =>
      currentHabits.map((habit) => {
        if (habit.id !== habitId) {
          return habit
        }

        const completedToday = habit.completions.includes(today)

        return {
          ...habit,
          completions: completedToday
            ? habit.completions.filter((date) => date !== today)
            : [...habit.completions, today],
        }
      }),
    )
  }

  const deleteHabit = (habitId: number) => {
    setHabits((currentHabits) =>
      currentHabits.filter((habit) => habit.id !== habitId),
    )
  }

  const stats = getDashboardStats(habits)

  const completeHabits = stats.completedToday
  const progress = stats.progress

  const garden = getGardenStage(progress)
  const nix = getNixStage(progress)

  const getGardenMessage = () => {
    if (habits.length === 0) {
      return '¡Planta tu primera semilla! 🌱'
    }

    if (completeHabits === habits.length) {
      return '¡Tu jardín está floreciendo! 🌷✨'
    }

    if (completeHabits > 0) {
      return '¡Sigue cultivando! 🪴'
    }

    return 'Las plantas esperan un poco de tu cariño 🧚🏻‍♀️'
  }

  return (
    <main className="garden">
      <header className="garden-header">
        <p className="garden-kicker">
          A little garden for your habits
        </p>

        <h1>Nix Garden</h1>

        <p className="garden-description">
          Cultiva pequeños hábitos y observa cómo crece tu jardín.
        </p>
      </header>

      <div className="garden-progress">
        <p>Tu jardín el día de hoy :)</p>

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

      <GardenStatus garden={garden}/>

      <Dashboard stats={stats} />

      <Nix nix={nix} />

      <section
        className="garden-space"
        aria-label="Tu jardín"
      >
        {habits.length === 0 ? (
          <p className="empty-garden">
            ¡Tu jardín está esperando su primera semilla! 🌱
          </p>
        ) : (
          <div className="plants">
            {habits.map((habit) => {
              const streak = calculateStreak(habit.completions)
              const plant = getPlant(streak)

              return (
                <PlantCard
                  key={habit.id}
                  habit={habit}
                  plant={plant}
                  streak={streak}
                  onToggle={toggleHabit}
                  onDelete={deleteHabit}
                />
              )
            })}
          </div>
        )}
      </section>

      <form
        className="habit-form"
        onSubmit={(event) => {
          event.preventDefault()

          if (!habitName.trim()) {
            return
          }

          setHabits((currentHabits) => [
            ...currentHabits,
            {
              id: Date.now(),
              name: habitName.trim(),
              completions: [],
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

        <button
          type="submit"
          className="plant-button"
        >
          Plantar 🌱
        </button>
      </form>
    </main>
  )
}

export default App
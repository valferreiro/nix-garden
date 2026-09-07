import { useState } from 'react'
import './App.css'

function App() {
  const [habitCount, setHabitCount] = useState(0)

  return (
    <main className="garden">
      <header className="garden-header">
        <p className="garden-kicker">A little garden for your habits</p>

        <h1>Nix Garden</h1>

        <p className="garden-description">
          Cultiva pequeños hábitos y observa cómo crece tu jardín.
        </p>
      </header>

      <section className="garden-space" aria-label="Tu jardín">
        {habitCount === 0 ? (
          <p className="empty-garden">
            ¡Tu jardín está esperando su primera semilla! 🌱
          </p>
        ) : (
          <div className="plants">
            {Array.from({ length: habitCount }, (_, index) => (
              <span key={index} className="plant">
                🌱
              </span>
            ))}
          </div>
        )}
      </section>

      <button
        type="button"
        className="plant-button"
        onClick={() => setHabitCount((count) => count + 1)}
      >
        Plantar un hábito
      </button>
    </main>
  )
}

export default App
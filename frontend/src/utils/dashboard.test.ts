import { describe, expect, it } from 'vitest'
import { getDashboardStats } from './dashboard'
import { getToday } from './streak'

describe('getDashboardStats', () => {
  it('returns zero stats when there are no habits', () => {
    expect(getDashboardStats([])).toEqual({
      totalHabits: 0,
      completedToday: 0,
      progress: 0,
      bestStreak: 0,
    })
  })

  it('calculates the daily progress', () => {
    const habits = [
      {
        id: 1,
        name: 'Leer',
        completions: [getToday()],
      },
      {
        id: 2,
        name: 'Ejercicio',
        completions: [getToday()],
      },
      {
        id: 3,
        name: 'Meditar',
        completions: [],
      },
      {
        id: 4,
        name: 'Beber agua',
        completions: [],
      },
    ]

    expect(getDashboardStats(habits)).toMatchObject({
      totalHabits: 4,
      completedToday: 2,
      progress: 50,
    })
  })

  it('returns the highest current streak', () => {
    const today = new Date()

    const yesterday = new Date(today)
    yesterday.setDate(today.getDate() - 1)

    const twoDaysAgo = new Date(today)
    twoDaysAgo.setDate(today.getDate() - 2)

    const threeDaysAgo = new Date(today)
    threeDaysAgo.setDate(today.getDate() - 3)

    const formatDate = (date: Date) => {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')

      return `${year}-${month}-${day}`
    }

    const habits = [
      {
        id: 1,
        name: 'Leer',
        completions: [
          formatDate(threeDaysAgo),
          formatDate(twoDaysAgo),
          formatDate(yesterday),
          formatDate(today),
        ],
      },
      {
        id: 2,
        name: 'Ejercicio',
        completions: [
          formatDate(yesterday),
          formatDate(today),
        ],
      },
      {
        id: 3,
        name: 'Meditar',
        completions: [
          formatDate(today),
        ],
      },
    ]

    expect(getDashboardStats(habits).bestStreak).toBe(4)
  })
})
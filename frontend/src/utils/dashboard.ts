import { calculateStreak, getToday } from './streak'

type Habit = {
  id: number
  name: string
  completions: string[]
}

export type DashboardStats = {
  totalHabits: number
  completedToday: number
  progress: number
  bestStreak: number
}

export const getDashboardStats = (
  habits: Habit[],
): DashboardStats => {
  const today = getToday()

  const totalHabits = habits.length

  const completedToday = habits.filter(
    (habit) => habit.completions.includes(today),
  ).length

  const progress =
    totalHabits === 0
      ? 0
      : (completedToday / totalHabits) * 100

  const bestStreak =
    habits.length === 0
      ? 0
      : Math.max(
          ...habits.map((habit) =>
            calculateStreak(habit.completions),
          ),
        )

  return {
    totalHabits,
    completedToday,
    progress,
    bestStreak,
  }
}
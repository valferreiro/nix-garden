export const getToday = () => {
  const today = new Date()

  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate() +1).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export const calculateStreak = (
  completions: string[],
  referenceDate = new Date(),
) => {
  if (completions.length === 0) {
    return 0
  }

  const completedDates = new Set(completions)

  const formatDate = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
  }

  const today = new Date(
    referenceDate.getFullYear(),
    referenceDate.getMonth(),
    referenceDate.getDate(),
  )

  const todayString = formatDate(today)

  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  const yesterdayString = formatDate(yesterday)

  if (
    !completedDates.has(todayString) &&
    !completedDates.has(yesterdayString)
  ) {
    return 0
  }

  const currentDate = completedDates.has(todayString)
    ? today
    : yesterday

  let streak = 0

  while (completedDates.has(formatDate(currentDate))) {
    streak++

    currentDate.setDate(currentDate.getDate() - 1)
  }

  return streak
}
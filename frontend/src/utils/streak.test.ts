import { describe, expect, it } from 'vitest'
import { calculateStreak } from './streak'

describe('calculateStreak', () => {
  const referenceDate = new Date(2026, 8, 10)

  it('returns 0 when there are no completions', () => {
    expect(calculateStreak([], referenceDate)).toBe(0)
  })

  it('returns 1 when the habit was completed today', () => {
    expect(
      calculateStreak(['2026-09-10'], referenceDate),
    ).toBe(1)
  })

  it('returns 1 when the habit was completed yesterday', () => {
    expect(
      calculateStreak(['2026-09-09'], referenceDate),
    ).toBe(1)
  })

  it('returns 2 for today and yesterday', () => {
    expect(
      calculateStreak(
        ['2026-09-10', '2026-09-09'],
        referenceDate,
      ),
    ).toBe(2)
  })

  it('returns 3 for three consecutive days', () => {
    expect(
      calculateStreak(
        ['2026-09-10', '2026-09-09', '2026-09-08'],
        referenceDate,
      ),
    ).toBe(3)
  })

  it('breaks the streak when a day is missing', () => {
    expect(
      calculateStreak(
        ['2026-09-10', '2026-09-08'],
        referenceDate,
      ),
    ).toBe(1)
  })

  it('returns 0 when the last completion was more than one day ago', () => {
    expect(
      calculateStreak(['2026-09-08'], referenceDate),
    ).toBe(0)
  })

  it('does not count duplicate completion dates twice', () => {
    expect(
      calculateStreak(
        [
          '2026-09-10',
          '2026-09-10',
          '2026-09-09',
        ],
        referenceDate,
      ),
    ).toBe(2)
  })
})
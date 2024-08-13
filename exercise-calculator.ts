interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: 1 | 2 | 3
  ratingDescription: string
  target: number
  average: number
}

const ratingDescriptionsValues = {
  3: 'very good',
  2: 'not too bad but could be better',
  1: 'could be much better',
}

function calculateExercises(dailyHours: number[], target: number): Result {
  const periodLength = dailyHours.length
  const exerciseHours = dailyHours.filter((h) => h > 0)
  const trainingDays = exerciseHours.length
  const average =
    exerciseHours.reduce((total, h) => total + h) / dailyHours.length
  const success = average >= target
  const rating = success ? 3 : average > target * 0.8 ? 2 : 1
  const ratingDescription = ratingDescriptionsValues[rating]

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))

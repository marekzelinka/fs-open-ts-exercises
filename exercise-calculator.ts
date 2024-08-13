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

try {
  const { target, dailyHours } = parseArguments(process.argv)
  console.log(calculateExercises(dailyHours, target))
} catch (error: unknown) {
  let errorMessage = 'Something bad happend.'
  if (error instanceof Error) {
    errorMessage += ` Error: ${error.message}`
  }
  console.error(errorMessage)
}

interface Args {
  target: number
  dailyHours: number[]
}

function parseArguments(args: string[]): Args {
  if (args.length < 4) throw new Error('Not enough arguments')

  const [value1, ...value2] = args.slice(2)
  const target = Number(value1)
  if (isNaN(target)) throw new Error('Provided value `target` is not a number')
  const dailyHours = value2.map((arg) => {
    const h = Number(arg)
    if (isNaN(h)) throw new Error('Provided value `value2` is not a number')
    return h
  })

  return {
    target,
    dailyHours,
  }
}

export {}

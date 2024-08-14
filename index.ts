import express from 'express'
import { calculateBmi } from './bmi-calculator'
import { calculateExercises } from './exercise-calculator'

const app = express()

app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  const query = req.query

  const weight = Number(query.weight)
  const height = Number(query.height)

  if (isNaN(weight) || isNaN(height)) {
    res
      .status(400)
      .send({
        error: 'malformatted parameters',
      })
      .end()
    return
  }

  const bmi = calculateBmi(height, weight)

  res.send({
    weight,
    height,
    bmi,
  })
})

app.post('/exercises', (req, res) => {
  const { daily_exercises: dialyExercises, target } = req.body

  if (!target || !dialyExercises) {
    res.status(400).send({
      error: 'parameters missing',
    })
    return
  }

  if (
    isNaN(Number(target)) ||
    !Array.isArray(dialyExercises) ||
    dialyExercises.some((value) => isNaN(Number(value)))
  ) {
    res.status(400).send({
      error: 'malformatted parameters',
    })
    return
  }

  const result = calculateExercises(
    dialyExercises.map((value) => Number(value)),
    Number(target),
  )

  res.send(result)
})

const PORT = 3003
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))

import express from 'express'
import { calculateBmi } from './bmi-calculator'

const app = express()

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

const PORT = 3003
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))

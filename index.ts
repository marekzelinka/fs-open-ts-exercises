import express from "express";
import * as z from "zod";
import { calculateBmi } from "./bmi-calculator.js";
import { calculateExercises } from "./exercise-calculator.js";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

const BmiSchema = z.object({
  weight: z.coerce.number().gt(0),
  height: z.coerce.number().gt(0),
});

app.get("/bmi", (req, res) => {
  const query = req.query;

  const result = BmiSchema.safeParse(query);
  if (!result.success) {
    return res.status(400).send({
      error: "malformatted parameters",
    });
  }

  const { weight, height } = result.data;

  const bmi = calculateBmi(height, weight);

  res.send({
    weight,
    height,
    bmi,
  });
});

const ExercisesScehma = z.object({
  dialyExercises: z.array(z.number().gte(0)),
  target: z.number().gte(0),
});

app.post("/exercises", (req, res) => {
  const { daily_exercises: dialyExercises, target } = req.body;

  if (target === undefined || dialyExercises === undefined) {
    return res.status(400).send({
      error: "parameters missing",
    });
  }

  const result = ExercisesScehma.safeParse({ dialyExercises, target });
  if (!result.success) {
    return res.status(400).send({
      error: "malformatted parameters",
    });
  }

  const exercises = calculateExercises(
    result.data.dialyExercises,
    result.data.target,
  );

  res.send(exercises);
});

const PORT = 3003;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

type Category =
  | 'Underweight (Severe thinness)'
  | 'Underweight (Moderate thinness)'
  | 'Underweight (Mild thinness)'
  | 'Normal range'
  | 'Overweight (Pre-obese)'
  | 'Obese (Class I)'
  | 'Obese (Class II)'
  | 'Obese (Class III)'

export function calculateBmi(height: number, weight: number): Category {
  const bmi = weight / (height / 100) ** 2

  if (bmi < 16.0) {
    return 'Underweight (Severe thinness)'
  } else if (bmi >= 16.0 && bmi <= 16.9) {
    return 'Underweight (Moderate thinness)'
  } else if (bmi >= 17.0 && bmi <= 18.4) {
    return 'Underweight (Mild thinness)'
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return 'Normal range'
  } else if (bmi >= 25.0 && bmi <= 29.9) {
    return 'Overweight (Pre-obese)'
  } else if (bmi >= 30.0 && bmi <= 34.9) {
    return 'Obese (Class I)'
  } else if (bmi >= 35 && bmi <= 39.9) {
    return 'Obese (Class II)'
  } else {
    // bmi >= 40.0
    return 'Obese (Class III)'
  }
}

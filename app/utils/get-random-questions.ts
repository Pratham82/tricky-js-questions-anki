// app/utils/get-random-question.ts
import questions from '../../public/questions.json'

export type Question = {
  question: string
  code: string
  options: {
    key: string
    value: string
  }[]
  answer: string
  explanation: string
}

export function getRandomQuestion(): Question {
  const randomIndex = Math.floor(Math.random() * questions.length)
  return questions[randomIndex]
}

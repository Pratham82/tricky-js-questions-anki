import fetch from 'node-fetch'
import { writeFile } from 'fs/promises'

const url =
  'https://raw.githubusercontent.com/lydiahallie/javascript-questions/refs/heads/master/README.md'

async function fetchQuestions() {
  const res = await fetch(url)
  const markdown = await res.text()

  const regex =
    /######\s+\d+\.\s+(.*?)\n+```javascript\n([\s\S]*?)```([\s\S]*?)<details><summary><b>Answer<\/b><\/summary>\s*<p>\s*#### Answer: (.*?)\s*([\s\S]*?)<\/p>\s*<\/details>/g

  let match
  const questions = []

  while ((match = regex.exec(markdown)) !== null) {
    const [, title, code, optionsBlock, answer, explanationRaw] = match

    const options = [...optionsBlock.matchAll(/- ([A-D]): (.*)/g)].map(
      ([_, key, val]) => ({
        key,
        value: val.trim(),
      })
    )

    // Clean up explanation (remove markdown headers, etc.)
    const explanation = explanationRaw
      .replace(/^#+\s*Answer:.*$/m, '') // remove extra "Answer" headers if any
      .trim()

    questions.push({
      question: title.trim(),
      code: code.trim(),
      options,
      answer: answer.trim(),
      explanation,
    })
  }

  await writeFile('public/questions.json', JSON.stringify(questions, null, 2))
  console.log(
    `✅ Extracted ${questions.length} questions with explanation to questions.json`
  )
}

fetchQuestions()

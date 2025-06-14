import type { MetaFunction } from '@remix-run/node'
import { json, LoaderFunction } from '@remix-run/node'
import { useFetcher, useLoaderData } from '@remix-run/react'
import { getRandomQuestion, type Question } from '../utils/get-random-questions'
import AnkiCard from '~/components/AnkiCard'
import { motion } from 'framer-motion'
import QuizTitle from '~/components/QuizTitle'

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export const loader: LoaderFunction = async () => {
  const question = getRandomQuestion()
  return json(question)
}

export default function Index() {
  const initialQuestion = useLoaderData<Question>()
  const fetcher = useFetcher<Question>()

  const question = fetcher.data ?? initialQuestion

  const handleNextQuestion = async () => {
    // fetcher.load('/')
    window.location.reload()
  }

  return (
    <div>
      <QuizTitle />
      <AnkiCard questionData={question} />
      <div className="w-[100%] border border-red-500">
        <motion.button
          onClick={handleNextQuestion}
          // disabled={isLoading}
          className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-3 rounded-full shadow-lg border border-blue-400 transition-colors duration-200 z-10 touch-manipulation"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center space-x-2">
            {fetcher.state === 'loading' ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                />
                <span className="text-sm font-medium hidden sm:inline">
                  Loading...
                </span>
              </>
            ) : (
              <>
                <span className="text-lg">🎲</span>
                <span className="text-sm font-medium hidden sm:inline">
                  Get Random Question
                </span>
              </>
            )}
          </div>
        </motion.button>
      </div>
    </div>
  )
}

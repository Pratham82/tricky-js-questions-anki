import { useState } from 'react'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import 'highlight.js/styles/atom-one-dark.css' // theme
import rehypeHighlight from 'rehype-highlight'
import { Question } from '~/utils/get-random-questions'

type Props = {
  questionData: Question
  onNextQuestion?: () => void
  isLoading?: boolean
}

const AnkiCard = ({ questionData }: Props) => {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-2 sm:p-2 md:p-2">
      <div
        className="relative w-full max-w-4xl h-[70vh] min-h-[500px] max-h-[800px] cursor-pointer touch-manipulation"
        onClick={handleFlip}
        role="button"
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleFlip()
          }
        }}
        aria-pressed={isFlipped}
      >
        <motion.div
          className="w-full h-full relative preserve-3d"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{
            transformStyle: 'preserve-3d',
            perspective: '1000px',
          }}
        >
          {/* Front of Card */}
          <motion.div
            className="absolute inset-0 w-full h-full backface-hidden rounded-xl flex items-center justify-center p-3 sm:p-4 md:p-6"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            <div className="w-full h-full bg-white border rounded-xl shadow-xl overflow-y-auto">
              <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-black leading-tight break-words">
                  {questionData.question}
                </h2>

                {questionData.code && (
                  <div className="rounded-md overflow-x-auto text-sm sm:text-base md:text-lg">
                    <ReactMarkdown
                      rehypePlugins={[rehypeHighlight]}
                      components={{
                        code({ node, inline, className, children, ...props }) {
                          return !inline ? (
                            <pre className="overflow-x-auto">
                              <code className={className} {...props}>
                                {children}
                              </code>
                            </pre>
                          ) : (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          )
                        },
                      }}
                    >
                      {`\`\`\`js\n${questionData.code}\n\`\`\``}
                    </ReactMarkdown>
                  </div>
                )}

                <ul className="space-y-2 sm:space-y-3">
                  {questionData.options.map(opt => (
                    <li
                      key={opt.key}
                      className="text-black text-base sm:text-lg md:text-xl break-words"
                    >
                      <strong className="text-blue-600">{opt.key}:</strong>{' '}
                      {opt.value}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 text-center">
                  <div className="inline-flex items-center px-3 py-2 bg-blue-50 rounded-full text-xs sm:text-sm text-blue-600 border border-blue-200">
                    <span className="mr-2">👆</span>
                    Tap to reveal answer
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-green-400 to-blue-500 rounded-xl shadow-lg border-2 border-green-300 flex items-center justify-center p-3 sm:p-4 md:p-6"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <div className="w-full h-full bg-white/95 backdrop-blur-sm rounded-lg overflow-y-auto">
              <div className="p-4 sm:p-6 md:p-8 space-y-4">
                <div className="text-center mb-4">
                  <span className="inline-flex items-center px-3 py-1 bg-green-100 rounded-full text-sm font-medium text-green-800">
                    ✓ Answer
                  </span>
                </div>

                <p className="font-semibold text-lg sm:text-xl md:text-2xl text-black text-center mb-6">
                  Correct Answer:{' '}
                  <span className="text-green-600">{questionData.answer}</span>
                </p>

                <div className="prose prose-sm sm:prose-base max-w-none text-black">
                  <ReactMarkdown>{questionData.explanation}</ReactMarkdown>
                </div>

                <div className="mt-6 text-center">
                  <div className="inline-flex items-center px-3 py-2 bg-green-50 rounded-full text-xs sm:text-sm text-green-600 border border-green-200">
                    <span className="mr-2">👆</span>
                    Tap to flip back
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default AnkiCard

import { motion } from 'framer-motion'

export default function QuizTitle() {
  return (
    <div className="mt-2 mb-2 sm:mb-2 md:mb-2 text-center">
      <motion.h1
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          backgroundSize: '200% 200%',
        }}
      >
        Tricky JS Question
      </motion.h1>

      <div
        className="h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mx-auto mb-3"
        style={{ width: '120px' }}
      />

      <p className="text-sm sm:text-base md:text-lg text-gray-600 font-medium">
        <motion.span
          animate={{
            color: ['#6366f1', '#8b5cf6', '#06b6d4', '#6366f1'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          ✨
        </motion.span>{' '}
        Test Your Knowledge{' '}
        <motion.span
          animate={{
            color: ['#6366f1', '#8b5cf6', '#06b6d4', '#6366f1'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        >
          ✨
        </motion.span>
      </p>
    </div>
  )
}

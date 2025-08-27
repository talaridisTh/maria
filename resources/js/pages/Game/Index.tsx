import { useState, useEffect } from 'react'
import { Head } from '@inertiajs/react'
import { router } from '@inertiajs/react'
import { GameData, User } from './types'
import GameBox from './components/GameBox'
import ProgressSection from './components/ProgressSection'
import QuestionModal from './components/QuestionModal'
import DailyNewsModal from './components/DailyNewsModal'
import GameStyles from './components/GameStyles'

interface Props {
  gameData: GameData[]
  user: {
    id: number
    name: string
    email: string
  }
  debugMode: boolean
  selectedQuestion?: GameData
  showModal?: boolean
  showResult?: boolean
  showAnswer?: boolean
  dailyNews?: {
    id: number
    title: string
    content: string
    created_at: string
  } | null
  showNewsModal?: boolean
}

export default function GameIndex({ gameData, user, debugMode, selectedQuestion: initialQuestion, showModal: initialShowModal, showResult, showAnswer, dailyNews, showNewsModal: initialShowNewsModal }: Props) {
  const [selectedQuestion, setSelectedQuestion] = useState<GameData | null>(initialQuestion || null)
  const [showModal, setShowModal] = useState(initialShowModal || false)
  const [openingBoxes, setOpeningBoxes] = useState<Set<number>>(new Set())
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showingResult, setShowingResult] = useState(showResult || false)
  const [showingAnswer, setShowingAnswer] = useState(showAnswer || false)
  const [showNewsModal, setShowNewsModal] = useState(initialShowNewsModal || false)

  useEffect(() => {
    if (initialQuestion) {
      setSelectedQuestion(initialQuestion)
      setShowModal(true)
      setShowingResult(showResult || false)
      setShowingAnswer(showAnswer || false)
    }
  }, [initialQuestion, showResult, showAnswer])

  const handleReset = () => {
    if (confirm('Are you sure you want to reset your progress?')) {
      router.post('/reset')
    }
  }

  const handleAnswerSubmit = (answer: number) => {
    if (!selectedQuestion) return
    router.post('/answer', {
      day_number: selectedQuestion.day_number,
      selected_answer: answer
    }, { preserveScroll: true })
  }

  const handleRevealAnswer = () => {
    if (!selectedQuestion) return
    setShowingAnswer(true)
    router.post('/reveal-answer', {
      day_number: selectedQuestion.day_number
    }, { preserveScroll: true })
  }

  const handleFoundAnswer = (found: boolean) => {
    if (!selectedQuestion) return
    router.post('/found-answer', {
      day_number: selectedQuestion.day_number,
      found_answer: found
    }, { preserveScroll: true })
  }

  const handleBoxClick = (dayNumber: number) => {
    const dayData = gameData.find(d => d.day_number === dayNumber)
    if (!dayData) return
    if (!(dayData.is_unlocked || dayData.can_unlock || debugMode)) return

    setOpeningBoxes(prev => {
      const newSet = new Set(prev)
      newSet.add(dayNumber)
      return newSet
    })

    setSelectedQuestion(dayData)
    setShowModal(true)
    setShowingResult(false)
    setShowingAnswer(false)

    if (dayData.can_unlock || debugMode) {
      router.post('/unlock', { day_number: dayNumber }, { preserveScroll: true })
    }

    setTimeout(() => {
      setOpeningBoxes(prev => {
        const newSet = new Set(prev)
        newSet.delete(dayNumber)
        return newSet
      })
    }, 1200)
  }

  return (
    <div className="advent-calendar">
      <Head title="30 Μέρες Παιχνίδι για τη Μαρία" />
      <GameStyles />

      <div className="header">
        <h1 className="title">30 Μέρες Παιχνίδι για τη Μαρία 💕</h1>
        <p className="subtitle">
          Καλώς ήρθες, {user.name}! Κάθε μέρα ένα νέο μήνυμα  σε περιμένει...
        </p>
        <div className="header-buttons">
          <button
            onClick={() => router.visit('/daily-news')}
            className="daily-news-button"
          >
            Καθημερινά Νέα 📰
          </button>
        </div>
        <div className="coming-soon-notice">
          💰 Η εξαργύρωση coin έρχεται σύντομα ✨
        </div>
        {debugMode && (
          <div className="debug-notice">
            🔧 Debug Mode: Μπορείς να ανοίξεις οποιοδήποτε κουτί!
          </div>
        )}
      </div>

      <div className="game-container">
        <div className="boxes-grid">
          {gameData.map((item) => (
            <GameBox
              key={item.day_number}
              gameData={item}
              onBoxClick={handleBoxClick}
              isOpening={openingBoxes.has(item.day_number)}
            />
          ))}
        </div>

        <ProgressSection
          gameData={gameData}
          debugMode={debugMode}
          onReset={handleReset}
        />
      </div>

      {showModal && selectedQuestion && (
        <QuestionModal
          selectedQuestion={selectedQuestion}
          onClose={() => setShowModal(false)}
          onAnswerSubmit={handleAnswerSubmit}
          onRevealAnswer={handleRevealAnswer}
          onFoundAnswer={handleFoundAnswer}
          showingResult={showingResult}
          showingAnswer={showingAnswer}
        />
      )}

      {dailyNews && (
        <DailyNewsModal
          isOpen={showNewsModal}
          onClose={() => router.visit('/')}
          news={dailyNews}
        />
      )}
    </div>
  )
}

export interface GameData {
  day_number: number
  question: string
  content: string
  type: string
  options: string[] | null
  correct_answer: number | null
  extra_text: string | null
  coin_reward: number
  is_unlocked: boolean
  is_read: boolean
  can_unlock: boolean
  unlocked_at: string | null
  unlock_date: string
  selected_answer: number | null
  answered_correctly: boolean
  coins_earned: number
  answer_revealed: boolean
}

export interface User {
  id: number
  name: string
  email: string
}

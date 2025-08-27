import { useState } from 'react'
import { GameData } from '../../Game/types'

interface GameBoxProps {
  gameData: GameData
  onBoxClick: (dayNumber: number) => void
  isOpening: boolean
}

export default function GameBox({ gameData, onBoxClick, isOpening }: GameBoxProps) {
  const [hovered, setHovered] = useState(false)

  const getBoxClass = () => {
    let baseClass = "game-box"

    if (gameData.is_unlocked) {
      if (gameData.is_read) {
        baseClass += " unlocked read"
      } else {
        baseClass += " unlocked new"
      }
    } else if (gameData.can_unlock) {
      baseClass += " available"
    } else {
      baseClass += " locked"
    }

    if (hovered) baseClass += " hovered"
    if (isOpening) baseClass += " opening"

    return baseClass
  }

  const getStatusIcon = () => {
    if (gameData.is_unlocked) {
      return gameData.is_read ? '✓' : '🆕'
    }
    return gameData.can_unlock ? '🔓' : '🔒'
  }

  return (
    <div
      className={getBoxClass()}
      onClick={() => onBoxClick(gameData.day_number)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="box-lid"></div>
      <div className="box-body">
        <div className="box-front">
          <span className="day-number">{gameData.day_number}</span>
          <span className="status-icon">{getStatusIcon()}</span>
        </div>
        <div className="box-content">
          <div className="golden-glow"></div>
        </div>
      </div>
    </div>
  )
}

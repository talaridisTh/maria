import { GameData } from '../../Game/types'

interface ProgressSectionProps {
  gameData: GameData[]
  debugMode: boolean
  onReset: () => void
}

export default function ProgressSection({ gameData, debugMode, onReset }: ProgressSectionProps) {
  return (
    <div className="progress-section">
      <p className="legend">
        🔹 Μπλε: Διαθέσιμο | 🟡 Κίτρινο: Νέο μήνυμα | 🟢 Πράσινο: Διαβασμένο | ⚫ Γκρι: Κλειδωμένο
      </p>

      <div className="progress-card">
        <h3 className="progress-title">📊 Πρόοδος</h3>
        <div className="progress-stats">
          <span>Ανοιγμένα: {gameData.filter(d => d.is_unlocked).length}/30</span>
          <span>Διαβασμένα: {gameData.filter(d => d.is_read).length}/30</span>
          <span>🪙 Νομίσματα: {gameData.reduce((sum, d) => sum + (Number(d.coins_earned) || 0), 0)}</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${(gameData.filter(d => d.is_unlocked).length / 30) * 100}%` }}
          />
        </div>
        {debugMode && (
          <button onClick={onReset} className="reset-button">
            🔄 Μηδενισμός Προόδου
          </button>
        )}
      </div>
    </div>
  )
}

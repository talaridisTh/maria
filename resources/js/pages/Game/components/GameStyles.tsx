export default function GameStyles() {
  return (
    <style>{`
      .advent-calendar {
        min-height: 100vh;
        background: linear-gradient(135deg, #fef3c7 0%, #fed7aa 50%, #fecaca 100%);
        padding: 2rem;
      }

      .header {
        text-align: center;
        margin-bottom: 3rem;
      }

      .title {
        font-size: 3.5rem;
        font-weight: bold;
        color: #92400e;
        margin-bottom: 1rem;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
      }

      .subtitle {
        font-size: 1.25rem;
        color: #a16207;
        margin-bottom: 1rem;
      }

      .header-badges {
        display: flex;
        justify-content: center;
        gap: 0.75rem;
        margin-bottom: 1rem;
      }

      .badge {
        display: inline-flex;
        align-items: center;
        padding: 0.4rem 0.9rem;
        border-radius: 9999px;
        font-weight: 800;
        font-size: 0.95rem;
        letter-spacing: 0.2px;
        box-shadow: 0 4px 14px rgba(0,0,0,0.12);
        border: 1px solid rgba(255,255,255,0.25);
      }

      .badge.unlocked {
        background: linear-gradient(135deg, #34d399 0%, #10b981 100%);
        color: #052e1a;
      }

      .badge.locked {
        background: linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%);
        color: #374151;
        opacity: 0.9;
      }

      .badge.unlocked:hover {
        transform: translateY(-1px);
        box-shadow: 0 6px 18px rgba(16, 185, 129, 0.35);
      }

      .header-buttons {
        display: flex;
        justify-content: center;
        margin-bottom: 1.5rem;
      }
      
      .daily-news-button {
        background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
        color: white;
        padding: 0.75rem 1.5rem;
        border-radius: 1rem;
        font-weight: bold;
        border: none;
        cursor: pointer;
        font-size: 1rem;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
      }
      
      .daily-news-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
      }

      .debug-notice {
        background: linear-gradient(45deg, #fbbf24, #f59e0b);
        padding: 1rem;
        border-radius: 1rem;
        margin: 1rem auto;
        max-width: 600px;
        color: #78350f;
        font-weight: 600;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      }

      .coming-soon-notice {
        background: linear-gradient(135deg, #fef08a 0%, #facc15 50%, #f59e0b 100%);
        padding: 1rem 1.25rem;
        border-radius: 1rem;
        margin: 0.5rem auto 1rem;
        max-width: 600px;
        color: #78350f;
        font-weight: 700;
        text-align: center;
        letter-spacing: 0.2px;
        box-shadow: 0 6px 20px rgba(250, 204, 21, 0.35);
        border: 1px solid rgba(250, 204, 21, 0.5);
      }

      .game-container {
        max-width: 1200px;
        margin: 0 auto;
        perspective: 1000px;
      }

      .boxes-grid {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 2rem;
        margin-bottom: 3rem;
        padding: 3rem;
        background: linear-gradient(145deg,
          rgba(255,255,255,0.1) 0%,
          rgba(255,255,255,0.05) 50%,
          rgba(0,0,0,0.02) 100%);
        border-radius: 2rem;
        backdrop-filter: blur(10px);
        box-shadow:
          0 8px 32px rgba(0,0,0,0.1),
          inset 0 1px 0 rgba(255,255,255,0.2);
      }

      .game-box {
        position: relative;
        width: 120px;
        height: 120px;
        margin: 0 auto;
        transform-style: preserve-3d;
        transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        cursor: pointer;
      }

      .game-box:hover {
        transform: scale(1.05) rotateX(-5deg) rotateY(5deg);
      }

      .box-lid {
        position: absolute;
        top: -8px;
        left: -4px;
        width: 128px;
        height: 20px;
        background: linear-gradient(145deg, #8b4513 0%, #a0522d 50%, #cd853f 100%);
        border-radius: 6px;
        transform-origin: bottom center;
        transition: all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        box-shadow:
          0 2px 8px rgba(0,0,0,0.3),
          inset 0 1px 0 rgba(255,255,255,0.2);
        z-index: 10;
      }

      .game-box.opening .box-lid {
        transform: rotateX(-120deg) translateZ(10px);
      }

      .box-body {
        width: 100%;
        height: 100%;
        position: relative;
        transform-style: preserve-3d;
      }

      .box-front {
        position: absolute;
        width: 100%;
        height: 100%;
        background: linear-gradient(145deg, #8b4513 0%, #a0522d 50%, #cd853f 100%);
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-shadow:
          0 8px 25px rgba(0,0,0,0.3),
          inset 0 1px 0 rgba(255,255,255,0.1),
          inset 0 -1px 0 rgba(0,0,0,0.1);
        border: 2px solid rgba(139, 69, 19, 0.3);
      }

      .game-box::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background:
          repeating-linear-gradient(
            90deg,
            transparent 0px,
            rgba(139, 69, 19, 0.1) 1px,
            transparent 2px,
            transparent 8px
          ),
          repeating-linear-gradient(
            0deg,
            transparent 0px,
            rgba(139, 69, 19, 0.1) 1px,
            transparent 2px,
            transparent 12px
          );
        border-radius: 12px;
        pointer-events: none;
      }

      .day-number {
        font-size: 2rem;
        font-weight: bold;
        color: white;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        margin-bottom: 0.5rem;
      }

      .status-icon {
        font-size: 0.8rem;
      }

      .box-content {
        position: absolute;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, #ffd700 0%, #ffed4a 50%, #f59e0b 100%);
        border-radius: 12px;
        opacity: 0;
        transform: translateZ(-1px);
        transition: opacity 0.6s ease;
      }

      .game-box.opening .box-content {
        opacity: 1;
      }

      .golden-glow {
        width: 100%;
        height: 100%;
        background: radial-gradient(
          circle at center,
          rgba(255, 215, 0, 0.8) 0%,
          rgba(255, 215, 0, 0.4) 30%,
          rgba(255, 215, 0, 0.1) 60%,
          transparent 100%
        );
        border-radius: 12px;
        animation: glow 2s ease-in-out infinite alternate;
      }

      @keyframes glow {
        from { opacity: 0.5; transform: scale(1); }
        to { opacity: 1; transform: scale(1.05); }
      }

      .game-box.available {
        animation: available-pulse 2s ease-in-out infinite;
      }

      @keyframes available-pulse {
        0%, 100% {
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
          transform: scale(1);
        }
        50% {
          box-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
          transform: scale(1.02);
        }
      }

      .game-box.new {
        animation: new-shimmer 1.5s ease-in-out infinite;
      }

      @keyframes new-shimmer {
        0%, 100% {
          box-shadow: 0 0 20px rgba(255, 215, 0, 0.4);
        }
        50% {
          box-shadow: 0 0 40px rgba(255, 215, 0, 0.7);
        }
      }

      .game-box.read .box-front {
        background: linear-gradient(145deg, #059669 0%, #10b981 50%, #34d399 100%);
      }

      .game-box.locked {
        opacity: 0.6;
        cursor: not-allowed;
      }

      .game-box.locked:hover {
        transform: none;
      }

      .progress-section {
        text-align: center;
      }

      .legend {
        font-size: 1rem;
        color: #a16207;
        margin-bottom: 2rem;
        font-weight: 600;
      }

      .progress-card {
        background: linear-gradient(135deg,
          rgba(255,255,255,0.3) 0%,
          rgba(255,255,255,0.1) 100%);
        backdrop-filter: blur(15px);
        border-radius: 2rem;
        padding: 2.5rem;
        max-width: 500px;
        margin: 0 auto;
        box-shadow:
          0 8px 32px rgba(0,0,0,0.1),
          inset 0 1px 0 rgba(255,255,255,0.3);
        border: 1px solid rgba(255,255,255,0.2);
      }

      .progress-title {
        font-size: 1.5rem;
        font-weight: bold;
        color: #92400e;
        margin-bottom: 1.5rem;
      }

      .progress-stats {
        display: flex;
        justify-content: space-between;
        font-size: 1.1rem;
        font-weight: 600;
        color: #a16207;
        margin-bottom: 1.5rem;
      }

      .progress-bar {
        width: 100%;
        height: 1rem;
        background: rgba(217, 119, 6, 0.2);
        border-radius: 0.5rem;
        margin-bottom: 2rem;
        overflow: hidden;
        box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
      }

      .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #f59e0b 0%, #d97706 100%);
        border-radius: 0.5rem;
        transition: width 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        box-shadow: 0 0 10px rgba(245, 158, 11, 0.5);
      }

      .reset-button {
        width: 100%;
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        color: white;
        padding: 0.75rem 1.5rem;
        border-radius: 1rem;
        font-weight: bold;
        border: none;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
      }

      .reset-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);
      }

      .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(8px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        padding: 1rem;
      }

      .modal-content {
        background: linear-gradient(135deg, #fffbeb 0%, #fed7aa 100%);
        border-radius: 2rem;
        padding: 2.5rem;
        max-width: 500px;
        width: 100%;
        box-shadow:
          0 20px 60px rgba(0,0,0,0.3),
          inset 0 1px 0 rgba(255,255,255,0.3);
        border: 2px solid rgba(251, 191, 36, 0.2);
        animation: modal-appear 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      @keyframes modal-appear {
        from { opacity: 0; transform: scale(0.8) translateY(20px); }
        to { opacity: 1; transform: scale(1) translateY(0); }
      }

      .modal-header {
        text-align: center;
        margin-bottom: 2rem;
      }

      .modal-day-circle {
        width: 5rem;
        height: 5rem;
        background: linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 1rem auto;
        box-shadow:
          0 8px 25px rgba(245, 158, 11, 0.4),
          inset 0 2px 0 rgba(255,255,255,0.2);
      }

      .modal-day-number {
        font-size: 2rem;
        font-weight: bold;
        color: white;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
      }

      .modal-question {
        font-size: 1.5rem;
        font-weight: bold;
        color: #92400e;
        margin-bottom: 1.5rem;
      }

      .modal-message {
        background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
        border-radius: 1.5rem;
        padding: 2rem;
        margin-bottom: 2rem;
        box-shadow:
          inset 0 2px 4px rgba(0,0,0,0.05),
          0 1px 0 rgba(255,255,255,0.2);
        border: 1px solid rgba(251, 191, 36, 0.2);
      }

      .modal-text {
        color: #78350f;
        text-align: center;
        line-height: 1.6;
        font-size: 1.1rem;
      }

      .modal-close-button {
        width: 100%;
        background: linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%);
        color: white;
        padding: 1rem 2rem;
        border-radius: 1rem;
        font-weight: bold;
        border: none;
        cursor: pointer;
        font-size: 1.1rem;
        transition: all 0.3s ease;
        box-shadow:
          0 4px 15px rgba(245, 158, 11, 0.3),
          inset 0 1px 0 rgba(255,255,255,0.2);
      }

      .modal-close-button:hover {
        transform: translateY(-2px);
        box-shadow:
          0 6px 20px rgba(245, 158, 11, 0.4),
          inset 0 1px 0 rgba(255,255,255,0.2);
      }

      .coin-indicator {
        background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
        color: #78350f;
        padding: 0.5rem 1rem;
        border-radius: 1rem;
        font-weight: bold;
        margin-top: 1rem;
        box-shadow: 0 2px 8px rgba(251, 191, 36, 0.3);
      }

      .multiple-choice-options {
        margin: 2rem 0;
      }

      .choice-button {
        width: 100%;
        background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
        border: 2px solid #f59e0b;
        color: #92400e;
        padding: 1rem;
        margin: 0.5rem 0;
        border-radius: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        text-align: left;
      }

      .choice-button:hover {
        background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
        color: white;
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3);
      }

      .result-section {
        margin: 2rem 0;
        text-align: center;
      }

      .correct-answer {
        background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
        color: #065f46;
        padding: 1.5rem;
        border-radius: 1rem;
        font-weight: bold;
        font-size: 1.1rem;
        box-shadow: 0 4px 15px rgba(16, 185, 129, 0.2);
      }

      .wrong-answer {
        background: linear-gradient(135deg, #fecaca 0%, #fca5a5 100%);
        color: #7f1d1d;
        padding: 1.5rem;
        border-radius: 1rem;
        font-weight: bold;
        font-size: 1.1rem;
        box-shadow: 0 4px 15px rgba(239, 68, 68, 0.2);
      }

      .see-answer-section {
        margin: 2rem 0;
        text-align: center;
      }

      .reveal-answer-button {
        background: linear-gradient(135deg, #e879f9 0%, #c084fc 100%);
        color: white;
        padding: 1rem 2rem;
        border-radius: 1rem;
        font-weight: bold;
        border: none;
        cursor: pointer;
        font-size: 1.1rem;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(232, 121, 249, 0.3);
      }

      .reveal-answer-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(232, 121, 249, 0.4);
      }

      .extra-text {
        margin-top: 1rem;
        padding: 1rem;
        background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%);
        border-radius: 1rem;
        color: #581c87;
        font-style: italic;
        font-weight: 500;
      }
      
      .found-answer-section {
        margin: 2rem 0;
        text-align: center;
      }
      
      .found-answer-question {
        font-weight: bold;
        font-size: 1.2rem;
        color: #78350f;
        margin-bottom: 1rem;
      }
      
      .found-answer-buttons {
        display: flex;
        gap: 1rem;
        justify-content: center;
      }
      
      .found-answer-button {
        padding: 0.75rem 1.5rem;
        border-radius: 1rem;
        font-weight: bold;
        border: none;
        cursor: pointer;
        font-size: 1rem;
        transition: all 0.3s ease;
      }
      
      .found-yes {
        background: linear-gradient(135deg, #34d399 0%, #10b981 100%);
        color: white;
        box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
      }
      
      .found-yes:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
      }
      
      .found-no {
        background: linear-gradient(135deg, #93c5fd 0%, #60a5fa 100%);
        color: white;
        box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
      }
      
      .found-no:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
      }

      @media (max-width: 768px) {
        .boxes-grid {
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          padding: 2rem;
        }

        .game-box {
          width: 90px;
          height: 90px;
        }

        .title {
          font-size: 2.5rem;
        }
      }
    `}</style>
  )
}

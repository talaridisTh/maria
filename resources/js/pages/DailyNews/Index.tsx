import { GameData } from '../../Game/types';

interface QuestionModalProps {
    selectedQuestion: GameData;
    onClose: () => void;
    onAnswerSubmit: (answer: number) => void;
    onRevealAnswer: () => void;
    onFoundAnswer: (found: boolean) => void;
    showingResult: boolean;
    showingAnswer: boolean;
}

export default function QuestionModal({
    selectedQuestion,
    onClose,
    onAnswerSubmit,
    onRevealAnswer,
    onFoundAnswer,
    showingResult,
    showingAnswer,
}: QuestionModalProps) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <div className="modal-day-circle">
                        <span className="modal-day-number">{selectedQuestion.day_number}</span>
                    </div>
                    <h3 className="modal-question">{selectedQuestion.question}</h3>
                    {selectedQuestion.coin_reward > 0 && <div className="coin-indicator">🪙 {selectedQuestion.coin_reward} νομίσματα</div>}
                </div>

                {selectedQuestion.type === 'multiple_choice' && !showingResult && !showingAnswer && !selectedQuestion.selected_answer && (
                    <MultipleChoiceOptions options={selectedQuestion.options || []} onSelect={onAnswerSubmit} />
                )}

                {selectedQuestion.type === 'multiple_choice' && (showingResult || selectedQuestion.selected_answer) && (
                    <ResultSection question={selectedQuestion} />
                )}

                {selectedQuestion.type === 'message' && !showingAnswer && !selectedQuestion.answer_revealed && (
                    <div className="see-answer-section">
                        <button onClick={onRevealAnswer} className="reveal-answer-button">
                            Δες την απάντηση 💕
                        </button>
                    </div>
                )}

                {selectedQuestion.type === 'message' && (showingAnswer || selectedQuestion.answer_revealed) && (
                    <MessageAnswerSection question={selectedQuestion} onFoundAnswer={onFoundAnswer} />
                )}

                <button onClick={onClose} className="modal-close-button">
                    Κλείσιμο 💕
                </button>
            </div>
        </div>
    );
}

function MultipleChoiceOptions({ options, onSelect }: { options: string[]; onSelect: (index: number) => void }) {
    return (
        <div className="multiple-choice-options">
            {options.map((option, index) => (
                <button key={index} onClick={() => onSelect(index + 1)} className="choice-button">
                    {index + 1}. {option}
                </button>
            ))}
        </div>
    );
}

function ResultSection({ question }: { question: GameData }) {
    return (
        <>
            <div className="result-section">
                {question.answered_correctly ? (
                    <div className="correct-answer">✅ Σωστό! Κέρδισες {question.coins_earned} νομίσματα! 🪙</div>
                ) : (
                    <div className="wrong-answer">❌ Λάθος! Η σωστή απάντηση είναι: {question.options?.[question.correct_answer! - 1]}</div>
                )}
            </div>
            <div className="modal-message">
                <p className="modal-text">{question.content}</p>
                {question.extra_text && <p className="extra-text">{question.extra_text}</p>}
            </div>
        </>
    );
}

function MessageAnswerSection({ question, onFoundAnswer }: { question: GameData; onFoundAnswer: (found: boolean) => void }) {
    // Πιο αυστηρός έλεγχος - ελέγχουμε αν έχουν κερδιστεί coins ή αν υπάρχει συγκεκριμένη απάντηση
    const hasAnsweredFoundQuestion = question.coins_earned > 0 || question.selected_answer !== null;

    return (
        <>
            <div className="modal-message">
                <p className="modal-text">{question.content}</p>
                {question.extra_text && <p className="extra-text">{question.extra_text}</p>}
            </div>

            {!hasAnsweredFoundQuestion && (
                <div className="found-answer-section">
                    <p className="found-answer-question">Το βρήκες;</p>
                    <div className="found-answer-buttons">
                        <button onClick={() => onFoundAnswer(true)} className="found-answer-button found-yes">
                            Το βρήκα! 🎉
                        </button>
                        <button onClick={() => onFoundAnswer(false)} className="found-answer-button found-no">
                            Δεν το βρήκα 😕
                        </button>
                    </div>
                </div>
            )}

            {hasAnsweredFoundQuestion && (
                <div className="result-section">
                    {question.answered_correctly ? (
                        <div className="correct-answer">✅ Μπράβο! Κέρδισες {question.coins_earned} νομίσματα! 🪙</div>
                    ) : (
                        <div className="wrong-answer">😕 Δεν πειράζει! Την επόμενη φορά θα το βρεις!</div>
                    )}
                </div>
            )}
        </>
    );
}

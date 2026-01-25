import React from 'react';
import { Question } from '../../types';

interface HeaderProps {
    question: Question;
    connectionError: string | null;
    isPreviousLoading: boolean;
    isNextLoading: boolean;
    onPrevious: () => void;
    onNext: () => void;
}

export const Header: React.FC<HeaderProps> = ({
    question,
    connectionError,
    isPreviousLoading,
    isNextLoading,
    onPrevious,
    onNext
}) => {
    return (
        <header className="header">
            <div className="header-left">
                <span className="logo">🧪 NBReact</span>
                <span className="badge badge-topic">{question.topic}</span>
                <span className="badge badge-difficulty">{question.difficulty}</span>
                <span className="badge badge-question">Q{question.id || '?'}</span>
                <div className="status-indicator">
                    <div className="status-dot" style={{ background: connectionError ? 'red' : undefined }}></div>
                    <span>{connectionError ? 'Error' : 'Connected'}</span>
                </div>
            </div>
            <div className="header-actions">
                <button
                    className="action-btn secondary"
                    onClick={onPrevious}
                    disabled={isPreviousLoading || question.id === "1"}
                    style={{
                        opacity: (isPreviousLoading || question.id === "1") ? 0.5 : 1,
                        marginRight: '8px'
                    }}
                >
                    ← Prev
                </button>
                <button
                    className="action-btn secondary"
                    disabled={true}
                    style={{ opacity: 0.5, cursor: 'not-allowed' }}
                    title="Hints available in next update"
                >
                    💡 Hint
                </button>
                <button
                    className="action-btn secondary"
                    disabled={true}
                    style={{ opacity: 0.5, cursor: 'not-allowed' }}
                    title="Answers available in next update"
                >
                    📖 Answer
                </button>
                <button
                    className="action-btn success"
                    onClick={onNext}
                    disabled={isNextLoading}
                    style={{ opacity: isNextLoading ? 0.7 : 1, cursor: isNextLoading ? 'wait' : 'pointer' }}
                >
                    {isNextLoading ? 'Loading...' : 'Next →'}
                </button>
            </div>
        </header>
    );
};

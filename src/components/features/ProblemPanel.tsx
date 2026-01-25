import React from 'react';
import { Question } from '../../types';

interface ProblemPanelProps {
    question: Question;
    connectionError: string | null;
}

export const ProblemPanel: React.FC<ProblemPanelProps> = ({ question, connectionError }) => {
    return (
        <div className="problem-panel">
            <div className="problem-header">
                <h1 className="problem-title">{question.title}</h1>
                <div className="problem-meta">
                    <span className="badge badge-difficulty">{question.difficulty}</span>
                    <span className="badge badge-topic">{question.topic}</span>
                </div>
            </div>
            <div className="problem-content">
                {connectionError && (
                    <div style={{ padding: '10px', background: '#fee2e2', color: '#b91c1c', borderRadius: '4px', marginBottom: '10px' }}>
                        {connectionError}
                    </div>
                )}
                <div className="problem-section">
                    <div className="section-title">Problem Statement</div>
                    <div className="section-content" dangerouslySetInnerHTML={{ __html: question.description }}></div>
                </div>
                {question.requirements.length > 0 && (
                    <div className="problem-section">
                        <div className="section-title">Requirements</div>
                        <div className="section-content">
                            <ul>
                                {question.requirements.map((req: string, i: number) => (
                                    <li key={i} dangerouslySetInnerHTML={{ __html: req }}></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

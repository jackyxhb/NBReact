import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import './App.css';
import { useMcp } from './hooks/useMcp';
import { invoke } from '@tauri-apps/api/core';
import { useTestRunner } from './hooks/useTestRunner';
import * as Babel from '@babel/standalone';
import Editor from '@monaco-editor/react';

const defaultCode = `
function Timer({ initialSeconds }) {
  const [seconds, setSeconds] = React.useState(initialSeconds);
  
  React.useEffect(() => {
    if (seconds <= 0) return;
    const timer = setInterval(() => setSeconds(s => s - 1), 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h3 style={{ margin: '0 0 16px' }}>Timer: {seconds}</h3>
      <button 
        style={{
           padding: '8px 16px',
           background: '#3b82f6',
           color: 'white',
           border: 'none',
           borderRadius: 6,
           cursor: 'pointer'
        }}
        onClick={() => setSeconds(initialSeconds)}
      >
        Reset
      </button>
    </div>
  );
}

// Render the component
render(<Timer initialSeconds={60} />);
`;

// Helper component for buttons that change text briefly
function FeedbackButton({ label, message }: { label: string, message: string }) {
    const [text, setText] = useState(label);

    const handleClick = () => {
        setText(message);
        setTimeout(() => setText(label), 1500);
    };

    return (
        <button className="action-btn secondary" onClick={handleClick}>
            {text}
        </button>
    );
}

function App() {
    const { runTests, isRunning, results } = useTestRunner();

    // State for Problem Data
    const [question, setQuestion] = useState<any>({
        title: 'Loading...',
        topic: '...',
        difficulty: '...',
        description: "Connecting to session...",
        requirements: [],
        testCases: []
    });

    const [connectionError, setConnectionError] = useState<string | null>(null);

    const [code, setCode] = useState(defaultCode);

    useEffect(() => {
        console.log('Fetching session...');
        invoke('get_current_question')
            .then((data: any) => {
                console.log('Loaded session data:', data);
                setQuestion({
                    title: data.title || 'Error: No Title',
                    topic: data.topic || 'React',
                    difficulty: data.difficulty || 'Medium',
                    description: data.description || 'No description available',
                    requirements: data.requirements || [],
                    testCases: data.testCases || data.test_cases || []
                });
                if (data.starter_code || data.starterCode) {
                    setCode(data.starter_code || data.starterCode);
                }
            })
            .catch(err => {
                console.error('Failed to load session:', err);
                setConnectionError(`Session Error: ${err}`);
                setQuestion((q: any) => ({ ...q, title: 'Session Load Failed', description: String(err) }));
            });
    }, []);

    useMcp({
        onStart: (data: any) => {
            console.log('Starting session with data:', data);
            if (data.question) {
                setQuestion({
                    title: data.question.title || 'New Question',
                    topic: data.question.topic || data.topic || 'React',
                    difficulty: data.question.difficulty || data.difficulty || 'Medium',
                    description: data.question.description || '',
                    requirements: data.question.requirements || [],
                    testCases: data.question.testCases || []
                });
                if (data.question.starterCode) {
                    setCode(data.question.starterCode);
                }
            }
        },
        onEvaluate: (remoteCode: string) => {
            console.log('Agent requested evaluation');
        }
    });

    const [activeOutputTab, setActiveOutputTab] = useState<'preview' | 'tests'>('preview');

    const [error, setError] = useState<string | null>(null);
    const previewRef = useRef<HTMLDivElement>(null);

    // Live Preview Effect
    useEffect(() => {
        if (activeOutputTab !== 'preview') return;

        const compileAndRun = () => {
            if (!previewRef.current) return;

            try {
                previewRef.current.innerHTML = '<div id="preview-root"></div>';

                const output = Babel.transform(code, {
                    presets: ['react', 'env']
                }).code;

                const fun = new Function('React', 'render', output!);

                fun(React, (el: any) => {
                    import('react-dom/client').then(({ createRoot }) => {
                        const root = createRoot(document.getElementById('preview-root')!);
                        root.render(el);
                    });
                });

                setError(null);
            } catch (err: any) {
                setError(err.message);
            }
        };

        const timeout = setTimeout(compileAndRun, 800);
        return () => clearTimeout(timeout);
    }, [code, activeOutputTab]);

    const handleRunTests = () => {
        setActiveOutputTab('tests');
        runTests(code, question.testCases);
    };

    const [isNextLoading, setIsNextLoading] = useState(false);

    const handleNext = async () => {
        if (isNextLoading) return;
        setIsNextLoading(true);
        try {
            console.log('Requesting next question...');
            if (typeof invoke === 'undefined') {
                throw new Error('Tauri invoke function is undefined');
            }
            // Call the new Rust command
            const newQuestion = await invoke('next_question');
            console.log('Received next question:', newQuestion);

            // Update UI state
            const data: any = newQuestion;
            setQuestion({
                title: data.title || 'New Question',
                topic: data.topic || 'React',
                difficulty: data.difficulty || 'Medium',
                description: data.description || '',
                requirements: data.requirements || [],
                testCases: data.testCases || data.test_cases || []
            });
            if (data.starter_code || data.starterCode) {
                setCode(data.starter_code || data.starterCode);
            }

        } catch (err: any) {
            console.error('Failed to request next question:', err);
            // Show user friendly error
            alert('Next Button Failed: ' + (err.message || String(err)));
        } finally {
            setIsNextLoading(false);
        }
    };

    const [isPreviousLoading, setIsPreviousLoading] = useState(false);

    const handlePrevious = async () => {
        if (isPreviousLoading) return;
        setIsPreviousLoading(true);
        try {
            console.log('Requesting previous question...');
            if (typeof invoke === 'undefined') throw new Error('Invoke undefined');
            const newQuestion = await invoke('previous_question');
            console.log('Received previous question:', newQuestion);

            const data: any = newQuestion;
            setQuestion({
                title: data.title || 'Question',
                topic: data.topic || 'React',
                difficulty: data.difficulty || 'Medium',
                description: data.description || '',
                requirements: data.requirements || [],
                testCases: data.testCases || data.test_cases || []
            });
            if (data.starter_code || data.starterCode) {
                setCode(data.starter_code || data.starterCode);
            }
        } catch (err: any) {
            console.error('Failed to request prev question:', err);
            if (!String(err).includes("Already at first")) {
                alert('Previous Failed: ' + (err.message || String(err)));
            }
        } finally {
            setIsPreviousLoading(false);
        }
    };

    return (
        <div className="app">
            {/* Header */}
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
                        onClick={handlePrevious}
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
                        onClick={handleNext}
                        disabled={isNextLoading}
                        style={{ opacity: isNextLoading ? 0.7 : 1, cursor: isNextLoading ? 'wait' : 'pointer' }}
                    >
                        {isNextLoading ? 'Loading...' : 'Next →'}
                    </button>
                </div>
            </header>

            <div className="main-container">
                {/* Problem Panel */}
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

                {/* Code Panel */}
                <div className="code-panel">
                    <div className="editor-header">
                        <div className="editor-tabs">
                            <button className="editor-tab active">solution.js</button>
                        </div>
                        <button
                            className="action-btn primary"
                            onClick={handleRunTests}
                            disabled={isRunning}
                        >
                            {isRunning ? 'Running...' : '▶ Run Tests'}
                        </button>
                    </div>

                    <div className="editor-body">
                        <div className="editor-instance">
                            <Editor
                                height="100%"
                                defaultLanguage="javascript"
                                theme="vs-dark"
                                value={code}
                                onChange={(value) => setCode(value || '')}
                                options={{
                                    minimap: { enabled: false },
                                    fontSize: 14,
                                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                                    padding: { top: 16 },
                                    automaticLayout: true,
                                    scrollBeyondLastLine: false,
                                    wordWrap: 'on',
                                    lineNumbers: 'on',
                                }}
                            />
                        </div>
                    </div>

                    {/* Output / Preview Container */}
                    <div className="output-container" style={{ height: '40%', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', background: 'var(--bg-secondary)' }}>
                        <div className="editor-header" style={{ background: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border)' }}>
                            <div className="editor-tabs">
                                <button
                                    className={`editor-tab ${activeOutputTab === 'preview' ? 'active' : ''}`}
                                    onClick={() => setActiveOutputTab('preview')}
                                >
                                    👁️ Preview
                                </button>
                                <button
                                    className={`editor-tab ${activeOutputTab === 'tests' ? 'active' : ''}`}
                                    onClick={() => setActiveOutputTab('tests')}
                                >
                                    ✅ Test Cases
                                </button>
                            </div>
                        </div>

                        <div className="output-content" style={{ flex: 1, overflowY: 'auto', padding: 0 }}>
                            {activeOutputTab === 'preview' && (
                                <div style={{ height: '100%', position: 'relative' }}>
                                    {error && (
                                        <div style={{
                                            padding: '12px',
                                            background: 'var(--error-soft)',
                                            color: 'var(--error)',
                                            fontSize: '13px',
                                            borderBottom: '1px solid var(--error-soft)'
                                        }}>
                                            {error}
                                        </div>
                                    )}
                                    <div
                                        ref={previewRef}
                                        style={{
                                            padding: '24px',
                                            background: 'white',
                                            minHeight: '100%',
                                            color: '#333'
                                        }}
                                    />
                                </div>
                            )}

                            {activeOutputTab === 'tests' && (
                                <div style={{ padding: '16px' }}>
                                    {results ? (
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                                <span style={{ fontSize: '24px', fontWeight: 'bold', color: results.score === 100 ? 'var(--success)' : 'var(--warning)' }}>
                                                    {results.score}/100
                                                </span>
                                                <span style={{ color: 'var(--text-secondary)' }}>
                                                    Passed: {results.passed} | Failed: {results.failed}
                                                </span>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                {results.testResults.map((r, i) => (
                                                    <div key={i} style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '12px',
                                                        padding: '10px 14px',
                                                        background: 'var(--bg-tertiary)',
                                                        borderRadius: '8px',
                                                        border: '1px solid var(--border)'
                                                    }}>
                                                        <div style={{
                                                            width: '10px',
                                                            height: '10px',
                                                            borderRadius: '50%',
                                                            background: r.status === 'passed' ? 'var(--success)' : 'var(--error)'
                                                        }}></div>
                                                        <span style={{ fontFamily: 'monospace', fontSize: '13px' }}>
                                                            {r.status === 'passed' ? 'Test Passed' : `Failed: Expected ${r.expected}, got ${r.actual}`}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <div style={{ color: 'var(--text-secondary)', padding: '20px', textAlign: 'center' }}>
                                            Run tests to see results
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;

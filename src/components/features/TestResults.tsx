import React, { useRef, useEffect, useState } from 'react';
import * as Babel from '@babel/standalone';
import { TestResultSummary } from '../../types';

interface TestResultsProps {
    activeTab: 'preview' | 'tests';
    setActiveTab: (tab: 'preview' | 'tests') => void;
    code: string;
    results: TestResultSummary | null;
}

export const TestResults: React.FC<TestResultsProps> = ({ activeTab, setActiveTab, code, results }) => {
    const [error, setError] = useState<string | null>(null);
    const previewRef = useRef<HTMLDivElement>(null);

    // Live Preview Effect
    useEffect(() => {
        if (activeTab !== 'preview') return;

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
    }, [code, activeTab]);

    return (
        <div className="output-container" style={{ height: '40%', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', background: 'var(--bg-secondary)' }}>
            <div className="editor-header" style={{ background: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border)' }}>
                <div className="editor-tabs">
                    <button
                        className={`editor-tab ${activeTab === 'preview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('preview')}
                    >
                        👁️ Preview
                    </button>
                    <button
                        className={`editor-tab ${activeTab === 'tests' ? 'active' : ''}`}
                        onClick={() => setActiveTab('tests')}
                    >
                        ✅ Test Cases
                    </button>
                </div>
            </div>

            <div className="output-content" style={{ flex: 1, overflowY: 'auto', padding: 0 }}>
                {activeTab === 'preview' && (
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

                {activeTab === 'tests' && (
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
                                                background: r.passed ? 'var(--success)' : 'var(--error)'
                                            }}></div>
                                            <span style={{ fontFamily: 'monospace', fontSize: '13px' }}>
                                                {r.passed ? 'Test Passed' : `Failed: Expected ${r.expected}, got ${r.actual}`}
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
    );
};

import React from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
    code: string;
    setCode: (code: string) => void;
    isRunning: boolean;
    onRunTests: () => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ code, setCode, isRunning, onRunTests }) => {
    return (
        <div className="code-panel-top" style={{ height: '60%', display: 'flex', flexDirection: 'column' }}>
            <div className="editor-header">
                <div className="editor-tabs">
                    <button className="editor-tab active">solution.js</button>
                </div>
                <button
                    className="action-btn primary"
                    onClick={onRunTests}
                    disabled={isRunning}
                >
                    {isRunning ? 'Running...' : '▶ Run Tests'}
                </button>
            </div>

            <div className="editor-body" style={{ flex: 1 }}>
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
        </div>
    );
};

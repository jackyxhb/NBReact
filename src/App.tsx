import { useState, useEffect } from 'react';
import './index.css';
import './App.css';
import { useMcp } from './hooks/useMcp';
import { invoke } from '@tauri-apps/api/core';
import { useTestRunner } from './hooks/useTestRunner';
import { Header } from './components/common/Header';
import { ProblemPanel } from './components/features/ProblemPanel';
import { CodeEditor } from './components/features/CodeEditor';
import { TestResults } from './components/features/TestResults';
import { Question, BackendQuestion } from './types';

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

function App() {
  const { runTests, isRunning, results } = useTestRunner();

  // State for Problem Data
  const [question, setQuestion] = useState<Question>({
    id: '1',
    title: 'Loading...',
    topic: '...',
    difficulty: '...',
    description: "Connecting to session...",
    requirements: [],
    testCases: []
  });

  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [code, setCode] = useState(defaultCode);
  const [activeOutputTab, setActiveOutputTab] = useState<'preview' | 'tests'>('preview');

  useEffect(() => {
    console.log('Fetching session...');
    invoke('get_current_question')
      .then((data: any) => {
        const qData = data as BackendQuestion;
        console.log('Loaded session data:', data);
        setQuestion({
          id: qData.id || '1',
          title: qData.title || 'Error: No Title',
          topic: qData.topic || 'React',
          difficulty: qData.difficulty || 'Medium',
          description: qData.description || 'No description available',
          requirements: qData.requirements || [],
          testCases: qData.testCases || qData.test_cases || [],
          starterCode: qData.starter_code || qData.starterCode
        });
        if (qData.starter_code || qData.starterCode) {
          setCode(qData.starter_code || qData.starterCode || '');
        }
      })
      .catch(err => {
        console.error('Failed to load session:', err);
        setConnectionError(`Session Error: ${err}`);
        setQuestion((q: Question) => ({ ...q, title: 'Session Load Failed', description: String(err) }));
      });
  }, []);

  useMcp({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onStart: (data: any) => {
      // Data from MCP could be complex, keeping explicit any with suppression or trying to tighten
      console.log('Starting session with data:', data);

      // Assume data matches partial BackendQuestion structure nested or direct
      const qData = (data.question || data) as BackendQuestion;

      if (qData) {
        setQuestion({
          id: qData.id || '?',
          title: qData.title || 'New Question',
          topic: qData.topic || 'React',
          difficulty: qData.difficulty || 'Medium',
          description: qData.description || '',
          requirements: qData.requirements || [],
          testCases: qData.testCases || [],
          starterCode: qData.starterCode
        });
        if (qData.starterCode) {
          setCode(qData.starterCode);
        }
      }
    },
    onEvaluate: (_: string) => {
      console.log('Agent requested evaluation');
    }
  });

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
      const newQuestion = await invoke('next_question');
      console.log('Received next question:', newQuestion);

      const data = newQuestion as BackendQuestion;
      setQuestion({
        id: data.id || '?',
        title: data.title || 'New Question',
        topic: data.topic || 'React',
        difficulty: data.difficulty || 'Medium',
        description: data.description || '',
        requirements: data.requirements || [],
        testCases: data.testCases || data.test_cases || [],
        starterCode: data.starter_code || data.starterCode
      });
      if (data.starter_code || data.starterCode) {
        setCode(data.starter_code || data.starterCode || '');
      }

    } catch (err: any) {
      console.error('Failed to request next question:', err);
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

      const data = newQuestion as BackendQuestion;
      setQuestion({
        id: data.id || '?',
        title: data.title || 'Question',
        topic: data.topic || 'React',
        difficulty: data.difficulty || 'Medium',
        description: data.description || '',
        requirements: data.requirements || [],
        testCases: data.testCases || data.test_cases || [],
        starterCode: data.starter_code || data.starterCode
      });
      if (data.starter_code || data.starterCode) {
        setCode(data.starter_code || data.starterCode || '');
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
      <Header
        question={question}
        connectionError={connectionError}
        isPreviousLoading={isPreviousLoading}
        isNextLoading={isNextLoading}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />

      <div className="main-container">
        <ProblemPanel
          question={question}
          connectionError={connectionError}
        />

        <div className="code-panel">
          <CodeEditor
            code={code}
            setCode={setCode}
            isRunning={isRunning}
            onRunTests={handleRunTests}
          />

          <TestResults
            activeTab={activeOutputTab}
            setActiveTab={setActiveOutputTab}
            code={code}
            results={results}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

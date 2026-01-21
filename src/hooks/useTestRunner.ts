import { useState, useCallback, useRef, useEffect } from 'react';
import TestWorker from '../test-runner/worker?worker';

export function useTestRunner() {
    const [isRunning, setIsRunning] = useState(false);
    const [results, setResults] = useState<any>(null);
    const workerRef = useRef<Worker | null>(null);

    useEffect(() => {
        workerRef.current = new TestWorker();

        workerRef.current.onmessage = (e) => {
            setResults(e.data);
            setIsRunning(false);
        };

        return () => {
            workerRef.current?.terminate();
        };
    }, []);

    const runTests = useCallback((code: string, testCases: any[]) => {
        if (!workerRef.current) return;

        setIsRunning(true);
        setResults(null);

        workerRef.current.postMessage({ code, testCases });
    }, []);

    return { runTests, isRunning, results };
}

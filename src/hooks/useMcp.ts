import { useEffect } from 'react';
import { listen } from '@tauri-apps/api/event';
import { invoke } from '@tauri-apps/api/core';
import { useTestRunner } from './useTestRunner';

interface McpRequest {
    id: string;
    method: string;
    params: any;
}

interface UseMcpOptions {
    onStart?: (data: any) => void;
    onEvaluate?: (code: string) => void;
}

export function useMcp({ onStart, onEvaluate }: UseMcpOptions = {}) {
    const { runTests, results } = useTestRunner();

    useEffect(() => {
        const unlisten = listen<McpRequest>('mcp-request', async (event) => {
            const { id, method, params } = event.payload;
            console.log('MCP Request:', method, params);

            if (method === 'notebook_evaluate') {
                const code = params?.arguments?.code || params?.code || '';

                if (onEvaluate) {
                    onEvaluate(code);
                }

                // In a real scenario, we might wait for tests to complete
                // For now, acknowledgement
                await invoke('submit_mcp_response', {
                    id,
                    result: {
                        status: 'evaluating',
                        message: 'Code received for evaluation'
                    }
                });
            } else if (method === 'notebook_start') {
                // Pass the params (question data) to the app
                // The params structure depends on what the agent sends.
                // Usually: { topic: "React", difficulty: "Medium", question: {...} }
                // We assume 'arguments' holds the payload if coming from MCP call
                const data = params?.arguments || params;

                if (onStart) {
                    onStart(data);
                }

                await invoke('submit_mcp_response', {
                    id,
                    result: {
                        status: 'started',
                        sessionId: 'tauri-session-dynamic'
                    }
                });
            }
        });

        return () => {
            unlisten.then(f => f());
        };
    }, [runTests, onStart, onEvaluate]);
}

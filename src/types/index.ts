export interface TestCase {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    input: any;
    expected: string;
}

export interface TestResult {
    testCase: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    input: any;
    expected: string | null;
    actual: string | null;
    passed: boolean;
    error: string | null;
    executionTime?: number;
}

export interface TestResultSummary {
    passed: number;
    failed: number;
    errors: number;
    totalTests: number;
    score: number;
    totalTime: number;
    testResults: TestResult[];
}

export interface Question {
    id: string;
    title: string;
    topic: string;
    difficulty: string;
    description: string;
    requirements: string[];
    testCases: TestCase[];
    starterCode?: string;
}

// Type for raw data from Rust/Tauri backend (snake_case)
export interface BackendQuestion {
    id?: string;
    title?: string;
    topic?: string;
    difficulty?: string;
    description?: string;
    requirements?: string[];
    testCases?: TestCase[];
    test_cases?: TestCase[]; // snake_case alternative
    starterCode?: string;
    starter_code?: string; // snake_case alternative
}

export interface McpRequestParams {
    code?: string;
    arguments?: {
        code?: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

export interface McpRequest {
    id: string;
    method: string;
    params: McpRequestParams;
}

export interface McpToolRequest {
    method: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params?: Record<string, any>;
}

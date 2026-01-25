import * as Babel from '@babel/standalone';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { TestCase, TestResultSummary, TestResult } from '../types';

export function runTests(code: string, testCases: TestCase[]): TestResultSummary {
    const results: TestResultSummary = {
        passed: 0,
        failed: 0,
        errors: 0,
        testResults: [],
        totalTime: 0,
        score: 0,
        totalTests: testCases.length,
    };

    try {
        // 1. Transpile User Code
        const transpiled = Babel.transform(code, {
            presets: ['react', 'env'],
            filename: 'solution.tsx',
        }).code;

        // 2. Capture the component from 'render' call
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let CapturedComponent: any = null;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mockRender = (element: any) => {
            CapturedComponent = element.type;
        };

        // 3. Execute User Code to register component
        // We pass React and our mock render
        const initFunction = new Function('React', 'render', transpiled!);
        initFunction(React, mockRender);

        if (!CapturedComponent) {
            throw new Error(
                'No component rendered. Make sure to call render(<YourComponent />) at the end.'
            );
        }

        // 4. Run Test Cases
        testCases.forEach((testCase: TestCase, index: number) => {
            const testResult: TestResult = {
                testCase: index,
                input: testCase.input,
                expected: testCase.expected,
                actual: '',
                passed: false,
                error: null,
                executionTime: 0,
            };

            try {
                const startTime = performance.now();

                // Create element with test props
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                let props: any = testCase.input;
                if (typeof props !== 'object' || props === null) {
                    // Heuristic: if generic single input, pass as 'initialSeconds' for this specific problem
                    props = { initialSeconds: testCase.input };
                }

                const element = React.createElement(CapturedComponent, props);
                const html = renderToStaticMarkup(element);

                // Extract text content
                const textContent = html
                    .replace(/<[^>]+>/g, ' ')
                    .replace(/\s+/g, ' ')
                    .trim();

                const endTime = performance.now();
                testResult.executionTime = endTime - startTime;
                results.totalTime += testResult.executionTime;

                testResult.actual = textContent;

                // Loose matching: check if expected string is IN output
                if (textContent.includes(testCase.expected)) {
                    testResult.passed = true;
                } else {
                    testResult.passed = false;
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
                testResult.error = err.toString();
                testResult.passed = false;
            }

            if (testResult.passed) results.passed++;
            else results.failed++;

            results.testResults.push(testResult);
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        // Global error (transpilation or execution)
        results.errors++;
        results.testResults.push({
            testCase: -1,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            input: null as any,
            expected: null,
            actual: null,
            passed: false,
            error: err.message,
        });
    }

    results.score =
        results.totalTests > 0 ? Math.round((results.passed / results.totalTests) * 100) : 0;

    return results;
}

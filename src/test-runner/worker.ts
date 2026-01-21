/* eslint-disable no-restricted-globals */
import * as Babel from '@babel/standalone';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

self.onmessage = (e: MessageEvent) => {
    const { code, testCases } = e.data;

    const results = {
        passed: 0,
        failed: 0,
        errors: 0,
        testResults: [] as any[],
        totalTime: 0,
        score: 0,
        totalTests: testCases.length
    };

    try {
        // 1. Transpile User Code
        const transpiled = Babel.transform(code, {
            presets: ['react', 'env'],
            filename: 'solution.tsx'
        }).code;

        // 2. Capture the component from 'render' call
        let CapturedComponent: any = null;
        const mockRender = (element: any) => {
            CapturedComponent = element.type;
        };

        // 3. Execute User Code to register component
        // We pass React and our mock render
        const initFunction = new Function('React', 'render', transpiled!);
        initFunction(React, mockRender);

        if (!CapturedComponent) {
            throw new Error('No component rendered. Make sure to call render(<YourComponent />) at the end.');
        }

        // 4. Run Test Cases
        testCases.forEach((testCase: any, index: number) => {
            const testResult = {
                testCase: index,
                input: testCase.input,
                expected: testCase.expected,
                actual: '',
                passed: false,
                error: null,
                executionTime: 0
            };

            try {
                const startTime = performance.now();

                // Create element with test props
                // Assuming input is the primary prop, or we map it
                // For the Timer example: input 10 -> initialSeconds={10}
                // We might need a smarter way to map input to props if complex
                // For now, based on the problem "Timer({ initialSeconds })", we assume input maps to specific props?
                // Or maybe testCase.input IS the props object?
                // In App.tsx: input: 10. The component takes { initialSeconds }.
                // So we should probably pass { initialSeconds: 10 }.
                // Let's assume input is the props object OR a single value mapping to the likely prop.
                // Current App.tsx test case: { input: 10, expected: 'Timer: 10' }
                // The component prop is initialSeconds.
                // WE NEED TO STANDARDIZE THIS.
                // For this specific fix, I will heuristically map if input is not an object.

                let props = testCase.input;
                if (typeof props !== 'object' || props === null) {
                    // Heuristic: if generic single input, pass as 'initialSeconds' for this specific problem
                    // ideally the test case definitions in session.json should be explicit props objects.
                    // For the specific Timer problem, let's map it.
                    props = { initialSeconds: testCase.input };
                }

                const element = React.createElement(CapturedComponent, props);
                const html = renderToStaticMarkup(element);

                // Helper to strip tags for text comparison if needed, but 'expected' is "Timer: 10" which typically matches text content
                // renderToStaticMarkup returns <div><h3>Timer: 10</h3>...
                // We should extract text content.
                const textContent = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

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

            } catch (err: any) {
                testResult.error = err.toString();
                testResult.passed = false;
            }

            if (testResult.passed) results.passed++;
            else results.failed++;

            results.testResults.push(testResult);
        });

    } catch (err: any) {
        // Global error (transpilation or execution)
        results.errors++;
        results.testResults.push({
            testCase: -1,
            input: null,
            expected: null,
            actual: null,
            passed: false,
            error: err.message
        });
    }

    results.score = results.totalTests > 0 ? Math.round((results.passed / results.totalTests) * 100) : 0;

    self.postMessage(results);
};

#!/usr/bin/env node
/**
 * Test Runner for HackerRank Simulator
 * Executes user code against test cases in a sandboxed environment
 */

const vm = require('vm');
const fs = require('fs');

// Read arguments
const args = process.argv.slice(2);
const codeFile = args[0];
const testCasesFile = args[1];
const functionName = args[2] || 'solution';

if (!codeFile || !testCasesFile) {
    console.error('Usage: node test-runner.js <code-file> <test-cases-file> [function-name]');
    process.exit(1);
}

// Read files
const userCode = fs.readFileSync(codeFile, 'utf8');
const testCases = JSON.parse(fs.readFileSync(testCasesFile, 'utf8'));

// Results
const results = {
    totalTests: testCases.length,
    passed: 0,
    failed: 0,
    errors: 0,
    testResults: [],
    totalTime: 0
};

// Execute each test case
testCases.forEach((testCase, index) => {
    const testResult = {
        testCase: index,
        input: testCase.input,
        expected: testCase.expected,
        actual: null,
        passed: false,
        error: null,
        executionTime: 0
    };

    try {
        // Create sandbox context
        const sandbox = {
            console: {
                log: (...args) => { }, // Suppress logs during test
                error: (...args) => { }
            },
            result: null
        };

        // Wrap code to capture result
        const wrappedCode = `
      ${userCode}
      result = ${functionName}(${JSON.stringify(testCase.input)});
    `;

        // Execute with timeout
        const context = vm.createContext(sandbox);
        const startTime = process.hrtime.bigint();

        vm.runInContext(wrappedCode, context, {
            timeout: 5000, // 5 second timeout
            displayErrors: true
        });

        const endTime = process.hrtime.bigint();
        testResult.executionTime = Number(endTime - startTime) / 1e6; // Convert to ms
        results.totalTime += testResult.executionTime;

        // Compare result
        testResult.actual = sandbox.result;
        testResult.passed = JSON.stringify(sandbox.result) === JSON.stringify(testCase.expected);

        if (testResult.passed) {
            results.passed++;
        } else {
            results.failed++;
        }

    } catch (error) {
        testResult.error = error.message;
        results.errors++;
    }

    results.testResults.push(testResult);
});

// Calculate score
results.score = Math.round((results.passed / results.totalTests) * 100);

// Output results as JSON
console.log(JSON.stringify(results, null, 2));

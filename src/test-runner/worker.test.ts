import { describe, it, expect } from 'vitest';
import { runTests } from './logic';
import { TestCase } from '../types';

describe('Test Runner Logic', () => {
    const validCode = `
    function Hello({ name }) {
      return <div>Hello {name}</div>;
    }
    render(<Hello name="World" />);
    `;

    it('should pass a valid test case', () => {
        const testCases: TestCase[] = [
            { input: { name: 'Alice' }, expected: 'Hello Alice' }
        ];

        const result = runTests(validCode, testCases);
        expect(result.passed).toBe(1);
        expect(result.failed).toBe(0);
        expect(result.score).toBe(100);
        expect(result.testResults[0].passed).toBe(true);
        expect(result.testResults[0].actual).toContain('Hello Alice');
    });

    it('should fail an incorrect test case', () => {
        const testCases: TestCase[] = [
            { input: { name: 'Bob' }, expected: 'Hello Alice' } // Expecting Alice but getting Bob
        ];

        const result = runTests(validCode, testCases);
        expect(result.passed).toBe(0);
        expect(result.failed).toBe(1);
        expect(result.score).toBe(0);
        expect(result.testResults[0].passed).toBe(false);
        expect(result.testResults[0].actual).toContain('Hello Bob');
    });

    it('should handle syntax errors in user code', () => {
        const invalidCode = `function Broken() { return <div>; }`; // Syntax error
        const testCases: TestCase[] = [];

        const result = runTests(invalidCode, testCases);
        expect(result.errors).toBe(1);
        expect(result.testResults[0].error).toBeDefined();
    });

    it('should handle runtime errors in component', () => {
        const runtimeErrorCode = `
        function Broken() { throw new Error('Boom'); }
        render(<Broken />);
        `;
        const testCases: TestCase[] = [
            { input: {}, expected: 'Anything' }
        ];

        const result = runTests(runtimeErrorCode, testCases);
        // Runtime error during execution of test case
        expect(result.testResults[0].passed).toBe(false);
        expect(result.testResults[0].error).toContain('Boom');
    });

    it('should detect if no component is rendered', () => {
        const noRenderCode = `function Noop() {}`;
        const testCases: TestCase[] = [];
        const result = runTests(noRenderCode, testCases);
        expect(result.errors).toBe(1);
        expect(result.testResults[0].error).toContain('No component rendered');
    });
});

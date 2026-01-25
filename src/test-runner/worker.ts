
import { runTests } from './logic';

self.onmessage = (e: MessageEvent) => {
  const { code, testCases } = e.data;
  const results = runTests(code, testCases);
  self.postMessage(results);
};

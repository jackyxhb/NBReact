/**
 * NBReact Notebook Generator
 * Generates interactive notebook HTML from template and question data
 */

const fs = require('fs');
const path = require('path');

const TEMPLATE_PATH = path.join(__dirname, '..', 'templates', 'notebook-interactive.html');
const OUTPUT_PATH = path.join(__dirname, '..', '..', '..', '..', 'notebook', 'current.html');
const SESSION_PATH = path.join(
  __dirname,
  '..',
  '..',
  '..',
  '..',
  'practice',
  'current',
  'session.json'
);

/**
 * Generate notebook HTML with question data embedded
 * @param {Object} question - Question data
 * @param {Object} session - Session data
 * @returns {string} Generated HTML
 */
function generateNotebook(question, session) {
  let template = fs.readFileSync(TEMPLATE_PATH, 'utf-8');

  // Replace placeholders with actual data
  const replacements = {
    '{{TOPIC}}': session.topic || 'React',
    '{{DIFFICULTY}}': session.difficulty || 'Medium',
    '{{QUESTION_NUM}}': session.currentQuestion || 1,
    '{{TOTAL_QUESTIONS}}': session.questionsPerSession || 5,
    '{{TITLE}}': question.title || 'Loading...',
    '{{DESCRIPTION}}': question.description || '',
    '{{REQUIREMENTS}}': formatRequirements(question.requirements),
    '{{EXAMPLES}}': question.examples || '',
    '{{STARTER_CODE}}': escapeForJS(question.starterCode || '// Your code here\n'),
    '{{TEST_CASES}}': formatTestCases(question.testCases),
  };

  for (const [key, value] of Object.entries(replacements)) {
    template = template.replace(new RegExp(key, 'g'), value);
  }

  return template;
}

/**
 * Format requirements as HTML list
 */
function formatRequirements(requirements) {
  if (!requirements || !requirements.length) return '';
  return requirements.map((r) => `<li>${r}</li>`).join('\n');
}

/**
 * Format test cases as HTML
 */
function formatTestCases(testCases) {
  if (!testCases || !testCases.length) return '';
  return testCases
    .map(
      (tc, i) => `
        <div class="test-case">
            <div class="test-status"></div>
            <span>${tc.name || `Test ${i}`}</span>
        </div>
    `
    )
    .join('\n');
}

/**
 * Escape string for use in JavaScript
 */
function escapeForJS(str) {
  return str.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
}

/**
 * Write notebook to file
 */
function writeNotebook(html) {
  fs.writeFileSync(OUTPUT_PATH, html, 'utf-8');
  console.log(`✓ Notebook written to: ${OUTPUT_PATH}`);
}

/**
 * Load current session
 */
function loadSession() {
  try {
    return JSON.parse(fs.readFileSync(SESSION_PATH, 'utf-8'));
  } catch (e) {
    return null;
  }
}

// Export for use as module
module.exports = {
  generateNotebook,
  writeNotebook,
  loadSession,
  TEMPLATE_PATH,
  OUTPUT_PATH,
  SESSION_PATH,
};

// CLI usage
if (require.main === module) {
  const session = loadSession();
  if (!session) {
    console.error('No active session found. Start a session with /practice first.');
    process.exit(1);
  }

  console.log(`Session: ${session.sessionId}`);
  console.log(`Question: ${session.currentQuestion} of ${session.questionsPerSession}`);

  // For CLI, we just copy the template as-is since question data comes from Antigravity
  const template = fs.readFileSync(TEMPLATE_PATH, 'utf-8');
  writeNotebook(template);
}

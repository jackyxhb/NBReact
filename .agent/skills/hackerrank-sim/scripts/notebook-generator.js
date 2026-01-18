#!/usr/bin/env node
/**
 * Notebook Generator for HackerRank Simulator
 * Generates HTML notebook with question data
 */

const fs = require('fs');
const path = require('path');

// Template path
const TEMPLATE_PATH = path.join(__dirname, '../templates/notebook.html');
const OUTPUT_PATH = path.join(__dirname, '../../../../notebook/current.html');

/**
 * Generate a notebook with the given question data
 */
function generateNotebook(questionData) {
    // Read template
    let template = fs.readFileSync(TEMPLATE_PATH, 'utf8');

    // Inject question data
    const injectionScript = `
  <script>
    // Question data injected by generator
    window.questionData = ${JSON.stringify(questionData, null, 2)};
    
    // Populate UI on load
    document.addEventListener('DOMContentLoaded', function() {
      const q = window.questionData;
      
      // Set title
      document.getElementById('problemTitle').textContent = q.title;
      
      // Set problem statement
      document.getElementById('problemStatement').innerHTML = q.statement;
      
      // Set constraints
      const constraintsList = document.getElementById('constraints');
      constraintsList.innerHTML = q.constraints
        .map(c => '<li>• ' + c + '</li>')
        .join('');
      
      // Set sample input/output
      document.getElementById('sampleInput').textContent = q.sampleInput;
      document.getElementById('sampleOutput').textContent = q.sampleOutput;
      
      // Set explanation
      document.getElementById('explanation').innerHTML = q.explanation;
      
      // Set starter code
      if (window.editor && q.starterCode) {
        editor.setValue(q.starterCode);
      }
      
      // Set test cases
      const testCasesContainer = document.getElementById('testCases');
      testCasesContainer.innerHTML = q.testCases
        .map((tc, i) => 
          '<div class="test-case" data-case="' + i + '">' +
          '<div class="test-status"></div>' +
          '<span>Test Case ' + i + (tc.hidden ? ' (Hidden)' : '') + '</span>' +
          '</div>'
        )
        .join('');
      
      // Set question number
      document.getElementById('questionNum').textContent = 
        'Q' + q.questionNumber + ' of ' + q.totalQuestions;
      
      // Enable/disable timer
      if (q.timerEnabled) {
        document.getElementById('timer').classList.remove('hidden');
        startTimer(true);
      }
      
      // Theme
      if (q.theme === 'light') {
        document.body.classList.add('light-theme');
      }
    });
  </script>
  `;

    // Inject before closing body tag
    template = template.replace('</body>', injectionScript + '\n</body>');

    // Ensure output directory exists
    const outputDir = path.dirname(OUTPUT_PATH);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write output
    fs.writeFileSync(OUTPUT_PATH, template);

    return OUTPUT_PATH;
}

// Export for use
module.exports = { generateNotebook };

// CLI interface
if (require.main === module) {
    const questionFile = process.argv[2];

    if (!questionFile) {
        console.log('Usage: notebook-generator.js <question-data.json>');
        process.exit(1);
    }

    const questionData = JSON.parse(fs.readFileSync(questionFile, 'utf8'));
    const outputPath = generateNotebook(questionData);
    console.log('Generated notebook:', outputPath);
}

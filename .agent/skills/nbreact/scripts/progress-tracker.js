#!/usr/bin/env node
/**
 * Progress Tracker for HackerRank Simulator
 * Manages score history and generates analytics
 */

const fs = require('fs');
const path = require('path');

const HISTORY_FILE = path.join(__dirname, '../../../../progress/history.json');
const TOKEN_FILE = path.join(__dirname, '../../../../progress/token-usage.json');

// Load or initialize history
function loadHistory() {
    try {
        return JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf8'));
    } catch {
        return {
            sessions: [],
            totalQuestions: 0,
            totalSessions: 0,
            topicStats: {},
            difficultyStats: {
                easy: { attempted: 0, totalScore: 0 },
                medium: { attempted: 0, totalScore: 0 },
                hard: { attempted: 0, totalScore: 0 }
            },
            lastUpdated: null
        };
    }
}

// Save history
function saveHistory(history) {
    history.lastUpdated = new Date().toISOString();
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));
}

// Record a question attempt
function recordAttempt(topic, difficulty, score, timeSpent) {
    const history = loadHistory();

    // Update totals
    history.totalQuestions++;

    // Update topic stats
    if (!history.topicStats[topic]) {
        history.topicStats[topic] = { attempted: 0, totalScore: 0, avgScore: 0 };
    }
    history.topicStats[topic].attempted++;
    history.topicStats[topic].totalScore += score;
    history.topicStats[topic].avgScore = Math.round(
        history.topicStats[topic].totalScore / history.topicStats[topic].attempted
    );

    // Update difficulty stats
    const diff = difficulty.toLowerCase();
    if (history.difficultyStats[diff]) {
        history.difficultyStats[diff].attempted++;
        history.difficultyStats[diff].totalScore += score;
    }

    saveHistory(history);
    return history;
}

// Record session completion
function recordSession(sessionData) {
    const history = loadHistory();

    history.totalSessions++;
    history.sessions.push({
        date: new Date().toISOString(),
        topic: sessionData.topic,
        questionsAttempted: sessionData.questions.length,
        averageScore: sessionData.averageScore,
        timeSpent: sessionData.timeSpent
    });

    // Keep only last 100 sessions
    if (history.sessions.length > 100) {
        history.sessions = history.sessions.slice(-100);
    }

    saveHistory(history);
    return history;
}

// Generate analytics report
function generateReport() {
    const history = loadHistory();

    // Calculate weak areas
    const weakAreas = Object.entries(history.topicStats)
        .filter(([_, stats]) => stats.avgScore < 70)
        .sort((a, b) => a[1].avgScore - b[1].avgScore)
        .map(([topic, stats]) => ({ topic, avgScore: stats.avgScore }));

    // Calculate strong areas
    const strongAreas = Object.entries(history.topicStats)
        .filter(([_, stats]) => stats.avgScore >= 80)
        .sort((a, b) => b[1].avgScore - a[1].avgScore)
        .map(([topic, stats]) => ({ topic, avgScore: stats.avgScore }));

    // Score trends (last 10 sessions)
    const recentSessions = history.sessions.slice(-10);
    const scoreTrend = recentSessions.map(s => s.averageScore);

    // Calculate if improving
    let trendDirection = 'stable';
    if (scoreTrend.length >= 3) {
        const firstHalf = scoreTrend.slice(0, Math.floor(scoreTrend.length / 2));
        const secondHalf = scoreTrend.slice(Math.floor(scoreTrend.length / 2));
        const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
        const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;

        if (secondAvg > firstAvg + 5) trendDirection = 'improving';
        else if (secondAvg < firstAvg - 5) trendDirection = 'declining';
    }

    return {
        totalQuestions: history.totalQuestions,
        totalSessions: history.totalSessions,
        overallAverage: calculateOverallAverage(history),
        topicStats: history.topicStats,
        difficultyStats: history.difficultyStats,
        weakAreas,
        strongAreas,
        trendDirection,
        recentScores: scoreTrend,
        lastUpdated: history.lastUpdated
    };
}

function calculateOverallAverage(history) {
    const total = Object.values(history.topicStats)
        .reduce((sum, stats) => sum + stats.totalScore, 0);
    return history.totalQuestions > 0
        ? Math.round(total / history.totalQuestions)
        : 0;
}

// Export for use
module.exports = {
    loadHistory,
    saveHistory,
    recordAttempt,
    recordSession,
    generateReport
};

// CLI interface
if (require.main === module) {
    const command = process.argv[2];

    switch (command) {
        case 'report':
            console.log(JSON.stringify(generateReport(), null, 2));
            break;
        case 'record':
            const [_, __, ___, topic, difficulty, score, time] = process.argv;
            recordAttempt(topic, difficulty, parseInt(score), parseInt(time));
            console.log('Recorded successfully');
            break;
        default:
            console.log('Usage: progress-tracker.js [report|record]');
    }
}

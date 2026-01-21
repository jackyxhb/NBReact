/**
 * NBReact Bridge Server
 * 
 * Simple local server that bridges the notebook webpage to the file system.
 * The notebook sends requests to this server, which writes to request.json.
 * The server polls response.json and sends responses back.
 * 
 * Usage: node bridge-server.js
 * Then open: http://localhost:3456/notebook
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3456;
const NOTEBOOK_DIR = path.join(__dirname, '..', '..', '..', '..', 'notebook');
const REQUEST_FILE = path.join(NOTEBOOK_DIR, 'request.json');
const RESPONSE_FILE = path.join(NOTEBOOK_DIR, 'response.json');
const INTERACTIVE_HTML = path.join(NOTEBOOK_DIR, 'interactive.html');

// Track last processed request to avoid duplicates
let lastRequestId = null;

const server = http.createServer((req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    const url = new URL(req.url, `http://localhost:${PORT}`);

    // Serve the notebook
    if (url.pathname === '/notebook' || url.pathname === '/') {
        fs.readFile(INTERACTIVE_HTML, 'utf-8', (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end('Notebook not found');
                return;
            }

            // Inject the bridge script into the notebook
            const bridgeScript = `
<script>
// Override the file-based communication with HTTP
const BRIDGE_URL = 'http://localhost:${PORT}';

async function writeRequestFile(request) {
    try {
        const response = await fetch(BRIDGE_URL + '/api/request', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        });
        console.log('Request sent to bridge:', request);
        return true;
    } catch (error) {
        console.error('Bridge error:', error);
        return false;
    }
}

async function checkResponse(requestId) {
    try {
        const response = await fetch(BRIDGE_URL + '/api/response?id=' + requestId);
        if (response.ok) {
            const data = await response.json();
            if (data && data.id === requestId) {
                console.log('Response received from bridge:', data);
                return data;
            }
        }
    } catch (error) {
        // Polling, ignore errors
    }
    return null;
}

console.log('🔌 NBReact Bridge connected to ' + BRIDGE_URL);
</script>
`;
            // Insert bridge script before closing body tag
            const modifiedHtml = data.replace('</body>', bridgeScript + '</body>');

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(modifiedHtml);
        });
        return;
    }

    // API: Receive request from notebook
    if (url.pathname === '/api/request' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const request = JSON.parse(body);
                fs.writeFileSync(REQUEST_FILE, JSON.stringify(request, null, 2));
                console.log(`📥 Request received: ${request.type} (${request.id})`);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true }));
            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: error.message }));
            }
        });
        return;
    }

    // API: Poll for response
    if (url.pathname === '/api/response' && req.method === 'GET') {
        const requestId = url.searchParams.get('id');

        try {
            const data = fs.readFileSync(RESPONSE_FILE, 'utf-8');
            const response = JSON.parse(data);

            if (response && response.id === requestId) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(response));
            } else {
                res.writeHead(204);
                res.end();
            }
        } catch (error) {
            res.writeHead(204);
            res.end();
        }
        return;
    }

    // API: Get current request (for Antigravity to poll)
    if (url.pathname === '/api/current-request' && req.method === 'GET') {
        try {
            const data = fs.readFileSync(REQUEST_FILE, 'utf-8');
            const request = JSON.parse(data);

            if (request && request.id && request.id !== lastRequestId) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(request));
            } else {
                res.writeHead(204);
                res.end();
            }
        } catch (error) {
            res.writeHead(204);
            res.end();
        }
        return;
    }

    // API: Mark request as processed
    if (url.pathname === '/api/mark-processed' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const { id } = JSON.parse(body);
                lastRequestId = id;
                res.writeHead(200);
                res.end(JSON.stringify({ success: true }));
            } catch (error) {
                res.writeHead(400);
                res.end();
            }
        });
        return;
    }

    // 404
    res.writeHead(404);
    res.end('Not found');
});

server.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════════════╗
║           🧪 NBReact Bridge Server                    ║
╠═══════════════════════════════════════════════════════╣
║                                                       ║
║   Notebook:  http://localhost:${PORT}/notebook            ║
║   API:       http://localhost:${PORT}/api                 ║
║                                                       ║
║   The bridge connects the notebook to Antigravity.    ║
║   Keep this server running while practicing.          ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
`);
});

// Handle shutdown
process.on('SIGINT', () => {
    console.log('\n👋 Bridge server shutting down...');
    process.exit(0);
});

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.PORT) || 5000;
const DATA_DIR = path.join(__dirname, 'data');
const HOMEPAGE_FILE = path.join(DATA_DIR, 'homepage.json');
const SUBMISSIONS_FILE = path.join(DATA_DIR, 'submissions.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  response.end(JSON.stringify(payload));
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2));
}

function parseBody(request) {
  return new Promise((resolve, reject) => {
    let body = '';

    request.on('data', (chunk) => {
      body += chunk;

      if (body.length > 1_000_000) {
        reject(new Error('Request body too large'));
        request.destroy();
      }
    });

    request.on('end', () => {
      if (!body) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(new Error('Invalid JSON payload'));
      }
    });

    request.on('error', reject);
  });
}

function normalizeText(value) {
  return String(value || '').trim();
}

function requireFields(payload, fields) {
  const missing = fields.filter((field) => !normalizeText(payload[field]));

  if (missing.length > 0) {
    return `Missing required fields: ${missing.join(', ')}`;
  }

  return null;
}

function getHomepagePayload() {
  const homepage = readJson(HOMEPAGE_FILE);
  const submissions = readJson(SUBMISSIONS_FILE);

  return {
    ...homepage,
    stats: {
      demoRequests: submissions.demoRequests.length,
      contactMessages: submissions.contactMessages.length,
      successfulLogins: submissions.loginEvents.length,
    },
  };
}

function appendSubmission(section, record) {
  const submissions = readJson(SUBMISSIONS_FILE);
  submissions[section].push(record);
  writeJson(SUBMISSIONS_FILE, submissions);
}

async function handleRequest(request, response) {
  const requestUrl = new URL(request.url, `http://${request.headers.host}`);
  const { pathname } = requestUrl;

  if (request.method === 'OPTIONS') {
    sendJson(response, 204, {});
    return;
  }

  if (request.method === 'GET' && pathname === '/api/health') {
    sendJson(response, 200, {
      ok: true,
      timestamp: new Date().toISOString(),
    });
    return;
  }

  if (request.method === 'GET' && pathname === '/api/homepage') {
    sendJson(response, 200, getHomepagePayload());
    return;
  }

  if (request.method === 'POST' && pathname === '/api/demo') {
    const payload = await parseBody(request);
    const error = requireFields(payload, ['name', 'email', 'company', 'message']);

    if (error) {
      sendJson(response, 400, { ok: false, message: error });
      return;
    }

    appendSubmission('demoRequests', {
      id: `demo-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      name: normalizeText(payload.name),
      email: normalizeText(payload.email),
      company: normalizeText(payload.company),
      message: normalizeText(payload.message),
    });

    sendJson(response, 201, {
      ok: true,
      message: 'Demo request received. Our team will contact you shortly.',
    });
    return;
  }

  if (request.method === 'POST' && pathname === '/api/contact') {
    const payload = await parseBody(request);
    const error = requireFields(payload, ['name', 'email', 'company', 'message']);

    if (error) {
      sendJson(response, 400, { ok: false, message: error });
      return;
    }

    appendSubmission('contactMessages', {
      id: `contact-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      name: normalizeText(payload.name),
      email: normalizeText(payload.email),
      company: normalizeText(payload.company),
      message: normalizeText(payload.message),
    });

    sendJson(response, 201, {
      ok: true,
      message: 'Message sent. We will respond to your team soon.',
    });
    return;
  }

  if (request.method === 'POST' && pathname === '/api/login') {
    const payload = await parseBody(request);
    const error = requireFields(payload, ['email', 'password']);

    if (error) {
      sendJson(response, 400, { ok: false, message: error });
      return;
    }

    const users = readJson(USERS_FILE);
    const user = users.find(
      (entry) =>
        entry.email.toLowerCase() === normalizeText(payload.email).toLowerCase() &&
        entry.password === normalizeText(payload.password)
    );

    if (!user) {
      sendJson(response, 401, {
        ok: false,
        message: 'Invalid credentials. Use one of the demo accounts.',
      });
      return;
    }

    appendSubmission('loginEvents', {
      id: `login-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      email: user.email,
      role: user.role,
    });

    sendJson(response, 200, {
      ok: true,
      message: `Welcome back, ${user.name}.`,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
    return;
  }

  sendJson(response, 404, {
    ok: false,
    message: 'Route not found',
  });
}

const server = http.createServer((request, response) => {
  handleRequest(request, response).catch((error) => {
    sendJson(response, 500, {
      ok: false,
      message: error.message || 'Unexpected server error',
    });
  });
});

server.listen(PORT, () => {
  console.log(`AgriChain backend listening on http://localhost:${PORT}`);
});

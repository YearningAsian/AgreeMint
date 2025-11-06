// Minimal server to proxy requests to Google Generative AI (Gemini) model
// Reads GEMINI_API_KEY from environment. Do NOT commit your API key.

import http from 'http';
import { URL } from 'url';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// If a .env file exists in the project root, load it so local development
// can set GEMINI_API_KEY without exporting environment variables manually.
const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  console.log('Loading .env from', envPath);
  dotenv.config({ path: envPath });
}

const PORT = process.env.PORT || 3000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.warn('Warning: GEMINI_API_KEY not set. Set it in environment when running the server.');
}

console.log('Node version:', process.version);

function sendJson(res, status, obj) {
  res.writeHead(status, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
  res.end(JSON.stringify(obj));
}

async function callGemini(prompt) {
  // Using Google Generative Language API v1beta endpoint with generateContent (works with API keys)
  const model = 'gemini-2.5-pro';
  const baseUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

  // Prefer a bearer token if provided (useful for service accounts / ADC). Otherwise fall back to API key.
  const BEARER = process.env.GEMINI_BEARER_TOKEN;
  const url = BEARER ? baseUrl : `${baseUrl}${GEMINI_API_KEY ? `?key=${GEMINI_API_KEY}` : ''}`;

  // Construct body with the v1beta API schema
  const body = {
    contents: [{
      parts: [{
        text: prompt
      }]
    }],
    generationConfig: {
      temperature: 0.2,
      maxOutputTokens: 2048
    }
  };

  // Ensure fetch is available (Node 18+). If not, return a helpful error.
  if (typeof fetch !== 'function') {
    throw new Error('Global fetch is not available in this Node version. Use Node 18+ or install a fetch polyfill.');
  }

  console.log('Calling Gemini model:', model);
  console.log('Request URL:', url);

  const headers = { 'Content-Type': 'application/json' };
  if (BEARER) headers['Authorization'] = `Bearer ${BEARER}`;

  const resp = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  });

  const respText = await resp.text();
  let data = null;
  try {
    data = JSON.parse(respText);
  } catch (e) {
    // leave data as null
  }

  if (!resp.ok) {
    console.error('Gemini API returned error', resp.status, respText || JSON.stringify(data));
    throw new Error(`Gemini API error: ${resp.status} ${respText || JSON.stringify(data)}`);
  }

  // Parse v1 API response shape: { candidates: [{ content: { parts: [{ text: '...' }] } }] }
  if (data && Array.isArray(data.candidates) && data.candidates.length > 0) {
    const candidate = data.candidates[0];
    if (candidate.content && Array.isArray(candidate.content.parts)) {
      const textParts = candidate.content.parts
        .map(p => p.text || '')
        .filter(Boolean);
      if (textParts.length) return textParts.join('\n');
    }
  }

  // Fallback: return raw text or JSON
  console.warn('Unexpected response shape:', data);
  return respText || JSON.stringify(data);
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return res.end();
  }

  if (req.method === 'POST' && url.pathname === '/api/analyze') {
    try {
      let body = '';
      for await (const chunk of req) body += chunk;
      const json = JSON.parse(body || '{}');
      const text = json.text;
      if (!text) return sendJson(res, 400, { error: 'Missing text in request body' });
      if (!GEMINI_API_KEY) return sendJson(res, 500, { error: 'Server: GEMINI_API_KEY not configured' });

      const analysis = await callGemini(text);
      return sendJson(res, 200, { analysis });
    } catch (err) {
      console.error('Analyze error', err);
      return sendJson(res, 500, { error: String(err) });
    }
  }

  // Simple health route
  if (req.method === 'GET' && url.pathname === '/api/health') {
    return sendJson(res, 200, { status: 'ok' });
  }

  sendJson(res, 404, { error: 'Not found' });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

const http = require('http');
const https = require('https');

http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');

  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  if (req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true, service: 'Anthropic Proxy' }));
    return;
  }

  if (req.method !== 'POST') { res.writeHead(405); res.end(); return; }

  let body = '';
  req.on('data', d => body += d);
  req.on('end', () => {
    const buf = Buffer.from(body, 'utf8');
    const opts = {
      hostname: 'api.anthropic.com',
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': buf.length,
        'x-api-key': process.env.ANTHROPIC_KEY,
        'anthropic-version': '2023-06-01'
      }
    };
    const r = https.request(opts, pr => {
      res.writeHead(pr.statusCode, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      pr.pipe(res);
    });
    r.on('error', e => {
      if (!res.headersSent) res.writeHead(500);
      res.end(JSON.stringify({ error: e.message }));
    });
    r.write(buf);
    r.end();
  });
}).listen(process.env.PORT || 3000, () =>
  console.log('Proxy ready, key:', !!process.env.ANTHROPIC_KEY)
);

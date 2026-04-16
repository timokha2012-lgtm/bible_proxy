const http = require('http');
const https = require('https');

http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-api-key');
  if (req.method === 'OPTIONS') { res.writeHead(200); res.end(); return; }
  if (req.method !== 'POST') { res.writeHead(200); res.end('OK'); return; }

  let body = '';
  req.on('data', d => body += d);
  req.on('end', () => {
    const opts = {
      hostname: 'api.anthropic.com',
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_KEY,
        'anthropic-version': '2023-06-01'
      }
    };
    const r = https.request(opts, pr => {
      res.writeHead(pr.statusCode, {'Content-Type': 'application/json'});
      pr.pipe(res);
    });
    r.on('error', e => { res.writeHead(500); res.end(JSON.stringify({error: e.message})); });
    r.write(body);
    r.end();
  });
}).listen(process.env.PORT || 3000, () => console.log('OK'));

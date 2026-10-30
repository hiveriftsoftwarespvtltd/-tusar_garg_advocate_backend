const https = require('https');
const http = require('http');

function checkUrl(urlStr) {
  return new Promise((resolve) => {
    try {
      const parsed = new URL(urlStr);
      const mod = parsed.protocol === 'https:' ? https : http;
      const req = mod.request(urlStr, { method: 'GET', headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }, timeout: 6000 }, (res) => {
        resolve({ url: urlStr, status: res.statusCode });
      });
      req.on('error', (e) => resolve({ url: urlStr, status: 'ERR: ' + e.message }));
      req.on('timeout', () => { req.destroy(); resolve({ url: urlStr, status: 'TIMEOUT' }); });
      req.end();
    } catch(e) {
      resolve({ url: urlStr, status: 'INVALID' });
    }
  });
}

async function testAll() {
  const tests = [
    'https://allahabadhighcourt.in/causelist/',
    'https://allahabadhighcourt.in/casestatus/',
    'https://allahabadhighcourt.in/judgment/',
    'https://delhihighcourt.nic.in/causelist',
    'https://delhihighcourt.nic.in/case-status',
    'https://delhihighcourt.nic.in/',
    'https://highcourtchd.gov.in/',
    'https://bombayhighcourt.nic.in/',
    'https://hcraj.nic.in/',
    'https://patnahighcourt.gov.in/',
    'https://mphc.gov.in/',
    'https://gujarathighcourt.nic.in/',
    'https://calcuttahighcourt.gov.in/',
    'https://karnatakahighcourt.kar.nic.in/',
    'https://hcmadras.tn.gov.in/',
    'https://tshc.gov.in/',
    'https://hckerala.gov.in/',
    'https://services.ecourts.gov.in/ecourtindia_v6/'
  ];

  for (const url of tests) {
    const r = await checkUrl(url);
    console.log(`${r.status} -> ${r.url}`);
  }
}
testAll();

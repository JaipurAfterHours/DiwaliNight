// /api/submit.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'error', message: 'Method not allowed' });
  }

  try {
    const response = await fetch(
      'https://script.google.com/macros/s/AKfycbwI56sGr98U4Qbk3FGrPnImWOwnL4tM2NSh-du-IsMZ/exec', // <-- replace with your Apps Script URL
      {
        method: 'POST',
        body: JSON.stringify(req.body),
        headers: { 'Content-Type': 'application/json' }
      }
    );

    const data = await response.json();
    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
}


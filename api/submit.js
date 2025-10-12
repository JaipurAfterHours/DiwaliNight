// /api/submit.js

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ status: 'error', message: 'Method not allowed' });
    }

    const data = req.body;
    console.log("Received data:", data);

    // Check required fields
    const { main_name, main_instagram, main_mobile, main_email, main_gender, upiTxn, totalAmount, guests, screenshotBase64, screenshotName } = data;
    if (!main_name || !main_instagram || !main_mobile || !main_email || !main_gender || !upiTxn || !totalAmount || !screenshotBase64) {
      return res.status(400).json({ status: 'error', message: 'Missing required fields' });
    }

    // If you want, upload the screenshot to Google Drive via Apps Script Web App
    // e.g., call your Apps Script endpoint with fetch

    // Simulate success for now
    return res.status(200).json({ status: 'success', message: 'Form submitted' });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
}


// /api/submit.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { main_name, main_instagram, main_mobile, main_email, main_gender, upiTxn, totalAmount, guests, screenshotBase64, screenshotName } = req.body;

    if (!main_name || !main_instagram || !main_mobile || !main_email || !main_gender || !upiTxn) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Send to Apps Script
    const appsScriptUrl = "https://script.google.com/macros/s/AKfycbx3-QYImVQGlTdY6J9Plhr72_l-a2t03E3PUx_ZvnZRk4vUsS4ITwqmwFYBqNLEvLKi/exec";
    const gsRes = await fetch(appsScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ main_name, main_instagram, main_mobile, main_email, main_gender, upiTxn, totalAmount, guests, screenshotBase64, screenshotName })
    });

    const data = await gsRes.json();
    return res.status(200).json(data);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server Error", message: err.message });
  }
}





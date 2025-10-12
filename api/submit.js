// /api/submit.js

export default async function handler(req, res) {
  try {
    // Only allow POST requests
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    // Get data from request body
    const {
      main_name,
      main_instagram,
      main_mobile,
      main_email,
      main_gender,
      upiTxn,
      totalAmount,
      guests,
      screenshotBase64,
      screenshotName
    } = req.body;

    // Validate required fields
    if (!main_name || !main_instagram || !main_mobile || !main_email || !main_gender || !upiTxn) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Post to Google Apps Script
    const appsScriptUrl = "YOUR_APPS_SCRIPT_EXEC_URL"; // replace with your script URL
    const response = await fetch(appsScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        main_name,
        main_instagram,
        main_mobile,
        main_email,
        main_gender,
        upiTxn,
        totalAmount,
        guests,
        screenshotBase64,
        screenshotName
      })
    });

    const data = await response.json();

    return res.status(200).json(data);

  } catch (err) {
    console.error("Vercel Function Error:", err);
    return res.status(500).json({ error: "Internal Server Error", message: err.message });
  }
}

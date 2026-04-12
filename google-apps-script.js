// ============================================================
// Cadence Waitlist — Google Apps Script
// ============================================================
// SETUP:
//   1. Create a new Google Sheet
//   2. Name the first sheet "Waitlist"
//   3. Add headers in row 1: Email | Timestamp | Source
//   4. Go to Extensions → Apps Script
//   5. Paste this entire file, replacing any existing code
//   6. Click Deploy → New deployment
//      - Type: Web app
//      - Execute as: Me
//      - Who has access: Anyone
//   7. Copy the deployment URL
//   8. Paste it into Landing Page.html as APPS_SCRIPT_URL
// ============================================================

const SHEET_NAME = "Waitlist";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const email = (data.email || "").trim().toLowerCase();

    if (!email || !email.includes("@")) {
      return _json({ ok: false, error: "Invalid email" });
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    // Check for duplicates
    const emails = sheet.getRange("A2:A" + sheet.getLastRow()).getValues().flat();
    if (emails.includes(email)) {
      return _json({ ok: true, duplicate: true, count: emails.length });
    }

    // Append new row
    sheet.appendRow([
      email,
      new Date().toISOString(),
      data.source || "landing-page"
    ]);

    const count = sheet.getLastRow() - 1; // minus header

    return _json({ ok: true, count: count });
  } catch (err) {
    return _json({ ok: false, error: err.message });
  }
}

function doGet(e) {
  // Returns current waitlist count (for the counter on the page)
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const count = Math.max(0, sheet.getLastRow() - 1);
    return _json({ ok: true, count: count });
  } catch (err) {
    return _json({ ok: false, error: err.message });
  }
}

function _json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

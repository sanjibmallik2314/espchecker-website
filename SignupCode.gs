// SignupCode.gs
// Paste into a NEW Apps Script project bound to a NEW Google Sheet
// (kept separate from the ESPChecker leaderboard Sheet — this one is for
// marketing/signup data, not gameplay data).
//
// Deploy: Deploy → New deployment → Type: Web app
//   Execute as: Me
//   Who has access: Anyone
// Copy the resulting /exec URL and paste it into signup.html's SCRIPT_URL.
//
// Creates a "Signups" tab automatically on first submission.

function doPost(e) {
  const body = JSON.parse(e.postData.contents);
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  let sheet = ss.getSheetByName('Signups');
  if (!sheet) {
    sheet = ss.insertSheet('Signups');
    sheet.appendRow(['email', 'os', 'timestamp']);
  }
  sheet.appendRow([body.email, body.os, body.timestamp]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

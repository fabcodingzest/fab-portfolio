/**
 * Google Apps Script for the portfolio contact form.
 * Writes each message into the next empty row of the sheet and emails you a copy.
 *
 * Setup (about 5 minutes):
 *  1. Create a Google Sheet with a tab named "Messages" and this header row:
 *       S no. | Date | Name | Email | Message
 *     S no. can be pre-filled (1, 2, 3...) down the sheet; each message fills the
 *     first row whose Date is empty, and new rows are numbered if it runs out.
 *  2. In the sheet: Extensions > Apps Script. Replace the code with this file. Save.
 *  3. Project Settings (gear) > Script properties > Add property:
 *       CONTACT_SECRET = <a long random string>
 *     Use the same value for CONTACT_WEBHOOK_SECRET in the site's .env.local.
 *  4. Deploy > New deployment > type "Web app".
 *       Execute as: Me
 *       Who has access: Anyone
 *     Authorise when asked, then copy the Web app URL into CONTACT_WEBHOOK_URL.
 *  5. If you change this code later: Deploy > Manage deployments > edit > New version.
 */

const NOTIFY_EMAIL = "fabrizvi786@gmail.com";

// Column positions in the "Messages" tab (A = 1).
const COL = { sno: 1, date: 2 }; // Name, Email, Message follow Date in C, D, E

/** First row below the header whose Date cell is empty, or the next new row. */
function firstEmptyRow(sheet) {
  const last = sheet.getLastRow();
  if (last < 2) return 2;
  const dates = sheet.getRange(2, COL.date, last - 1, 1).getValues();
  const i = dates.findIndex((r) => r[0] === "");
  return i === -1 ? last + 1 : i + 2;
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const secret = PropertiesService.getScriptProperties().getProperty("CONTACT_SECRET");
    if (!secret || data.secret !== secret) return json({ ok: false, error: "unauthorised" });

    const name = String(data.name || "").slice(0, 100);
    const email = String(data.email || "").slice(0, 200);
    const message = String(data.message || "").slice(0, 5000);

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Messages");
    if (!sheet) return json({ ok: false, error: 'No tab named "Messages"' });
    // Leading apostrophe stops a message starting with "=" being read as a formula.
    const safe = (v) => (/^[=+\-@]/.test(v) ? "'" + v : v);

    // One message at a time, so two submissions can't claim the same row.
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const row = firstEmptyRow(sheet);
      if (sheet.getRange(row, COL.sno).getValue() === "") sheet.getRange(row, COL.sno).setValue(row - 1);
      sheet.getRange(row, COL.date, 1, 4).setValues([[new Date(), safe(name), safe(email), safe(message)]]);
    } finally {
      lock.releaseLock();
    }

    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      replyTo: email,
      subject: "Portfolio message from " + name,
      body: message + "\n\n— " + name + " <" + email + ">",
    });

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

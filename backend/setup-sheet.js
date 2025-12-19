import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});

const sheets = google.sheets('v4');

async function setupSheet() {
  try {
    // Add headers to the sheet
    await sheets.spreadsheets.values.update({
      auth: oauth2Client,
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A1:D1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [['Email', 'Date', 'Source', 'Status']],
      },
    });
    
    console.log('✅ Sheet headers set up successfully!');
    console.log('Your newsletter service is ready to use.');
  } catch (error) {
    console.error('❌ Error setting up sheet:', error);
  }
}

setupSheet();
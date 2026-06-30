import { google } from 'googleapis';

class NewsletterService {
  constructor() {
    this.sheets = google.sheets('v4');
    this.oauth2Client = null;
  }

  async getAuth() {
    if (this.oauth2Client) return this.oauth2Client;

    try {
      // Validate required environment variables
      const requiredVars = ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'GOOGLE_REFRESH_TOKEN'];
      const missing = requiredVars.filter(v => !process.env[v]);
      
      if (missing.length > 0) {
        throw new Error(`Missing environment variables: ${missing.join(', ')}`);
      }

      this.oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URI
      );

      this.oauth2Client.setCredentials({
        refresh_token: process.env.GOOGLE_REFRESH_TOKEN
      });

      return this.oauth2Client;
    } catch (error) {
      console.error('Error setting up Google Sheets OAuth:', error);
      throw new Error('Failed to authenticate with Google Sheets');
    }
  }

  async subscribe(email, sourceLog) {
    try {
      const auth = await this.getAuth();

      // Check if email already exists
      const existingCheck = await this.sheets.spreadsheets.values.get({
        auth,
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: 'Sheet1!A:A',
      });

      const existingEmails = existingCheck.data.values || [];
      const emailExists = existingEmails.some(row => row[0] === email);

      if (emailExists) {
        return { success: false, message: 'Email already subscribed' };
      }

      // Add new subscription
      await this.sheets.spreadsheets.values.append({
        auth,
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: 'Sheet1!A:D',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[
            email,
            new Date().toISOString(),
            sourceLog,
            'Active'
          ]],
        },
      });

      return { success: true, message: 'Subscribed successfully!' };
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      throw error;
    }
  }

  async savePhone(phone, source) {
    try {
      const auth = await this.getAuth();

      // Check if phone already exists in Sheet2
      let existingPhones = [];
      try {
        const existingCheck = await this.sheets.spreadsheets.values.get({
          auth,
          spreadsheetId: process.env.GOOGLE_SHEET_ID,
          range: 'Sheet2!A:A',
        });
        existingPhones = existingCheck.data.values || [];
      } catch (e) {
        // Sheet2 might not exist yet, that's okay
      }

      const phoneExists = existingPhones.some(row => row[0] === phone);

      if (phoneExists) {
        return { success: false, message: 'Phone number already saved' };
      }

      // Add phone number to Sheet2
      await this.sheets.spreadsheets.values.append({
        auth,
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: 'Sheet2!A:D',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[
            phone,
            new Date().toISOString(),
            source || 'discount_modal',
            'KORZI650'
          ]],
        },
      });

      return { success: true, message: 'Phone number saved successfully!' };
    } catch (error) {
      console.error('Error saving phone number:', error);
      throw error;
    }
  }
}

export default new NewsletterService();

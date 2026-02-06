/**
 * AGENZ LEAD CAPTURE - Google Apps Script
 *
 * SETUP INSTRUCTIONS:
 *
 * 1. Go to https://script.google.com/
 * 2. Click "New Project"
 * 3. Delete any existing code and paste this entire script
 * 4. Click "Deploy" > "New deployment"
 * 5. Select type: "Web app"
 * 6. Set "Execute as": "Me"
 * 7. Set "Who has access": "Anyone"
 * 8. Click "Deploy"
 * 9. Copy the Web app URL
 * 10. Paste the URL in your .env.local file as NEXT_PUBLIC_GOOGLE_SCRIPT_URL
 *
 * GOOGLE SHEET SETUP:
 * - The script will automatically create a Google Sheet named "Agenz Leads"
 *   in your Google Drive when the first submission comes in.
 * - OR you can create a sheet manually and set the SPREADSHEET_ID below
 */

// CONFIGURATION
// Leave empty to auto-create a new spreadsheet, or set your spreadsheet ID
const SPREADSHEET_ID = ''; // e.g., '1ABC123xyz...'
const SPREADSHEET_NAME = 'Agenz Leads';

// Sheet names for different form types
const SHEETS = {
  'lead-form': 'Lead Form Submissions',
  'contact-form': 'Contact Form Submissions',
  'default': 'Other Submissions'
};

/**
 * Handle GET requests (for testing)
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Agenz Lead Capture API is running!'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Handle POST requests from forms
 */
function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);

    // Get or create spreadsheet
    const spreadsheet = getOrCreateSpreadsheet();

    // Determine which sheet to use based on form type
    const formType = data.formType || 'default';
    const sheetName = SHEETS[formType] || SHEETS['default'];

    // Get or create the specific sheet
    const sheet = getOrCreateSheet(spreadsheet, sheetName, formType);

    // Add the submission
    addSubmission(sheet, data, formType);

    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Submission recorded successfully!',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Get existing spreadsheet or create a new one
 */
function getOrCreateSpreadsheet() {
  let spreadsheet;

  if (SPREADSHEET_ID) {
    // Use existing spreadsheet
    spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  } else {
    // Try to find existing spreadsheet by name
    const files = DriveApp.getFilesByName(SPREADSHEET_NAME);

    if (files.hasNext()) {
      const file = files.next();
      spreadsheet = SpreadsheetApp.openById(file.getId());
    } else {
      // Create new spreadsheet
      spreadsheet = SpreadsheetApp.create(SPREADSHEET_NAME);

      // Log the new spreadsheet ID for reference
      Logger.log('Created new spreadsheet with ID: ' + spreadsheet.getId());
      Logger.log('Spreadsheet URL: ' + spreadsheet.getUrl());
    }
  }

  return spreadsheet;
}

/**
 * Get existing sheet or create a new one with headers
 */
function getOrCreateSheet(spreadsheet, sheetName, formType) {
  let sheet = spreadsheet.getSheetByName(sheetName);

  if (!sheet) {
    // Create new sheet
    sheet = spreadsheet.insertSheet(sheetName);

    // Add headers based on form type
    const headers = getHeadersForFormType(formType);
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

    // Format header row
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground('#1a73e8');
    headerRange.setFontColor('#ffffff');
    headerRange.setFontWeight('bold');

    // Freeze header row
    sheet.setFrozenRows(1);

    // Auto-resize columns
    for (let i = 1; i <= headers.length; i++) {
      sheet.autoResizeColumn(i);
    }
  }

  return sheet;
}

/**
 * Get headers based on form type
 */
function getHeadersForFormType(formType) {
  const commonHeaders = ['Timestamp', 'Status'];

  switch (formType) {
    case 'lead-form':
      return [
        ...commonHeaders,
        'Full Name',
        'Email',
        'Phone',
        'Company Name',
        'Website',
        'Service Interest',
        'Budget',
        'Message/Goals',
        'Source Page'
      ];

    case 'contact-form':
      return [
        ...commonHeaders,
        'Full Name',
        'Email',
        'Phone',
        'Company Name',
        'Subject',
        'Message',
        'Source Page'
      ];

    default:
      return [
        ...commonHeaders,
        'Name',
        'Email',
        'Phone',
        'Data',
        'Source Page'
      ];
  }
}

/**
 * Add a new submission to the sheet
 */
function addSubmission(sheet, data, formType) {
  const timestamp = new Date();
  const formattedTimestamp = Utilities.formatDate(
    timestamp,
    Session.getScriptTimeZone(),
    'yyyy-MM-dd HH:mm:ss'
  );

  let rowData;

  switch (formType) {
    case 'lead-form':
      rowData = [
        formattedTimestamp,
        'New',
        data.fullName || '',
        data.email || '',
        data.phone || '',
        data.companyName || '',
        data.website || '',
        data.serviceInterest || '',
        data.budget || '',
        data.message || '',
        data.sourcePage || ''
      ];
      break;

    case 'contact-form':
      rowData = [
        formattedTimestamp,
        'New',
        data.name || '',
        data.email || '',
        data.phone || '',
        data.company || '',
        data.subject || '',
        data.message || '',
        data.sourcePage || ''
      ];
      break;

    default:
      rowData = [
        formattedTimestamp,
        'New',
        data.name || data.fullName || '',
        data.email || '',
        data.phone || '',
        JSON.stringify(data),
        data.sourcePage || ''
      ];
  }

  // Append the row
  sheet.appendRow(rowData);

  // Highlight new row (optional - makes new entries stand out)
  const lastRow = sheet.getLastRow();
  const newRowRange = sheet.getRange(lastRow, 1, 1, rowData.length);
  newRowRange.setBackground('#e8f5e9'); // Light green background for new entries

  // Send email notification (optional)
  sendEmailNotification(data, formType);
}

/**
 * Send email notification for new submissions (optional)
 * Uncomment and configure if you want email notifications
 */
function sendEmailNotification(data, formType) {
  // Uncomment and configure the email settings below to enable notifications
  /*
  const NOTIFICATION_EMAIL = 'kingjoe@agenz.my'; // Change to your email

  const subject = formType === 'lead-form'
    ? '🚀 New Lead: ' + (data.fullName || 'Unknown')
    : '📩 New Contact: ' + (data.name || 'Unknown');

  let body = 'You have a new form submission!\n\n';
  body += '----------------------------\n';
  body += 'Form Type: ' + formType + '\n';
  body += 'Time: ' + new Date().toLocaleString() + '\n';
  body += '----------------------------\n\n';

  for (const [key, value] of Object.entries(data)) {
    if (value && key !== 'formType') {
      body += key.charAt(0).toUpperCase() + key.slice(1) + ': ' + value + '\n';
    }
  }

  MailApp.sendEmail(NOTIFICATION_EMAIL, subject, body);
  */
}

/**
 * Utility function to test the script
 * Run this from the Apps Script editor to verify everything works
 */
function testScript() {
  const testData = {
    formType: 'lead-form',
    fullName: 'Test User',
    email: 'test@example.com',
    phone: '+60 12-345 6789',
    companyName: 'Test Company',
    website: 'https://test.com',
    serviceInterest: 'Digital Marketing',
    budget: 'RM 5,000 - RM 15,000',
    message: 'This is a test submission',
    sourcePage: 'Test'
  };

  // Simulate POST request
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };

  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}

/**
 * Get spreadsheet URL - run this to find your spreadsheet
 */
function getSpreadsheetUrl() {
  const spreadsheet = getOrCreateSpreadsheet();
  Logger.log('Spreadsheet URL: ' + spreadsheet.getUrl());
  Logger.log('Spreadsheet ID: ' + spreadsheet.getId());
}

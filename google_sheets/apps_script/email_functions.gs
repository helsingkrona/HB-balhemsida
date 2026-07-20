/**Här ligger alla funktioner
Triggern OnChange används för att fånga upp när det kommer in en ny anmälan från hemsidan
Triggern OnEdit används för att fånga upp varje gång någon ändrar något i arket t.ex. när man ger någon plats*/

var FIRST_NAME_COL_INDEX = 1;
var LAST_NAME_COL_INDEX = 2;
var EMAIL_COL_INDEX = 3;
var ADDRESS_COL_INDEX = 4;
var POSTAL_CODE_COL_INDEX = 5;
var CITY_COL_INDEX = 6;
var TITLE_COL_INDEX = 7;
var RELATION_COL_INDEX = 8;
var RESPECTIVE_COL_INDEX = 9;
var COMPANY_COL_INDEX = 10;
var FOOD_PREF_COL_INDEX = 11;
var SITTNING_COL_INDEX = 12;
var SONGBOOK_COL_INDEX = 13;
var ALUMNI_DRINK_COL_INDEX = 14;
var BALL_DINNER_TICKET_TYPE_COL_INDEX = 15;
var DINNER_DRINK_TYPE_COL_INDEX = 16;
var EXTRA_SNAPS_COL_INDEX = 17;
var SEXA_COL_INDEX = 18;
var MEDAL_COL_INDEX = 20;
var NATION_PIN_COL = 21;
var BRUNCH_COL_INDEX = 22;
var DONATION_COL_INDEX = 23
var PAYMENT_ID_COL_INDEX = 28;
var TOTAL_COST_COL_INDEX = 29;

var totalAttendeeCost = 0;

/** Funktion för att skicka ett bekräftelse mail till en viss rad
 *
 *
 *
*/
function sendEmailToNewSignUp(rowData, rowIndex, sheet) {
  var emailAddress = rowData[3]; // Adjust column index as needed
  var fName = rowData[1]; // Adjust column index as needed
  var timestampColumn = 26; // Column Z (adjust if needed)

   var lock = LockService.getScriptLock();
  try {
    lock.waitLock(5000); // Vänta upp till 5 sekunder
  } catch (e) {
    Logger.log("Could not obtain lock, skipping email to avoid duplication.");
    return;
  }


  Logger.log(`Trying to send signup confirmation email to ${emailAddress}...`);

  // Check if the row has already been processed (timestamp exists)
  var timestampCell = sheet.getRange(rowIndex, timestampColumn);
  if (timestampCell.getValue()) {
    Logger.log(`Email already sent to ${emailAddress}, skipping.`);
    lock.releaseLock();
    return;
  }

  // Mark row as processed by adding a timestamp in column Z
  timestampCell.setValue("Bekräftelsemail skickat: " + new Date());

  var emailTemplate = HtmlService.createTemplateFromFile('signupConfirmationEmailTemplate');

  var subject = 'Anmälan - Snörsjöaorden';
  emailTemplate.submission = { fname: fName };

  var message = emailTemplate.evaluate().getContent();
  MailApp.sendEmail({ to: emailAddress, subject: subject, htmlBody: message });



  Logger.log(`Signup confirmation email sent to ${emailAddress}.`);
  lock.releaseLock();
}

/**Genererar ett betalningsid, ,
 * sedan skriver den ut en formel för att beräkna totalakostanden för raden
 * sedan skickar den ett mail med betalningsinfo
*/
function sendPaymentEmail(rowData, rowIndex, sheet) {
  var emailAddress = rowData[3]; // Adjust column index as needed
  var fName = rowData[1]; // Adjust column index as needed
  var timestampColumn = 27; // Column Z (adjust if needed)
  var paymentIdColumn = 28;

  Logger.log(`Trying to send payment email to ${emailAddress}...`);



  // Check if the row has already been processed (timestamp exists)
  var timestampCell = sheet.getRange(rowIndex, timestampColumn);
  if (timestampCell.getValue()) {
    Logger.log(`Email already sent to ${emailAddress}, skipping.`);
    return;
  }

  timestampCell.setValue("Försöker skicka mail...");


  var paymentId = "SSO" + (rowIndex+300);
  var paymentIdCell = sheet.getRange(rowIndex, paymentIdColumn);
  paymentIdCell.setValue(paymentId);


  var totalcostCell = sheet.getRange(rowIndex, TOTAL_COST_COL_INDEX);
  var totalCost = "=IF(M" + rowIndex + "=\"ja\",C2,0) + IF(N" + rowIndex + "=\"ja\",C3,0) + IF(P" + rowIndex +  "=\"icke-student\",D4, IF(P" + rowIndex + "=\"student\",F4,0)) + R" + rowIndex + "*C5 + IF(S" + rowIndex + "<>\"nej\", C6, 0) + IF(U" + rowIndex + "=\"ja\",C7,0) + IF(V" + rowIndex + "=\"ja\",C8,0) + IF(W" + rowIndex + "=\"ja\",C9,0) + X" + rowIndex + "";
  totalcostCell.setValue(totalCost);
  SpreadsheetApp.flush();
  var updatedValue = totalcostCell.getValue();
  totalAttendeeCost = updatedValue;

  var emailTemplate = HtmlService.createTemplateFromFile('paymentInformationEmailTemplate');

  var subject = 'Platsbekräftelse & Betaling - Snörsjöaorden';
  emailTemplate.submission = {
    fname: fName,
    lname: rowData[LAST_NAME_COL_INDEX],
    title: rowData[TITLE_COL_INDEX],
    address: rowData[ADDRESS_COL_INDEX],
    postal_code: rowData[POSTAL_CODE_COL_INDEX],
    city: rowData[CITY_COL_INDEX],
    relation_to_nation: rowData[RELATION_COL_INDEX],
    food_pref: rowData[FOOD_PREF_COL_INDEX],
    sittning: rowData[SITTNING_COL_INDEX],
    respective: rowData[RESPECTIVE_COL_INDEX],
    company: rowData[COMPANY_COL_INDEX],
    is_student: rowData[BALL_DINNER_TICKET_TYPE_COL_INDEX],
    drink_type: rowData[DINNER_DRINK_TYPE_COL_INDEX],
    medal: rowData[MEDAL_COL_INDEX],
    extra_snaps: rowData[EXTRA_SNAPS_COL_INDEX],
    sexa: rowData[SEXA_COL_INDEX],
    brunch: rowData[BRUNCH_COL_INDEX],
    donation: rowData[DONATION_COL_INDEX],
    total_price: totalAttendeeCost,
    banking_prefix: paymentId
  };

  var message = emailTemplate.evaluate().getContent();
  MailApp.sendEmail({ to: emailAddress, subject: subject, htmlBody: message });

  timestampCell.setValue("Betalningsinfo skickat: " + new Date());

  Logger.log(`Payment Information email sent to ${emailAddress}.`);
}
/**Skickar ett mail som bekräftar platsen till någon som ska gå gratis på balen.
 *
 *  Alltså samma mail som sendPaymentEmail, men utan betalingsinformation
 *
 *
*/
function sendFreePaymentEmail(rowData, rowIndex, sheet) {
  var emailAddress = rowData[3]; // Adjust column index as needed
  var fName = rowData[1]; // Adjust column index as needed
  var timestampColumn = 27; // Column Z (adjust if needed)
  var paymentIdColumn = 28;
  var donationColumn = DONATION_COL_INDEX + 1;
  var donationCell = sheet.getRange(rowIndex, donationColumn);

  var totalcostCell = sheet.getRange(rowIndex, TOTAL_COST_COL_INDEX);


  Logger.log(`Trying to send free payment email to ${emailAddress}...`);

  // Check if the row has already been processed (timestamp exists)
  var timestampCell = sheet.getRange(rowIndex, timestampColumn);
  if (timestampCell.getValue()) {
    Logger.log(`Email already sent to ${emailAddress}, skipping.`);
    return;
  }

  timestampCell.setValue(new Date());

  var paymentId = "SSO" + (rowIndex+300);
  var paymentIdCell = sheet.getRange(rowIndex, paymentIdColumn);
  paymentIdCell.setValue(paymentId);
  var donation = donationCell.getValue();
  totalcostCell.setValue(donation);

  var emailTemplate = HtmlService.createTemplateFromFile('freePaymentInformationEmailTemplate');

  var subject = 'Platsbekräftelse - Snörsjöaorden';
  emailTemplate.submission = {
    fname: fName,
    lname: rowData[LAST_NAME_COL_INDEX],
    title: rowData[TITLE_COL_INDEX],
    address: rowData[ADDRESS_COL_INDEX],
    postal_code: rowData[POSTAL_CODE_COL_INDEX],
    city: rowData[CITY_COL_INDEX],
    relation_to_nation: rowData[RELATION_COL_INDEX],
    food_pref: rowData[FOOD_PREF_COL_INDEX],
    sittning: rowData[SITTNING_COL_INDEX],
    respective: rowData[RESPECTIVE_COL_INDEX],
    company: rowData[COMPANY_COL_INDEX],
    is_student: rowData[BALL_DINNER_TICKET_TYPE_COL_INDEX],
    drink_type: rowData[DINNER_DRINK_TYPE_COL_INDEX],
    medal: rowData[MEDAL_COL_INDEX],
    extra_snaps: rowData[EXTRA_SNAPS_COL_INDEX],
    sexa: rowData[SEXA_COL_INDEX],
    brunch: rowData[BRUNCH_COL_INDEX],
    donation: rowData[DONATION_COL_INDEX],
    banking_prefix: paymentId,
  };
  var message = emailTemplate.evaluate().getContent();
  MailApp.sendEmail({ to: emailAddress, subject: subject, htmlBody: message });

  // Mark row as processed by adding a timestamp


  timestampCell.setValue("Platsbekräftelsemail skickat: " + new Date());

  Logger.log(`Payment Information email sent to ${emailAddress}.`);
}
/** Skickar ett tack-mail som bekräftar att nationen mottagit betalningen
 * '
 *
 *
*/
function sendThankYouEmail(rowData, rowIndex, sheet) {
  var emailAddress = rowData[3]; // Adjust column index as needed
  var fName = rowData[1]; // Adjust column index as needed
  var timestampColumn = 31; // Column AE (adjust if needed)


  Logger.log(`Trying to send thank you email to ${emailAddress}...`);

  // Check if the row has already been processed (timestamp exists)
  var timestampCell = sheet.getRange(rowIndex, timestampColumn);
  if (timestampCell.getValue()) {
    Logger.log(`Email already sent to ${emailAddress}, skipping.`);
    return;
  }

  timestampCell.setValue(new Date());

  var emailTemplate = HtmlService.createTemplateFromFile('thankYouEmailTemplate');
  var subject = 'Betalningssbekräftelse - Snörsjöaorden';
  emailTemplate.submission = { fname: fName };
  var message = emailTemplate.evaluate().getContent();
  MailApp.sendEmail({ to: emailAddress, subject: subject, htmlBody: message });

  // Mark row as processed by adding a timestamp

  timestampCell.setValue("Tackmail skickat: " + new Date());



  Logger.log(`Thank you email sent to ${emailAddress}.`);
}

/**Kör email till nya*/
function processNewSignups() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("[Skrivskyddad]Anmälningar");
  if (!sheet) return;

  var lastRow = sheet.getLastRow();
  var data = sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).getValues();
  var emailSentCol = 26; // Kolumn Z = 26

  for (var i = 0; i < data.length; i++) {
    var row = data[i];
    var rowNumber = i + 2; // eftersom data startar på rad 2

    if (row[emailSentCol - 1] !== "") continue; // Mejlet redan skickat

    // Kontrollera att det är en giltig anmälan (namn + epost t.ex.)
    var name = row[0];   // Kolumn A
    var email = row[2];  // Kolumn C

    if (!name || !email) continue;

    sendEmailToNewSignUp(row, rowNumber, sheet);

    // Markera som skickat
    sheet.getRange(rowNumber, emailSentCol).setValue("✔");
  }
}
/**Kör för att skicka de andra mailen */
function processSignupStatusChanges() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Anmälningar");
  if (!sheet) return;

  var data = sheet.getDataRange().getValues();

  var placementStatusCol = 26; // Z – "Har fått plats" eller "Gratis"
  var paymentStatusCol = 30;   // AD – "Betalad"

  var placementEmailStatusCol = 32; // AF – gemensam för "Har fått plats" & "Gratis"
  var thankYouEmailStatusCol = 33;  // AG – för "Betalad"

  for (var row = 1; row < data.length; row++) {
    var rowData = data[row];
    var rowIndex = row + 1;

    var placementStatus = rowData[placementStatusCol - 1];
    var paymentStatus = rowData[paymentStatusCol - 1];

    var placementEmailStatus = rowData[placementEmailStatusCol - 1];
    var thankYouEmailStatus = rowData[thankYouEmailStatusCol - 1];

    // Placering: Har fått plats eller Gratis → gemensam kolumn AF
    if (placementEmailStatus !== "klar") {
      if (placementStatus === "Har fått plats") {
        sendPaymentEmail(rowData, rowIndex, sheet);
        sheet.getRange(rowIndex, placementEmailStatusCol).setValue("klar");
        Logger.log("Rad " + rowIndex + ": skickat betalmejl (har fått plats)");
      } else if (placementStatus === "Gratis") {
        sendFreePaymentEmail(rowData, rowIndex, sheet);
        sheet.getRange(rowIndex, placementEmailStatusCol).setValue("klar");
        Logger.log("Rad " + rowIndex + ": skickat gratisplatsmejl");
      }
    }

    // Betalad → separat kolumn AG
    if (paymentStatus === "Betalad" && thankYouEmailStatus !== "klar") {
      sendThankYouEmail(rowData, rowIndex, sheet);
      sheet.getRange(rowIndex, thankYouEmailStatusCol).setValue("klar");
      Logger.log("Rad " + rowIndex + ": skickat tackmejl (betald)");
    }
  }
}

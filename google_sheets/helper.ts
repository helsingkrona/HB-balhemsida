import { google } from "googleapis";

// Konfiguration för hur tiden/datumet anmälan inkommer ska visas.
const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: false,
  timeZone: "Europe/Stockholm"
}

//Interface för att hantera datan som kommer ut från ett formulär.
export interface SignUpFormData {
  first_name: string;
  last_name: string;
  email: string;
  title?: string;
  address: string;
  postal_code: string;
  city: string;
  relationship_to_nation?: string;
  food_preference?: string;
  companion?: string;
  group?: string;
  baler?: number;
  extra_snaps_tickets?: number;
  friday_dinner?: string;
  nation_songbook?: boolean;
  saturday_dinner: string;
  alumni_drink: boolean;
  saturday_drink_preference: string;
  sexa?: string;
  brunch?: string;
  medal?: string;
  nation_pin?: boolean;
  donation?: number;
  gdpr?: boolean;
  is_paying_guest: boolean; //Används inte, ta bort
  total_cost: number; //Används inte, ta bort
  food_preference_options: string;
  food_preference_custom: string;
}

// Google Sheets Auth
const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS, // Use keyFile instead of reading manually
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});


const sheets = google.sheets({ version: "v4", auth });

/* Convert SignUpFormData into a 2D array for Google Sheets
* Gör om datan till en vektor av stängar så att de kan skrivas ut i google sheets.
* Mindre strul om allting som skickas in i arket är i textformat.
* 
*/
function formatSignUpDataForSheets(formData: SignUpFormData, origin: string): string[][] {
  let now = new Date();
  let formattedDate = new Intl.DateTimeFormat("en-GB", options).format(now);
  const values = [
    formattedDate + origin,
    formData.first_name,
    formData.last_name,
    formData.email,
    formData.address,
    formData.postal_code,
    formData.city,
    formData.title ?? "",
    formData.relationship_to_nation ?? "",
    formData.companion ?? "",
    formData.group ?? "",
    formData.food_preference ?? "",
    formData.friday_dinner ?? "Nej",
    formData.nation_songbook ? "Ja" : "Nej",
    formData.alumni_drink ? "Ja" : "Nej",
    formData.saturday_dinner,
    formData.saturday_drink_preference,
    formData.extra_snaps_tickets?.toString() ?? "",
    formData.sexa ?? "",
    formData.baler?.toString() ?? "",
    formData.medal ?? "",
    formData.nation_pin ? "Ja" : "Nej",
    formData.brunch ?? "Nej",
    formData.donation?.toString() ?? "",
    formData.gdpr ? "Ja" : "Nej",
  ];

  return [values];
}



// Function som apiet kallar på
export async function appendSignUpToSheet(formData: SignUpFormData, origin: string) {

  writeToSheet(formData, "Anmälningar!A4", origin)

  writeToSheet(formData, "[Skrivskyddad]Anmälningar!A1", origin)
  
  /* Funktion för att skicka data till arket
  * formData - datan som ska skrivas in på raden
  * range - namnet på arket som ska integreras
  * origin - vilken av sidorna som anmälan kommer ifrån (ex. Injudan. Anmodan eller Anmälan)
  */
  async function writeToSheet(formData: SignUpFormData, range: string, origin: string) {
    try {

      //Ta fram rätt ark från env.
      const spreadsheetId = process.env.SHEET_ID!;
      
      //Formatera datan
      const formattedData = formatSignUpDataForSheets(formData, origin);
      
      //Skicka genom google apis
      const result = await sheets.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: "RAW",
        requestBody: { values: formattedData },
      });
  
      console.log("Data added:", result.data);
      return result.data;
    } catch (error: any) {
      console.error("Google Sheets API Error:", error.response?.data || error.message);
      throw error;
    }
    
  }
  
}



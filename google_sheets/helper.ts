// google_sheets/helper.ts
import { google } from "googleapis";
import fs from "fs";

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
  saturday_dinner: string;
  alumni_drink: boolean;
  saturday_drink_preference: string;
  sexa?: string;
  brunch?: boolean;
  medal?: string;
  nation_pin?: boolean;
  donation?: number;
  gdpr?: boolean;
  is_paying_guest: boolean;
  total_cost: number;
}

// Google Sheets Auth
const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(fs.readFileSync(process.env.GOOGLE_APPLICATION_CREDENTIALS!, "utf8")),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

// Convert SignUpFormData into a 2D array for Google Sheets
function formatSignUpDataForSheets(formData: SignUpFormData): string[][] {
  let now = new Date();
  let formattedDate = new Intl.DateTimeFormat("en-GB", options).format(now);
  const values = [
    formattedDate,
    formData.first_name,
    formData.last_name,
    formData.email,
    formData.address,
    formData.postal_code,
    formData.city,
    formData.title ?? "",
    formData.relationship_to_nation ?? "",
    formData.food_preference ?? "",
    formData.companion ?? "",
    formData.group ?? "",
    formData.friday_dinner ?? "Nej",
    formData.alumni_drink ? "Ja" : "Nej",
    formData.saturday_dinner,
    formData.saturday_drink_preference,
    formData.extra_snaps_tickets?.toString() ?? "",
    formData.medal ?? "",
    formData.baler?.toString() ?? "",
    formData.sexa ?? "",
    formData.brunch ? "Ja" : "Nej",
    formData.nation_pin ? "Ja" : "Nej",
    formData.donation?.toString() ?? "",
    formData.gdpr ? "Ja" : "Nej",
  ];

  return [values];
}



// Function to append data to Google Sheets
export async function appendSignUpToSheet(formData: SignUpFormData) {
  try {
    const spreadsheetId = process.env.SHEET_ID!;
    const range = "Anmälningar!B4:X1"; // Change if needed

    const formattedData = formatSignUpDataForSheets(formData);

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

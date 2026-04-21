// app/api/signup/route.ts
import { NextRequest, NextResponse } from "next/server";
import {  appendSignUpToSheet, SignUpFormData } from "@/google_sheets/helper";

export async function POST(req: NextRequest) {
  try {
    const formData: SignUpFormData = await req.json();

    //Behövs inte, input-hanteringen sköts av formuläret och helper.ts
    if (!formData.first_name || !formData.email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    //Används inte, ta bort
    if(formData.is_paying_guest){
      
    }


    await appendSignUpToSheet(formData, " - Inbjudan");

    return NextResponse.json({ message: "Success!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

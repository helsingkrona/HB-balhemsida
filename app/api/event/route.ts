
import { AppDataSource } from "@/lib/data-source";
import { Event } from "@/entities/Event";
import { NextResponse } from "next/server";

// GET request
export async function GET() {
  if (!AppDataSource.isInitialized) await AppDataSource.initialize();
  const events = await AppDataSource.manager.find(Event);
  return NextResponse.json({events});
}
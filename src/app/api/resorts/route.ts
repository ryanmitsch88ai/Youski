import { NextResponse } from "next/server";
import { resorts } from "@/data/resorts";

export async function GET() {
  return NextResponse.json(resorts);
} 
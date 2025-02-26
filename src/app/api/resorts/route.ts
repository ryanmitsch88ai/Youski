import { NextResponse } from "next/server";
import type { Resort } from "@/types/resort";
import { resorts } from "./[id]/route";

export async function GET() {
  return NextResponse.json(resorts);
} 
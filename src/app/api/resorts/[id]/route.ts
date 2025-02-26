import { NextResponse } from "next/server";
import { resorts } from "@/data/resorts";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const resort = resorts.find((r) => r.id === params.id);

  if (!resort) {
    return new NextResponse("Resort not found", { status: 404 });
  }

  return NextResponse.json(resort);
} 
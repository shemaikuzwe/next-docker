import { db } from "@/lib/server/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const users = await db.user.findMany();
  return NextResponse.json(users);
}

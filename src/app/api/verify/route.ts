import { NextResponse } from "next/server";

// Load a custom font (if needed)
// Replace 'path_to_font.ttf' with the actual path to your font file
// registerFont("path_to_font.ttf", { family: "CustomFont" });

export async function POST(request: Request, res: Response) {
  try {
    return NextResponse.json({ verified: false });
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}

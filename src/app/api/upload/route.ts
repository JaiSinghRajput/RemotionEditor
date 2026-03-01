import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });

    const sanitizedOriginalName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const extension = path.extname(sanitizedOriginalName);
    const baseName = path.basename(sanitizedOriginalName, extension);
    const fileName = `${baseName}-${randomUUID()}${extension}`;
    const absoluteFilePath = path.join(uploadsDir, fileName);

    await writeFile(absoluteFilePath, buffer);

    const fileUrl = `/uploads/${fileName}`;

    return NextResponse.json({
      url: fileUrl,
      filename: fileName,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}

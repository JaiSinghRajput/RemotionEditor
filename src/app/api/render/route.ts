import { NextResponse } from "next/server";
import path from "path";
import { mkdir, writeFile } from "fs/promises";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { project } = await req.json();
  if (!project) return NextResponse.json({ ok: false, error: "Missing project" }, { status: 400 });

  const jobId = crypto.randomUUID();

  const jobsDir = path.join(process.cwd(), "jobs");
  await mkdir(jobsDir, { recursive: true });

  await writeFile(
    path.join(jobsDir, `${jobId}.json`),
    JSON.stringify({ jobId, project }, null, 2),
    "utf8"
  );

  console.log("Render queued job:", jobId);

  return NextResponse.json({ ok: true, jobId });
}

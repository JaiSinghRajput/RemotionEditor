import {NextResponse} from "next/server";

export async function GET(_: Request, {params}: {params: {jobId: string}}) {
  // TODO: fetch from job queue
  return NextResponse.json({
    jobId: params.jobId,
    status: "queued",
    progress: 0,
    url: null,
  });
}

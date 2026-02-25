import {NextResponse} from "next/server";
import {DEFAULT_DURATION, DEFAULT_FPS, DEFAULT_HEIGHT, DEFAULT_WIDTH} from "../../../../lib/editor/constants";

export async function GET(_: Request, {params}: {params: {projectId: string}}) {
  // TODO: Load from DB
  return NextResponse.json({
    project: {
      id: params.projectId,
      name: "Demo Project",
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT,
      fps: DEFAULT_FPS,
      durationInFrames: DEFAULT_DURATION,
      layers: [],
    },
  });
}

export async function PUT(req: Request, {params}: {params: {projectId: string}}) {
  const body = await req.json();
  // TODO: save to DB
  return NextResponse.json({ok: true, projectId: params.projectId, data: body});
}

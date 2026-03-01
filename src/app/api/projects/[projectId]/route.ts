import {NextResponse} from "next/server";
import {DEFAULT_DURATION, DEFAULT_FPS, DEFAULT_HEIGHT, DEFAULT_WIDTH} from "../../../../lib/editor/constants";

export async function GET(_: Request, {params}: {params: {projectId: string}}) {
  // Return default empty project structure
  // Client will check localStorage for saved data
  return NextResponse.json({
    project: {
      id: params.projectId,
      name: "New Project",
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
  // Client handles localStorage persistence
  return NextResponse.json({ok: true, projectId: params.projectId, data: body});
}

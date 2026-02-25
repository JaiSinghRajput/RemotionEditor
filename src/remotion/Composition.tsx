import { AbsoluteFill, Sequence } from "remotion";
import { Project } from "../lib/editor/types";
import BackgroundLayerComp from "./layers/BackgroundLayer";
import TextLayerComp from "./layers/TextLayer";
import { useEffect, useState } from "react";
import { delayRender, continueRender } from "remotion";
import { loadProjectFonts } from "../lib/fonts/loadProjectFonts";

export const VideoComposition = ({ project }: { project: Project }) => {
  const [handle] = useState(() => delayRender("Loading fonts"));
  const layers = project.layers
    .filter((l) => l.enabled)
    .slice()
    .sort((a, b) => a.zIndex - b.zIndex);

  useEffect(() => {
    loadProjectFonts(project).then(() => continueRender(handle));
  }, [project, handle]);

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {layers.map((layer) => (
        <Sequence key={layer.id} from={layer.from} durationInFrames={layer.to - layer.from}>
          {layer.type === "background" && <BackgroundLayerComp layer={layer} />}
          {layer.type === "text" && <TextLayerComp layer={layer} />}
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

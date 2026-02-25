import { Composition } from "remotion";
import { VideoComposition } from "./Composition";
import {
  DEFAULT_DURATION,
  DEFAULT_FPS,
  DEFAULT_HEIGHT,
  DEFAULT_WIDTH,
} from "../lib/editor/constants";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="VideoComposition"
        component={VideoComposition}
        durationInFrames={DEFAULT_DURATION}
        fps={DEFAULT_FPS}
        width={DEFAULT_WIDTH}
        height={DEFAULT_HEIGHT}
        defaultProps={{
          project: {
            id: "demo",
            name: "Demo Project",
            width: DEFAULT_WIDTH,
            height: DEFAULT_HEIGHT,
            fps: DEFAULT_FPS,
            durationInFrames: DEFAULT_DURATION,
            layers: [],
          },
        }}
      />
    </>
  );
};

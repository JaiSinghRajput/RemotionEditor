"use client";

import { useMemo } from "react";

export function useFitScale(params: {
  containerWidth: number;
  containerHeight: number;
  contentWidth: number;
  contentHeight: number;
  padding?: number;
}) {
  const { containerWidth, containerHeight, contentWidth, contentHeight, padding = 0 } = params;

  return useMemo(() => {
    const cw = Math.max(0, containerWidth - padding * 2);
    const ch = Math.max(0, containerHeight - padding * 2);

    if (!cw || !ch || !contentWidth || !contentHeight) return 1;

    const scaleX = cw / contentWidth;
    const scaleY = ch / contentHeight;

    // fit inside container
    const scale = Math.min(scaleX, scaleY);

    // avoid super huge scale
    return Math.min(scale, 1);
  }, [containerWidth, containerHeight, contentWidth, contentHeight, padding]);
}

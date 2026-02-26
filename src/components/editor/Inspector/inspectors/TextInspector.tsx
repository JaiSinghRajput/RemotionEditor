"use client";

import FieldText from "../fields/FieldText";
import FieldSelect from "../fields/FieldSelect";
import FieldNumber from "../fields/FieldNumber";
import FieldColor from "../fields/FieldColor";
import FieldToggle from "../fields/FieldToggle";
import FieldTransition from "../fields/FieldTransition";
import FieldFontSearch from "../fields/FieldFontSearch";
import { useEditorStore } from "../../../../lib/editor/store";
import { TextLayer } from "../../../../lib/editor/types";
import { fontWeightOptions, fontstyleOptions } from "../../../../assets/fonts";

export default function TextInspector({ layer }: { layer: TextLayer }) {
  const updateLayer = useEditorStore((s) => s.updateLayer);

  return (
    <div className="space-y-5">
      <FieldTransition
        label="Transition In"
        value={layer.transitionIn}
        onChange={(v) => updateLayer(layer.id, "text", { transitionIn: v })}
      />
      <FieldTransition
        label="Transition Out"
        value={layer.transitionOut}
        onChange={(v) => updateLayer(layer.id, "text", { transitionOut: v })}
      />
      {/* TEXT */}
      <FieldText
        label="Text"
        value={layer.text}
        onChange={(v) => updateLayer(layer.id, "text", { text: v })}
      />

      {/* FONT */}
      <div className="grid grid-cols-2 gap-3">
        <FieldNumber
          label="Font size"
          value={layer.fontSize}
          onChange={(v) => updateLayer(layer.id, "text", { fontSize: v })}
        />

        <div>
          <FieldFontSearch
            label="Font"
            value={layer.fontFamily}
            onChange={(v) => updateLayer(layer.id, "text", { fontFamily: v })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <FieldSelect
          label="Weight"
          value={String(layer.fontWeight)}
          options={fontWeightOptions}
          onChange={(v) => updateLayer(layer.id, "text", { fontWeight: Number(v) })}
        />

        <FieldSelect
          label="Style"
          value={layer.fontStyle}
          options={fontstyleOptions}
          onChange={(v) => updateLayer(layer.id, "text", { fontStyle: v as any })}
        />
      </div>

      {/* COLOR */}
      <div className="grid grid-cols-2 gap-3">
        <FieldColor
          label="Color"
          value={layer.color}
          onChange={(v) => updateLayer(layer.id, "text", { color: v })}
        />

        <FieldNumber
          label="Opacity"
          value={layer.opacity}
          onChange={(v) => updateLayer(layer.id, "text", { opacity: v })}
        />
      </div>

      <div className="rounded-xl border border-white/10 bg-neutral-950 p-3 space-y-3">
        <FieldToggle
          label="Background"
          value={layer.background.enabled}
          onChange={(v) =>
            updateLayer(layer.id, "text", {
              background: { ...layer.background, enabled: v },
            })
          }
        />

        {layer.background.enabled ? (
          <>
            <FieldColor
              label="Bg color"
              value={layer.background.color}
              onChange={(v) =>
                updateLayer(layer.id, "text", {
                  background: { ...layer.background, color: v },
                })
              }
            />

            <div className="grid grid-cols-3 gap-3">
              <FieldNumber
                label="Pad X"
                value={layer.background.paddingX}
                onChange={(v) =>
                  updateLayer(layer.id, "text", {
                    background: { ...layer.background, paddingX: v },
                  })
                }
              />
              <FieldNumber
                label="Pad Y"
                value={layer.background.paddingY}
                onChange={(v) =>
                  updateLayer(layer.id, "text", {
                    background: { ...layer.background, paddingY: v },
                  })
                }
              />
              <FieldNumber
                label="Radius"
                value={layer.background.radius}
                onChange={(v) =>
                  updateLayer(layer.id, "text", {
                    background: { ...layer.background, radius: v },
                  })
                }
              />
            </div>
          </>
        ) : null}
      </div>

      {/* SHADOW */}
      <div className="rounded-xl border border-white/10 bg-neutral-950 p-3 space-y-3">
        <FieldToggle
          label="Shadow"
          value={layer.shadow.enabled}
          onChange={(v) =>
            updateLayer(layer.id, "text", {
              shadow: { ...layer.shadow, enabled: v },
            })
          }
        />

        {layer.shadow.enabled ? (
          <>
            <FieldColor
              label="Shadow color"
              value={layer.shadow.color}
              onChange={(v) =>
                updateLayer(layer.id, "text", {
                  shadow: { ...layer.shadow, color: v },
                })
              }
            />

            <div className="grid grid-cols-4 gap-3">
              <FieldNumber
                label="X"
                value={layer.shadow.x}
                onChange={(v) =>
                  updateLayer(layer.id, "text", {
                    shadow: { ...layer.shadow, x: v },
                  })
                }
              />
              <FieldNumber
                label="Y"
                value={layer.shadow.y}
                onChange={(v) =>
                  updateLayer(layer.id, "text", {
                    shadow: { ...layer.shadow, y: v },
                  })
                }
              />
              <FieldNumber
                label="Blur"
                value={layer.shadow.blur}
                onChange={(v) =>
                  updateLayer(layer.id, "text", {
                    shadow: { ...layer.shadow, blur: v },
                  })
                }
              />
            </div>
          </>
        ) : null}
      </div>

      {/* STROKE */}
      <div className="rounded-xl border border-white/10 bg-neutral-950 p-3 space-y-3">
        <FieldToggle
          label="Stroke"
          value={layer.stroke.enabled}
          onChange={(v) =>
            updateLayer(layer.id, "text", {
              stroke: { ...layer.stroke, enabled: v },
            })
          }
        />

        {layer.stroke.enabled ? (
          <>
            <FieldColor
              label="Stroke color"
              value={layer.stroke.color}
              onChange={(v) =>
                updateLayer(layer.id, "text", {
                  stroke: { ...layer.stroke, color: v },
                })
              }
            />

            <FieldNumber
              label="Stroke width"
              value={layer.stroke.width}
              onChange={(v) =>
                updateLayer(layer.id, "text", {
                  stroke: { ...layer.stroke, width: v },
                })
              }
            />
          </>
        ) : null}
      </div>
    </div>
  );
}

import { FC, Fragment, CSSProperties, useEffect, useMemo, useRef } from "react";

const Watermark: FC<{ content: string }> = ({ content }) => {
  const styleRef = useRef<string>("");
  const domRef = useRef<unknown>();

  const observer = useMemo(
    () =>
      new MutationObserver(() => {
        try {
          if (domRef.current) {
            // @ts-ignore
            document.body.removeChild(domRef.current);
          }
          domRef.current = null;
        } catch (e) {
          e;
        }
        reset();
      }),
    []
  );

  function reset() {
    if (styleRef.current) {
      observer.disconnect();
      const markDom = document.createElement("div");
      markDom.setAttribute("style", styleRef.current);
      const div1 = document.createElement("div");
      const div2 = document.createElement("div");
      div2.appendChild(markDom);
      div1.appendChild(div2);
      document.body.appendChild(div1);
      const config = { attributes: true, childList: true, subtree: true };
      observer.observe(div1, config);
      observer.observe(div2, config);
      observer.observe(markDom, config);
      // observer.observe(document, { childList: true });
      domRef.current = div1;
    }
  }

  useEffect(() => {
    if (content) {
      const base64 = toWatermarkImage(content);
      styleRef.current = CSSPropertiesToString({
        background: `url(data:image/svg+xml;base64,${base64})`,
        backgroundRepeat: "repeat",
        height: "100vh",
        width: "100vw",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 99999,
        pointerEvents: "none",
      });
      reset();
    }
  }, [content]);
  /** @render */
  return <Fragment />;
};

function toComboString(str: string) {
  let target = "";
  str.split("").forEach(m => {
    if (m.toUpperCase() === m) {
      target += "-" + m.toLowerCase();
    } else {
      target += m;
    }
  });
  return target;
}

export function CSSPropertiesToString(style: CSSProperties) {
  let styleString = "";
  for (const [key, value] of Object.entries(style)) {
    styleString += `${toComboString(key)}:${value};`;
  }
  return styleString;
}

// 水印内容
export function toWatermarkImage(content: string) {
  const str = `<svg xmlns="http://www.w3.org/2000/svg" width="366" height="178">
  <text
    width="69"
    height="34"
    style="transform: rotate(-15deg) translateY(38px); transform-origin:0px 18px;"
  >
    <tspan
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="28.5"
      alignment-baseline="middle"
      fill="rgba(143,149,158,0.08)"
      font-weight="normal"
      style="font-size: 1.1rem;"
    >
      ${content}
    </tspan>
  </text>
</svg>`;
  return btoa(str);
}

export default Watermark;

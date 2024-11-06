import { MutableRefObject, RefObject, useEffect, useRef } from "react";
import { FunctionOutputInputMap } from "../utils/types";

type VisualMarkerProps = {
  functionMapObject: FunctionOutputInputMap;
  inputRefArray: MutableRefObject<RefObject<HTMLDivElement>[]>;
  outputRefArray: MutableRefObject<RefObject<HTMLDivElement>[]>;
  startPointRef: RefObject<HTMLDivElement>;
  endPointRef: RefObject<HTMLDivElement>;
};

export default function VisualMarker({
  endPointRef,
  functionMapObject,
  inputRefArray,
  outputRefArray,
  startPointRef,
}: VisualMarkerProps) {
  const svg = useRef<SVGSVGElement>(null);

  function getCoordinates(ref: RefObject<HTMLDivElement>) {
    if (ref.current === null) {
      return { x: 0, y: 0 };
    }
    const { x, y, width, height } = ref.current.getBoundingClientRect();
    return { x: x + width / 2, y: y + height / 2 + window.scrollY };
  }

  useEffect(() => {
    const svgElement = svg.current;
    if (svgElement === null) {
      return;
    }
    svgElement.style.setProperty(
      "height",
      `${document.documentElement.scrollHeight}px`
    );
    for (let producerFunctionNumber in functionMapObject) {
      let consumerFunctionNumber = functionMapObject[producerFunctionNumber];
      const startRef =
        consumerFunctionNumber === "x"
          ? startPointRef
          : outputRefArray.current[consumerFunctionNumber];
      const endRef =
        producerFunctionNumber === "y"
          ? endPointRef
          : inputRefArray.current[producerFunctionNumber];

      const { x: x1, y: y1 } = getCoordinates(startRef);
      const { x: x2, y: y2 } = getCoordinates(endRef);

      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      if (y1 === y2) {
        path.setAttribute(
          "d",
          `M${x1} ${y1} Q ${x1 + 100} ${y1 + 100} ${x2} ${y2}`
        );
      } else {
        path.setAttribute(
          "d",
          `M${x1} ${y1} C${x1} ${(y1 + y2) / 2} ,${x2} ${
            (y1 + y2) / 2
          }, ${x2} ${y2}`
        );
      }
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", "#0066FF22");
      path.setAttribute("stroke-width", "7");
      svgElement.appendChild(path);
    }
  }, [
    inputRefArray,
    outputRefArray,
    functionMapObject,
    startPointRef,
    endPointRef,
  ]);

  return (
    <svg
      className="pointer-events-none select-none absolute left-0 top-0 w-full z-5"
      ref={svg}
    ></svg>
  );
}

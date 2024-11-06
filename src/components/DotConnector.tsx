import { forwardRef } from "react";

type DotConnectorProps = {};

export default forwardRef<HTMLDivElement, DotConnectorProps>(function (
  {},
  ref
) {
  return (
    <div
      className="bg-[#66A3FF] w-[15px] h-[15px] border-input border rounded-full p-0.5 bg-clip-content"
      ref={ref}
    ></div>
  );
});

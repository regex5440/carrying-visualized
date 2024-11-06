import { useState } from "react";
import DotConnector from "./DotConnector";
import { calculateExpression } from "../utils";

type FunctionCardProps = {
  functionNumber: number;
};
export function FunctionCard({ functionNumber }: FunctionCardProps) {
  const [expression, setExpression] = useState<string>("");
  const [isInvalid, setIsInvalid] = useState<boolean>(false);

  function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const expression = e.target.value.toLowerCase().replace(/\s+/, "");
    setExpression(expression);
    const output = calculateExpression(expression);
    setIsInvalid(output === undefined ? true : false);
  }

  return (
    <div className="card">
      <div className="p-card shadow-card border border-card w-fit rounded-card">
        <div className="flex items-center">
          <div className="grid grid-cols-3 gap-[1.9px] mr-2">
            {Array.from({ length: 6 })
              .fill(0)
              .map((_, index) => (
                <div className="w-[2.73px] aspect-square rounded-full bg-[#cdcdcd]"></div>
              ))}
          </div>
          <h2 className="text-sm font-semibold text-heading">
            Function: {functionNumber}
          </h2>
        </div>
        <div className="font-medium text-xs">
          <div className="mt-5">
            <div>Equation</div>
            <input
              type="text"
              className="w-full border border-input rounded-input p-input"
              onChange={inputHandler}
            />
          </div>
          <div className="mt-4">
            <div>Next function</div>
            <select
              title="Next function"
              disabled
              className="w-full border border-input rounded-input p-input"
            >
              <option>Function: x</option>
            </select>
          </div>
        </div>
        <div className="mt-11 flex justify-between text-tertiary text-2xs font-medium">
          <div className="flex gap-0.5 items-center">
            <DotConnector />
            input
          </div>
          <div className="flex gap-0.5 items-center">
            output <DotConnector />
          </div>
        </div>
      </div>
    </div>
  );
}

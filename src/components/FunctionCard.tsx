import { useEffect, useState } from "react";
import DotConnector from "./DotConnector";
import { calculateExpression } from "../utils";

type FunctionCardProps = {
  functionNumber: number;
  inputX: number | undefined;
  setOutput: (number: number | null, functionNumber: number) => void;
};
export function FunctionCard({
  functionNumber,
  inputX,
  setOutput,
}: FunctionCardProps) {
  const [expression, setExpression] = useState<string>("");
  const [isInvalid, setIsInvalid] = useState<boolean>(false);

  function doCalculation() {
    let output = null;
    if (inputX !== undefined && !isNaN(inputX)) {
      output = calculateExpression(expression, inputX);
    }
    setOutput(output, functionNumber);
    setIsInvalid(!Boolean(output));
  }

  function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const expression = e.target.value.toLowerCase().replace(/\s+/, "");
    setExpression(expression);
  }

  useEffect(doCalculation, [inputX, expression]);

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

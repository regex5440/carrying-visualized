import { ChangeEvent, RefObject, useEffect, useRef, useState } from "react";
import DotConnector from "./DotConnector";
import { calculateExpression } from "../utils";
import { FunctionOutputInputMap } from "../utils/types";

type FunctionCardProps = {
  functionNumber: number;
  inputX: number | undefined;
  setOutput: (number: number | null, functionNumber: number) => void;
  provideInputRef: (ref: RefObject<HTMLDivElement>) => void;
  provideOutputRef: (ref: RefObject<HTMLDivElement>) => void;
  functionMapObject: FunctionOutputInputMap;
};

const defaultEquations: Record<number, string> = {
  "1": "x^2",
  "2": "2x+4",
  "3": "x^2+20",
  "4": "x-2",
  "5": "x/2",
};

export function FunctionCard({
  functionNumber,
  inputX,
  setOutput,
  provideInputRef,
  provideOutputRef,
  functionMapObject,
}: FunctionCardProps) {
  const [expression, setExpression] = useState<string>(
    defaultEquations[functionNumber]
  );
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const inputRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  function doCalculation() {
    let output = null;
    if (inputX !== undefined && !isNaN(inputX) && !isInvalid) {
      output = calculateExpression(expression, inputX);
    }
    setOutput(output, functionNumber);
    // setIsInvalid(!Boolean(output));
  }

  function inputHandler(e: ChangeEvent<HTMLInputElement>) {
    const expression = e.target.value.toLowerCase().replace(/\s+/, "");
    setExpression(expression);
    const isValid = /^(((\d+|x|\d+x)([\+\-\*\/\\\^]))*(\d+|x|\d+x))+$/.test(
      expression
    );
    setIsInvalid(!isValid);
  }

  useEffect(doCalculation, [inputX, expression]);

  useEffect(() => {
    provideInputRef(inputRef);
    provideOutputRef(outputRef);
  }, []);

  const functionInputToOutputEntries = Object.entries(functionMapObject);

  const mappedEntry = functionInputToOutputEntries.find(
    ([_, value]) => value === functionNumber
  );
  const nextFunctionNumber = mappedEntry && Number(mappedEntry[0]);

  return (
    <div className="card">
      <div className="p-card shadow-card border border-card w-fit rounded-card">
        <div className="flex items-center">
          <div className="grid grid-cols-3 gap-[1.9px] mr-2">
            {Array.from({ length: 6 })
              .fill(0)
              .map((_, index) => (
                <div
                  className="w-[2.73px] aspect-square rounded-full bg-[#cdcdcd]"
                  key={"dot" + index}
                ></div>
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
              value={expression}
              className="w-full border border-input rounded-input p-input data-[invalid=true]:border-red-500 outline-none"
              onChange={inputHandler}
              data-invalid={isInvalid}
            />
          </div>
          <div className="mt-4">
            <div>Next function</div>
            <select
              title="Next function"
              disabled
              className="w-full border border-input rounded-input p-input"
            >
              <option>
                {nextFunctionNumber ? `Function: ${nextFunctionNumber}` : "-"}
              </option>
            </select>
          </div>
        </div>
        <div className="mt-11 flex justify-between text-tertiary text-2xs font-medium">
          <div className="flex gap-0.5 items-center">
            <DotConnector ref={inputRef} />
            input
          </div>
          <div className="flex gap-0.5 items-center">
            output <DotConnector ref={outputRef} />
          </div>
        </div>
      </div>
    </div>
  );
}

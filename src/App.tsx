import { useEffect, useState } from "react";
import "./App.css";
import { FunctionCard } from "./components/FunctionCard";
import DotConnector from "./components/DotConnector";

type InputFunctionName = number | "x";
type OutputFunctionName = number | "y";

const InitialValueOfX = 2;

// Record <consumerFunctionNumber, producerFunctionNumber>
const functionOutputInputMap: Record<OutputFunctionName, InputFunctionName> = {
  1: "x",
  2: 1,
  4: 2,
  5: 4,
  3: 5,
  y: 3,
};

function App() {
  const [functionOutputs, setFunctionOutputs] = useState<
    Record<InputFunctionName, number>
  >({ x: InitialValueOfX });

  function setOutput(
    functionOutput: number | null,
    functionNumber: InputFunctionName
  ) {
    setFunctionOutputs((prev) => {
      if (functionOutput === null) {
        delete prev[functionNumber];
      } else {
        prev[functionNumber] = functionOutput;
      }
      return { ...prev };
    });
  }
  useEffect(() => {
    console.log(functionOutputs);
  }, [functionOutputs]);

  function setInitialValue(e: React.ChangeEvent<HTMLInputElement>) {
    setOutput(Number(e.target.value), "x");
  }
  return (
    <div className="flex gap-10 justify-center items-center h-screen px-10">
      <div className="self-center">
        <label className="px-3 py-1 bg-[#E29A2D] text-xs font-semibold rounded-xl text-white">
          Initial value of x
        </label>
        <div className="border-2 border-[#FFC267] flex max-w-32 rounded-[15px] items-center gap-x-[15px] mt-[6px] pl-3">
          <input
            type="number"
            defaultValue={InitialValueOfX}
            className="border-r text-lg font-bold max-w-[60%] outline-none py-3 pr-py-3"
            onChange={setInitialValue}
          />
          <DotConnector />
        </div>
      </div>
      <div className="flex flex-wrap justify-evenly gap-24">
        {new Array(5).fill(0).map((_, index) => {
          const functionNumber = index + 1;
          const consumingFrom = functionOutputInputMap[functionNumber];
          return (
            <FunctionCard
              functionNumber={functionNumber}
              inputX={functionOutputs[consumingFrom]}
              setOutput={setOutput}
            />
          );
        })}
      </div>
      <div className="self-center">
        <label className="px-3 py-1 bg-[#4CAF79] text-xs font-semibold rounded-xl text-white">
          Initial value of x
        </label>
        <div className="border-2 border-[#2DD179] flex max-w-32 rounded-[15px] items-center gap-x-[15px] mt-[6px] flex-row-reverse pr-3">
          <input
            type="text"
            value={Math.floor(functionOutputs[functionOutputInputMap.y]) || ""}
            className="border-l text-lg font-bold max-w-[60%] outline-none py-3 pl-4"
            readOnly
          />
          <DotConnector />
        </div>
      </div>
    </div>
  );
}

export default App;

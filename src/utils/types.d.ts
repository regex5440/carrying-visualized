export type InputFunctionName = number | "x";
export type OutputFunctionName = number | "y";
export type FunctionOutputInputMap = Record<
  OutputFunctionName,
  InputFunctionName
>;

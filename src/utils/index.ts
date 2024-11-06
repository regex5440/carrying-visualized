export function calculateExpression(
  expression: string,
  valueOfX: number
): number | null {
  //TODO: Do the BODMAS calculation here based on regex matching the set (operator + operand) based on operator priority, replace it with its result and continue until no more operators are left
  let parsableExpression = "";
  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];
    const prevChar = expression[i - 1];
    const nextChar = expression[i + 1];
    if (char === "x") {
      if (!isNaN(Number(prevChar))) {
        parsableExpression += `*${valueOfX}`;
      } else if (!isNaN(Number(nextChar))) {
        parsableExpression += `${valueOfX}*`;
      } else {
        parsableExpression += `${valueOfX}`;
      }
    } else if (char === "^") {
      parsableExpression += "**";
    } else {
      parsableExpression += char;
    }
  }
  console.log(parsableExpression);
  let output = null;
  try {
    output = eval(parsableExpression);
    if (isNaN(output)) {
      output = null;
    }
  } catch (e) {
    // output = null;
  }
  return output;
}

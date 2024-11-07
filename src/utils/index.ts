export function calculateExpression(
  expression: string,
  valueOfX: number
): number | null {
  let parsableExpression = "";
  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];
    const prevChar = expression[i - 1];
    if (char === "x") {
      if (!isNaN(Number(prevChar)) || prevChar === "x") {
        parsableExpression += `*${valueOfX}`;
      } else {
        parsableExpression += `${valueOfX}`;
      }
    } else {
      parsableExpression += char;
    }
  }

  while (!/^\d+$/.test(parsableExpression)) {
    let operation = parsableExpression.match(/(\d+)\^(\d+)/);
    if (operation) {
      let result = Math.pow(Number(operation[1]), Number(operation[2]));
      parsableExpression = parsableExpression.replace(
        operation[0],
        result.toString()
      );
      continue;
    }
    let operation1 = parsableExpression.match(/(\d+)[\\\/](\d+)/);
    if (operation1) {
      let result = Number(operation1[1]) / Number(operation1[2]);
      parsableExpression = parsableExpression.replace(
        operation1[0],
        result.toString()
      );
      continue;
    }
    let operation2 = parsableExpression.match(/(\d+)\*(\d+)/);
    if (operation2) {
      let result = Number(operation2[1]) * Number(operation2[2]);
      parsableExpression = parsableExpression.replace(
        operation2[0],
        result.toString()
      );
      continue;
    }
    let operation3 = parsableExpression.match(/(\d+)([\+-])(\d+)/);
    if (operation3) {
      let result =
        operation3[2] === "+"
          ? Number(operation3[1]) + Number(operation3[3])
          : Number(operation3[1]) - Number(operation3[3]);
      parsableExpression = parsableExpression.replace(
        operation3[0],
        result.toString()
      );
      continue;
    }
    return null;
  }

  let output = Number(parsableExpression);
  return output;
}

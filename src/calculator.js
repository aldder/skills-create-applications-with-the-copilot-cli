#!/usr/bin/env node

/**
 * A CLI calculator supporting addition (+), subtraction (-),
 * multiplication (*), division (/), modulo (%), power (**),
 * and square root (sqrt).
 */

function add(left, right) {
  return left + right;
}

function subtract(left, right) {
  return left - right;
}

function multiply(left, right) {
  return left * right;
}

function divide(left, right) {
  if (right === 0) {
    throw new Error('Cannot divide by zero.');
  }

  return left / right;
}

function modulo(left, right) {
  if (right === 0) {
    throw new Error('Cannot divide by zero.');
  }

  return left % right;
}

function power(base, exponent) {
  return base ** exponent;
}

function squareRoot(number) {
  if (number < 0) {
    throw new Error('Cannot calculate the square root of a negative number.');
  }

  return Math.sqrt(number);
}

const operations = {
  '+': add,
  add,
  addition: add,
  '-': subtract,
  subtract,
  subtraction: subtract,
  '*': multiply,
  multiply,
  multiplication: multiply,
  '/': divide,
  divide,
  division: divide,
  '%': modulo,
  modulo,
  '**': power,
  power,
  exponentiation: power,
  sqrt: squareRoot,
  squareRoot,
  'square-root': squareRoot,
};

function calculate(operation, left, right) {
  const calculator = operations[operation];

  if (!calculator) {
    throw new Error(`Unsupported operation: ${operation}`);
  }

  return calculator(left, right);
}

function parseNumber(value, name) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    throw new Error(`${name} must be a finite number.`);
  }

  return number;
}

function runCli(cliArguments) {
  const [operation, leftInput, rightInput] = cliArguments;

  const isSquareRoot = ['sqrt', 'squareRoot', 'square-root'].includes(operation);
  const expectedArgumentCount = isSquareRoot ? 2 : 3;

  if (cliArguments.length !== expectedArgumentCount) {
    throw new Error('Usage: node src/calculator.js <operation> <left> <right>');
  }

  const left = parseNumber(leftInput, 'Left operand');
  const right = isSquareRoot ? undefined : parseNumber(rightInput, 'Right operand');

  console.log(calculate(operation, left, right));
}

if (require.main === module) {
  try {
    runCli(process.argv.slice(2));
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  power,
  squareRoot,
  calculate,
  runCli,
};

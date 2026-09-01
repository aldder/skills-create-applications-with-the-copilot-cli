#!/usr/bin/env node

/**
 * A CLI calculator supporting addition (+), subtraction (-),
 * multiplication (*), and division (/).
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

  if (cliArguments.length !== 3) {
    throw new Error('Usage: node src/calculator.js <operation> <left> <right>');
  }

  const left = parseNumber(leftInput, 'Left operand');
  const right = parseNumber(rightInput, 'Right operand');

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
  calculate,
  runCli,
};

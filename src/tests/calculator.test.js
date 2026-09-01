const {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  power,
  squareRoot,
  calculate,
  runCli,
} = require('../calculator');

describe('basic arithmetic operations', () => {
  test.each([
    [2, 3, 5],
    [-2, 3, 1],
    [0, 0, 0],
    [1.5, 2.5, 4],
  ])('adds %p and %p', (left, right, expected) => {
    expect(add(left, right)).toBe(expected);
  });

  test.each([
    [10, 4, 6],
    [3, 5, -2],
    [0, 0, 0],
    [5.5, 2, 3.5],
  ])('subtracts %p from %p', (left, right, expected) => {
    expect(subtract(left, right)).toBe(expected);
  });

  test.each([
    [45, 2, 90],
    [-3, 4, -12],
    [0, 10, 0],
    [1.5, 2, 3],
  ])('multiplies %p by %p', (left, right, expected) => {
    expect(multiply(left, right)).toBe(expected);
  });

  test.each([
    [20, 5, 4],
    [-12, 3, -4],
    [0, 4, 0],
    [7, 2, 3.5],
  ])('divides %p by %p', (left, right, expected) => {
    expect(divide(left, right)).toBe(expected);
  });

  test('rejects division by zero', () => {
    expect(() => divide(10, 0)).toThrow('Cannot divide by zero.');
  });
});

describe('advanced arithmetic operations', () => {
  test.each([
    [5, 2, 1],
    [10, 3, 1],
    [-10, 3, -1],
    [10.5, 2, 0.5],
  ])('calculates the remainder of %p divided by %p', (left, right, expected) => {
    expect(modulo(left, right)).toBe(expected);
  });

  test('rejects modulo by zero', () => {
    expect(() => modulo(10, 0)).toThrow('Cannot divide by zero.');
  });

  test.each([
    [2, 3, 8],
    [5, 0, 1],
    [9, 0.5, 3],
  ])('raises %p to the power of %p', (base, exponent, expected) => {
    expect(power(base, exponent)).toBe(expected);
  });

  test.each([
    [0, 0],
    [9, 3],
    [16, 4],
    [2.25, 1.5],
  ])('calculates the square root of %p', (number, expected) => {
    expect(squareRoot(number)).toBe(expected);
  });

  test('rejects square roots of negative numbers', () => {
    expect(() => squareRoot(-1)).toThrow(
      'Cannot calculate the square root of a negative number.',
    );
  });
});

describe('calculate', () => {
  test.each([
    ['+', 2, 3, 5],
    ['subtraction', 10, 4, 6],
    ['*', 45, 2, 90],
    ['division', 20, 5, 4],
    ['%', 10, 3, 1],
    ['power', 2, 3, 8],
    ['sqrt', 9, undefined, 3],
  ])('calculates %p for image example operands', (operation, left, right, expected) => {
    expect(calculate(operation, left, right)).toBe(expected);
  });

  test('rejects unsupported operations', () => {
    expect(() => calculate('unknown', 1, 2)).toThrow('Unsupported operation: unknown');
  });
});

describe('runCli', () => {
  test('prints the result for valid arguments', () => {
    const log = jest.spyOn(console, 'log').mockImplementation();

    runCli(['+', '2', '3']);

    expect(log).toHaveBeenCalledWith(5);
    log.mockRestore();
  });

  test('prints the result for a square root', () => {
    const log = jest.spyOn(console, 'log').mockImplementation();

    runCli(['sqrt', '9']);

    expect(log).toHaveBeenCalledWith(3);
    log.mockRestore();
  });

  test('requires an operation and two operands', () => {
    expect(() => runCli(['+', '2'])).toThrow(
      'Usage: node src/calculator.js <operation> <left> <right>',
    );
  });

  test('rejects non-numeric operands', () => {
    expect(() => runCli(['+', 'two', '3'])).toThrow(
      'Left operand must be a finite number.',
    );
  });
});

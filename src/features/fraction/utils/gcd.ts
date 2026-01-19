/**
 * Calculate the Greatest Common Divisor (GCD) of two numbers using Euclidean algorithm
 */
export function gcd(a: number, b: number): number {
  a = Math.abs(Math.floor(a));
  b = Math.abs(Math.floor(b));

  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }

  return a;
}

/**
 * Calculate the Least Common Multiple (LCM) of two numbers
 */
export function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b);
}

/**
 * Calculate the GCD of multiple numbers
 */
export function gcdMultiple(...numbers: number[]): number {
  if (numbers.length === 0) return 0;
  if (numbers.length === 1) return Math.abs(numbers[0]);

  return numbers.reduce((acc, num) => gcd(acc, num));
}

/**
 * Calculate the LCM of multiple numbers
 */
export function lcmMultiple(...numbers: number[]): number {
  if (numbers.length === 0) return 0;
  if (numbers.length === 1) return Math.abs(numbers[0]);

  return numbers.reduce((acc, num) => lcm(acc, num));
}

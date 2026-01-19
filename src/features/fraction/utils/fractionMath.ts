import { Fraction } from '../../../types';
import { gcd, lcm } from './gcd';

/**
 * Reduce a fraction to its simplest form
 */
export function reduceFraction(fraction: Fraction): Fraction {
  const divisor = gcd(fraction.numerator, fraction.denominator);
  return {
    numerator: fraction.numerator / divisor,
    denominator: fraction.denominator / divisor,
  };
}

/**
 * Check if a fraction can be reduced
 */
export function canReduce(fraction: Fraction): boolean {
  return gcd(fraction.numerator, fraction.denominator) > 1;
}

/**
 * Get the GCD of a fraction's numerator and denominator
 */
export function getFractionGcd(fraction: Fraction): number {
  return gcd(fraction.numerator, fraction.denominator);
}

/**
 * Multiply two fractions
 */
export function multiplyFractions(a: Fraction, b: Fraction): Fraction {
  return {
    numerator: a.numerator * b.numerator,
    denominator: a.denominator * b.denominator,
  };
}

/**
 * Divide two fractions (a ÷ b)
 */
export function divideFractions(a: Fraction, b: Fraction): Fraction {
  return {
    numerator: a.numerator * b.denominator,
    denominator: a.denominator * b.numerator,
  };
}

/**
 * Get the reciprocal of a fraction
 */
export function getReciprocal(fraction: Fraction): Fraction {
  return {
    numerator: fraction.denominator,
    denominator: fraction.numerator,
  };
}

/**
 * Add two fractions
 */
export function addFractions(a: Fraction, b: Fraction): Fraction {
  const commonDenom = lcm(a.denominator, b.denominator);
  const newNumeratorA = a.numerator * (commonDenom / a.denominator);
  const newNumeratorB = b.numerator * (commonDenom / b.denominator);

  return {
    numerator: newNumeratorA + newNumeratorB,
    denominator: commonDenom,
  };
}

/**
 * Subtract two fractions (a - b)
 */
export function subtractFractions(a: Fraction, b: Fraction): Fraction {
  const commonDenom = lcm(a.denominator, b.denominator);
  const newNumeratorA = a.numerator * (commonDenom / a.denominator);
  const newNumeratorB = b.numerator * (commonDenom / b.denominator);

  return {
    numerator: newNumeratorA - newNumeratorB,
    denominator: commonDenom,
  };
}

/**
 * Convert a fraction to a decimal
 */
export function fractionToDecimal(fraction: Fraction): number {
  return fraction.numerator / fraction.denominator;
}

/**
 * Check if two fractions are equal
 */
export function fractionsEqual(a: Fraction, b: Fraction): boolean {
  const reducedA = reduceFraction(a);
  const reducedB = reduceFraction(b);
  return reducedA.numerator === reducedB.numerator &&
         reducedA.denominator === reducedB.denominator;
}

/**
 * Generate a random fraction with values in a given range
 */
export function randomFraction(minValue: number = 1, maxValue: number = 10): Fraction {
  const numerator = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
  const denominator = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
  return { numerator, denominator };
}

/**
 * Format a fraction as a string
 */
export function formatFraction(fraction: Fraction): string {
  return `${fraction.numerator}/${fraction.denominator}`;
}

/**
 * Parse a string to a fraction (e.g., "3/4" -> { numerator: 3, denominator: 4 })
 */
export function parseFraction(str: string): Fraction | null {
  const match = str.match(/^(\d+)\/(\d+)$/);
  if (!match) return null;

  const numerator = parseInt(match[1], 10);
  const denominator = parseInt(match[2], 10);

  if (isNaN(numerator) || isNaN(denominator) || denominator === 0) {
    return null;
  }

  return { numerator, denominator };
}

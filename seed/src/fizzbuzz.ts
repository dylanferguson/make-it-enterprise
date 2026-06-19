export function fizzBuzzValue(value: number): string {
  if (value % 15 === 0) {
    return "FizzBuzz";
  }

  if (value % 3 === 0) {
    return "Fizz";
  }

  if (value % 5 === 0) {
    return "Buzz";
  }

  return String(value);
}

export function fizzBuzzRange(start: number, end: number): readonly string[] {
  return Array.from({ length: end - start + 1 }, (_, index) =>
    fizzBuzzValue(start + index),
  );
}

import { describe, expect, it } from "vitest";

import { fizzBuzzRange, fizzBuzzValue } from "../src/fizzbuzz.js";

describe("fizzBuzzValue", () => {
  it("returns the number for values that are not multiples of 3 or 5", () => {
    expect(fizzBuzzValue(1)).toBe("1");
    expect(fizzBuzzValue(2)).toBe("2");
    expect(fizzBuzzValue(98)).toBe("98");
  });

  it("returns Fizz for multiples of 3", () => {
    expect(fizzBuzzValue(3)).toBe("Fizz");
    expect(fizzBuzzValue(99)).toBe("Fizz");
  });

  it("returns Buzz for multiples of 5", () => {
    expect(fizzBuzzValue(5)).toBe("Buzz");
    expect(fizzBuzzValue(100)).toBe("Buzz");
  });

  it("returns FizzBuzz for multiples of both 3 and 5", () => {
    expect(fizzBuzzValue(15)).toBe("FizzBuzz");
    expect(fizzBuzzValue(90)).toBe("FizzBuzz");
  });
});

describe("fizzBuzzRange", () => {
  it("returns the FizzBuzz sequence for an inclusive range", () => {
    expect(fizzBuzzRange(1, 15)).toEqual([
      "1",
      "2",
      "Fizz",
      "4",
      "Buzz",
      "Fizz",
      "7",
      "8",
      "Fizz",
      "Buzz",
      "11",
      "Fizz",
      "13",
      "14",
      "FizzBuzz",
    ]);
  });
});

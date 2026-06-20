export class FizzBuzzOutputMessageCode {
  private static readonly instances = new Map<string, FizzBuzzOutputMessageCode>();

  static readonly FIZZ = new FizzBuzzOutputMessageCode(
    "FIZZ_OUTPUT_MESSAGE_CODE",
    "fizzbuzz.output.message.fizz",
    10,
  );
  static readonly BUZZ = new FizzBuzzOutputMessageCode(
    "BUZZ_OUTPUT_MESSAGE_CODE",
    "fizzbuzz.output.message.buzz",
    20,
  );
  static readonly FIZZBUZZ = new FizzBuzzOutputMessageCode(
    "FIZZBUZZ_OUTPUT_MESSAGE_CODE",
    "fizzbuzz.output.message.fizzbuzz",
    30,
  );
  static readonly NUMBER = new FizzBuzzOutputMessageCode(
    "NUMBER_OUTPUT_MESSAGE_CODE",
    "fizzbuzz.output.message.number",
    100,
  );

  private readonly codeName: string;
  private readonly resourceBundleKey: string;
  private readonly priority: number;

  private constructor(codeName: string, resourceBundleKey: string, priority: number) {
    this.codeName = codeName;
    this.resourceBundleKey = resourceBundleKey;
    this.priority = priority;
    FizzBuzzOutputMessageCode.instances.set(codeName, this);
  }

  getCodeName(): string {
    return this.codeName;
  }

  getResourceBundleKey(): string {
    return this.resourceBundleKey;
  }

  getPriority(): number {
    return this.priority;
  }

  static values(): readonly FizzBuzzOutputMessageCode[] {
    return Array.from(FizzBuzzOutputMessageCode.instances.values())
      .sort((a, b) => a.priority - b.priority);
  }

  static valueOf(codeName: string): FizzBuzzOutputMessageCode | null {
    return FizzBuzzOutputMessageCode.instances.get(codeName) ?? null;
  }

  static fromResourceBundleKey(key: string): FizzBuzzOutputMessageCode | null {
    for (const code of FizzBuzzOutputMessageCode.instances.values()) {
      if (code.resourceBundleKey === key) {
        return code;
      }
    }
    return null;
  }

  static getDefaultMessage(code: FizzBuzzOutputMessageCode): string {
    switch (code) {
      case FizzBuzzOutputMessageCode.FIZZ:
        return "Fizz";
      case FizzBuzzOutputMessageCode.BUZZ:
        return "Buzz";
      case FizzBuzzOutputMessageCode.FIZZBUZZ:
        return "FizzBuzz";
      case FizzBuzzOutputMessageCode.NUMBER:
        return "{0}";
      default:
        return "UNKNOWN";
    }
  }
}

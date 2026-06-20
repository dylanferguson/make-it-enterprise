import type { IResultTransformer } from "../contracts/IResultTransformer.js";

export abstract class AbstractBaseResultTransformer implements IResultTransformer {
  abstract transform(input: number, result: string): string;
  abstract getTransformerName(): string;
  abstract getTransformerPriority(): number;

  protected logTransformation(input: number, before: string, after: string): void {
    console.debug(
      `[ResultTransformer:${this.getTransformerName()}] Transformed "${before}" -> "${after}" for input ${input}`,
    );
  }
}

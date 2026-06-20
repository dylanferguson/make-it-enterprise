import { AbstractBaseResultTransformer } from "../../abstracts/AbstractBaseResultTransformer.js";

export class NormalizingResultTransformerImpl extends AbstractBaseResultTransformer {
  private static readonly TRANSFORMER_NAME = "NormalizingResultTransformer";
  private static readonly TRANSFORMER_PRIORITY = 50;

  override transform(_input: number, result: string): string {
    const normalized = result.normalize("NFC");
    this.logTransformation(_input, result, normalized);
    return normalized;
  }

  override getTransformerName(): string {
    return NormalizingResultTransformerImpl.TRANSFORMER_NAME;
  }

  override getTransformerPriority(): number {
    return NormalizingResultTransformerImpl.TRANSFORMER_PRIORITY;
  }
}

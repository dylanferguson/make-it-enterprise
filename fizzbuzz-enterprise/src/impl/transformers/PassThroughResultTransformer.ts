import { AbstractBaseResultTransformer } from "../../abstracts/AbstractBaseResultTransformer.js";

export class PassThroughResultTransformer extends AbstractBaseResultTransformer {
  private static readonly TRANSFORMER_NAME = "PassThroughResultTransformer";
  private static readonly TRANSFORMER_PRIORITY = 0;

  override transform(_input: number, result: string): string {
    return result;
  }

  override getTransformerName(): string {
    return PassThroughResultTransformer.TRANSFORMER_NAME;
  }

  override getTransformerPriority(): number {
    return PassThroughResultTransformer.TRANSFORMER_PRIORITY;
  }
}

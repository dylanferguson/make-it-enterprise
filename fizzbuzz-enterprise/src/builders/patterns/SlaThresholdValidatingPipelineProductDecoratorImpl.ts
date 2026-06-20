import type { IFizzBuzzComputationPipelineProduct } from "../contracts/IFizzBuzzComputationPipelineBuilder.js";
import type { IFizzBuzzRangeIterator } from "../../iterators/contracts/IFizzBuzzRangeIterator.js";

export class SlaThresholdValidatingPipelineProductDecoratorImpl implements IFizzBuzzComputationPipelineProduct {
  private static readonly DECORATOR_NAME = "SlaThresholdValidatingPipelineProductDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-SLA-DECORATOR";
  private readonly wrappedProduct: IFizzBuzzComputationPipelineProduct;
  private slaExceededCount: number = 0;
  private totalResolutionCount: number = 0;

  constructor(wrappedProduct: IFizzBuzzComputationPipelineProduct) {
    this.wrappedProduct = wrappedProduct;
  }

  getProductName(): string {
    return `${SlaThresholdValidatingPipelineProductDecoratorImpl.DECORATOR_NAME}:${this.wrappedProduct.getProductName()}`;
  }

  getProductVersion(): string {
    return `${SlaThresholdValidatingPipelineProductDecoratorImpl.DECORATOR_VERSION}:${this.wrappedProduct.getProductVersion()}`;
  }

  getPipelineConfigurationProfile(): string {
    return this.wrappedProduct.getPipelineConfigurationProfile();
  }

  getUnderlyingIterator(): IFizzBuzzRangeIterator | null {
    return this.wrappedProduct.getUnderlyingIterator();
  }

  resolveSingleValue(value: number): string {
    const startTime = performance.now();
    const result = this.wrappedProduct.resolveSingleValue(value);
    const elapsedMs = performance.now() - startTime;
    this.totalResolutionCount++;
    const thresholdMs = parseInt(
      this.wrappedProduct.getDiagnosticSummary().slaThresholdMs ?? "100",
      10,
    );
    if (elapsedMs > thresholdMs) {
      this.slaExceededCount++;
      console.warn(
        `[${SlaThresholdValidatingPipelineProductDecoratorImpl.DECORATOR_NAME}] ` +
        `SLA threshold exceeded: value=${value}, ` +
        `elapsed=${elapsedMs.toFixed(2)}ms, threshold=${thresholdMs}ms, ` +
        `exceeded=${this.slaExceededCount}/${this.totalResolutionCount}`,
      );
    }
    return result;
  }

  resolveRange(start: number, end: number): readonly string[] {
    return this.wrappedProduct.resolveRange(start, end);
  }

  getDiagnosticSummary(): Record<string, string> {
    return {
      ...this.wrappedProduct.getDiagnosticSummary(),
      slaDecoratorVersion: SlaThresholdValidatingPipelineProductDecoratorImpl.DECORATOR_VERSION,
      slaExceededCount: String(this.slaExceededCount),
      totalResolutionCount: String(this.totalResolutionCount),
    };
  }
}

import { AbstractBaseEnterpriseClassificationChainHandler } from "../../abstracts/AbstractBaseEnterpriseClassificationChainHandler.js";

export class DivisibleByFiveClassificationChainHandlerImpl
  extends AbstractBaseEnterpriseClassificationChainHandler
{
  protected readonly handlerName = "DivisibleByFiveClassificationChainHandler";
  protected readonly handlerVersion = "1.0.0-D5CCH-ENTERPRISE";
  protected readonly handlerPriority = 20;

  private static readonly CLASSIFICATION_DIVISOR = 5;
  private static readonly CLASSIFICATION_LABEL = "Buzz";

  override handleClassification(value: number): string | null {
    if (value % DivisibleByFiveClassificationChainHandlerImpl.CLASSIFICATION_DIVISOR === 0) {
      return DivisibleByFiveClassificationChainHandlerImpl.CLASSIFICATION_LABEL;
    }
    return null;
  }
}

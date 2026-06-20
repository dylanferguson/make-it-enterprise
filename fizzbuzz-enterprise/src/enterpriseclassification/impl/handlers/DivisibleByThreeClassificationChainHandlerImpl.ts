import { AbstractBaseEnterpriseClassificationChainHandler } from "../../abstracts/AbstractBaseEnterpriseClassificationChainHandler.js";

export class DivisibleByThreeClassificationChainHandlerImpl
  extends AbstractBaseEnterpriseClassificationChainHandler
{
  protected readonly handlerName = "DivisibleByThreeClassificationChainHandler";
  protected readonly handlerVersion = "1.0.0-D3CCH-ENTERPRISE";
  protected readonly handlerPriority = 10;

  private static readonly CLASSIFICATION_DIVISOR = 3;
  private static readonly CLASSIFICATION_LABEL = "Fizz";

  override handleClassification(value: number): string | null {
    if (value % DivisibleByThreeClassificationChainHandlerImpl.CLASSIFICATION_DIVISOR === 0) {
      return DivisibleByThreeClassificationChainHandlerImpl.CLASSIFICATION_LABEL;
    }
    return null;
  }
}

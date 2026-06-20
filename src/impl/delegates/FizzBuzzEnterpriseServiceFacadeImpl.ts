import { AbstractBaseFizzBuzzEnterpriseServiceFacade } from "../../abstracts/AbstractBaseFizzBuzzEnterpriseServiceFacade.js";
import type { FizzBuzzEnterpriseService } from "../../enterprise/FizzBuzzEnterpriseService.js";

export class FizzBuzzEnterpriseServiceFacadeImpl extends AbstractBaseFizzBuzzEnterpriseServiceFacade {
  private static readonly FACADE_NAME = "FizzBuzzEnterpriseServiceFacade";
  private static readonly FACADE_VERSION = "1.0.0-FACADE";

  private readonly enterpriseService: FizzBuzzEnterpriseService;

  constructor(enterpriseService: FizzBuzzEnterpriseService) {
    super();
    this.enterpriseService = enterpriseService;
  }

  override resolveEnterpriseValue(value: number): string {
    return this.enterpriseService.resolveValue(value);
  }

  override calculateEnterpriseRange(start: number, end: number): readonly string[] {
    return this.enterpriseService.calculateRange(start, end);
  }

  override getFacadeName(): string {
    return FizzBuzzEnterpriseServiceFacadeImpl.FACADE_NAME;
  }

  override getFacadeVersion(): string {
    return FizzBuzzEnterpriseServiceFacadeImpl.FACADE_VERSION;
  }
}

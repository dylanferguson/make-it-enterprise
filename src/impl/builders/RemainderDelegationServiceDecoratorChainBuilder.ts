import type { IRemainderOperatorDelegationService } from "../../contracts/IRemainderOperatorDelegationService.js";
import { ValidationRemainderOperatorDelegationServiceDecoratorImpl } from "../decorators/ValidationRemainderOperatorDelegationServiceDecoratorImpl.js";
import { AuditTrailRemainderOperatorDelegationServiceDecoratorImpl } from "../decorators/AuditTrailRemainderOperatorDelegationServiceDecoratorImpl.js";
import { CachingRemainderOperatorDelegationServiceDecoratorImpl } from "../decorators/CachingRemainderOperatorDelegationServiceDecoratorImpl.js";
import type { IRemainderOperatorDelegationServiceDecorator } from "../../contracts/IRemainderOperatorDelegationServiceDecorator.js";

export class RemainderDelegationServiceDecoratorChainBuilder {
  private decorateWithValidation: boolean = false;
  private decorateWithCaching: boolean = false;
  private decorateWithAuditTrail: boolean = false;

  withValidation(enabled: boolean = true): this {
    this.decorateWithValidation = enabled;
    return this;
  }

  withCaching(enabled: boolean = true): this {
    this.decorateWithCaching = enabled;
    return this;
  }

  withAuditTrail(enabled: boolean = true): this {
    this.decorateWithAuditTrail = enabled;
    return this;
  }

  build(baseService: IRemainderOperatorDelegationService): IRemainderOperatorDelegationService {
    let service: IRemainderOperatorDelegationService = baseService;

    if (this.decorateWithValidation) {
      service = new ValidationRemainderOperatorDelegationServiceDecoratorImpl(service);
    }
    if (this.decorateWithCaching) {
      service = new CachingRemainderOperatorDelegationServiceDecoratorImpl(service);
    }
    if (this.decorateWithAuditTrail) {
      service = new AuditTrailRemainderOperatorDelegationServiceDecoratorImpl(service);
    }

    return service;
  }
}

import { AbstractBaseFizzBuzzServiceDelegate } from "../../abstracts/AbstractBaseFizzBuzzServiceDelegate.js";
import type { IFizzBuzzComputationRequest } from "../../contracts/IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "../../contracts/IFizzBuzzComputationResponse.js";
import type { IEnterpriseServiceBean } from "../../contracts/IEnterpriseServiceBean.js";
import type { ITransactionManager } from "../../contracts/ITransactionManager.js";
import type { IComputationEventNotificationBus } from "../../contracts/IComputationEventNotificationBus.js";
import { FizzBuzzComputationResponseImpl } from "../dto/FizzBuzzComputationResponseImpl.js";
import { FizzBuzzComputationRequestImpl } from "../dto/FizzBuzzComputationRequestImpl.js";

export class FizzBuzzEnterpriseServiceDelegateImpl extends AbstractBaseFizzBuzzServiceDelegate {
  private static readonly DELEGATE_NAME = "FizzBuzzEnterpriseServiceDelegate";
  private static readonly DELEGATE_VERSION = "1.0.0-ENTERPRISE-DELEGATE";

  private readonly managedServiceBean: IEnterpriseServiceBean;
  private readonly transactionManager: ITransactionManager;
  private readonly eventBus: IComputationEventNotificationBus;

  constructor(
    managedServiceBean: IEnterpriseServiceBean,
    transactionManager: ITransactionManager,
    eventBus: IComputationEventNotificationBus,
  ) {
    super();
    this.managedServiceBean = managedServiceBean;
    this.transactionManager = transactionManager;
    this.eventBus = eventBus;
  }

  override getDelegateName(): string {
    return FizzBuzzEnterpriseServiceDelegateImpl.DELEGATE_NAME;
  }

  override getDelegateVersion(): string {
    return FizzBuzzEnterpriseServiceDelegateImpl.DELEGATE_VERSION;
  }

  override getDelegateImplementationVendor(): string {
    return AbstractBaseFizzBuzzServiceDelegate.DEFAULT_IMPLEMENTATION_VENDOR;
  }

  override delegateSingleValueResolution(request: IFizzBuzzComputationRequest): IFizzBuzzComputationResponse {
    this.validateDelegateRequest(request);

    const startTime = performance.now();
    this.transactionManager.beginTransaction();
    let result: string;

    try {
      result = this.managedServiceBean.getValueResolver().resolve(request.getRequestedValue());
      this.transactionManager.commitTransaction();
    } catch (error) {
      this.transactionManager.rollbackTransaction();
      throw error;
    }

    const durationMs = performance.now() - startTime;
    const correlationId = this.generateCorrelationId(request);

    const response = new FizzBuzzComputationResponseImpl(
      request.getRequestedValue(),
      result,
      `resp:${correlationId}`,
      correlationId,
    );
    response.setComputationDurationMs(durationMs);

    return response;
  }

  override delegateRangeComputation(
    startRequest: IFizzBuzzComputationRequest,
    endRequest: IFizzBuzzComputationRequest,
  ): readonly IFizzBuzzComputationResponse[] {
    this.validateDelegateRequest(startRequest);
    this.validateDelegateRequest(endRequest);

    const start = startRequest.getRequestedValue();
    const end = endRequest.getRequestedValue();
    const responses: IFizzBuzzComputationResponse[] = [];

    for (let value = start; value <= end; value++) {
      const singleRequest = new FizzBuzzComputationRequestImpl(
        value,
        `sub:${startRequest.getRequestId()}:${value}`,
        this.getDelegateName(),
      );
      responses.push(this.delegateSingleValueResolution(singleRequest));
    }

    return responses;
  }
}

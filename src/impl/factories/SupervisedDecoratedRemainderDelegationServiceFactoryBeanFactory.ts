import type { IRemainderOperatorDelegationService } from "../../contracts/IRemainderOperatorDelegationService.js";
import type { IRemainderComputationSupervisor } from "../../contracts/IRemainderComputationSupervisor.js";
import { StandardRemainderOperatorDelegationServiceImpl } from "../services/StandardRemainderOperatorDelegationServiceImpl.js";
import { RemainderDelegationServiceDecoratorChainBuilder } from "../builders/RemainderDelegationServiceDecoratorChainBuilder.js";
import { StandardRemainderComputationSupervisorImpl } from "../supervisors/StandardRemainderComputationSupervisorImpl.js";
import type { IRemainderOperatorDelegationServiceDecorator } from "../../contracts/IRemainderOperatorDelegationServiceDecorator.js";

export class SupervisedDecoratedRemainderDelegationServiceFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME =
    "SupervisedDecoratedRemainderDelegationServiceFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-ENTERPRISE";
  private static instance: IRemainderComputationSupervisor | null = null;

  static createSupervisedDecoratedDelegationService(
    baseService?: IRemainderOperatorDelegationService,
    builderConfig?: (builder: RemainderDelegationServiceDecoratorChainBuilder) => void,
  ): IRemainderComputationSupervisor {
    const effectiveBaseService =
      baseService ?? new StandardRemainderOperatorDelegationServiceImpl();
    const builder = new RemainderDelegationServiceDecoratorChainBuilder();
    if (builderConfig !== undefined) {
      builderConfig(builder);
    } else {
      builder.withValidation(true).withCaching(true).withAuditTrail(false);
    }
    const decoratedService = builder.build(effectiveBaseService);
    return new StandardRemainderComputationSupervisorImpl(decoratedService);
  }

  static createSingletonSupervisedDecoratedDelegationService(
    baseService?: IRemainderOperatorDelegationService,
    builderConfig?: (builder: RemainderDelegationServiceDecoratorChainBuilder) => void,
  ): IRemainderComputationSupervisor {
    if (
      SupervisedDecoratedRemainderDelegationServiceFactoryBeanFactory.instance === null
    ) {
      SupervisedDecoratedRemainderDelegationServiceFactoryBeanFactory.instance =
        SupervisedDecoratedRemainderDelegationServiceFactoryBeanFactory.createSupervisedDecoratedDelegationService(
          baseService,
          builderConfig,
        );
    }
    return SupervisedDecoratedRemainderDelegationServiceFactoryBeanFactory.instance!;
  }

  static resetInstance(): void {
    SupervisedDecoratedRemainderDelegationServiceFactoryBeanFactory.instance = null;
  }

  static getFactoryBeanName(): string {
    return SupervisedDecoratedRemainderDelegationServiceFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return SupervisedDecoratedRemainderDelegationServiceFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}

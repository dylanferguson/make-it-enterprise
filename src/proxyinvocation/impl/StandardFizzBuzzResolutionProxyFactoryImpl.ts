import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IFizzBuzzResolutionInvocationHandler } from "../contracts/IFizzBuzzResolutionInvocationHandler.js";
import type { IFizzBuzzResolutionProxyFactory } from "../contracts/IFizzBuzzResolutionProxyFactory.js";

export class StandardFizzBuzzResolutionProxyFactoryImpl
  implements IFizzBuzzResolutionProxyFactory
{
  private static readonly FACTORY_IMPL_NAME = "StandardFizzBuzzResolutionProxyFactoryImpl";
  private static readonly FACTORY_IMPL_VERSION = "1.0.0-PROXY-FACTORY";
  private static readonly PROXY_INSTANCE_COUNTER_PREFIX = "ProxyInstance";

  private proxyInstanceCounter: number = 0;

  createProxy(
    target: IFizzBuzzSingleValueResolutionFacade,
    handler: IFizzBuzzResolutionInvocationHandler,
  ): IFizzBuzzSingleValueResolutionFacade {
    this.proxyInstanceCounter++;
    const proxyInstanceId = `${StandardFizzBuzzResolutionProxyFactoryImpl.PROXY_INSTANCE_COUNTER_PREFIX}#${this.proxyInstanceCounter}`;

    console.debug(
      `[${StandardFizzBuzzResolutionProxyFactoryImpl.FACTORY_IMPL_NAME} v${StandardFizzBuzzResolutionProxyFactoryImpl.FACTORY_IMPL_VERSION}] ` +
      `Creating dynamic resolution proxy [${proxyInstanceId}]: ` +
      `target=[${target.getFacadeName()} v${target.getFacadeVersion()}], ` +
      `handler=[${handler.getHandlerName()} v${handler.getHandlerVersion()}], ` +
      `totalProxies=[${this.proxyInstanceCounter}]`,
    );

    const proxyFacade: IFizzBuzzSingleValueResolutionFacade = {
      resolveValue: (value: number): string => {
        return handler.invokeResolveValue(proxyFacade, value, target);
      },
      resolveRange: (start: number, end: number): readonly string[] => {
        return handler.invokeResolveRange(proxyFacade, start, end, target);
      },
      getFacadeName: (): string => {
        return `${proxyInstanceId}::Proxy[${target.getFacadeName()}]`;
      },
      getFacadeVersion: (): string => {
        return `PROXY:${StandardFizzBuzzResolutionProxyFactoryImpl.FACTORY_IMPL_VERSION}->${target.getFacadeVersion()}`;
      },
    };

    return proxyFacade;
  }

  getFactoryName(): string {
    return StandardFizzBuzzResolutionProxyFactoryImpl.FACTORY_IMPL_NAME;
  }

  getFactoryVersion(): string {
    return StandardFizzBuzzResolutionProxyFactoryImpl.FACTORY_IMPL_VERSION;
  }

  getProxyInstanceCount(): number {
    return this.proxyInstanceCounter;
  }
}

import type { IAopInfrastructureProvider } from "../contracts/IAopInfrastructureProvider.js";
import type { IAopProxyFactory } from "../contracts/IAopProxyFactory.js";
import type { IAspectWeaver } from "../contracts/IAspectWeaver.js";
import { DefaultAopInfrastructureProviderImpl } from "../impl/providers/DefaultAopInfrastructureProviderImpl.js";
import { BeforeAspectAdviceImpl } from "../impl/advice/BeforeAspectAdviceImpl.js";
import { AfterAspectAdviceImpl } from "../impl/advice/AfterAspectAdviceImpl.js";
import { AroundAspectAdviceImpl } from "../impl/advice/AroundAspectAdviceImpl.js";
import { ResolutionMethodAspectPointcutImpl } from "../impl/pointcut/ResolutionMethodAspectPointcutImpl.js";

export class AopInfrastructureFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "AopInfrastructureFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-AOP-INFRASTRUCTURE-FACTORY-BEAN";

  private static infrastructureProvider: IAopInfrastructureProvider | null = null;
  private static factoryInitialized: boolean = false;

  static initializeFactory(): boolean {
    if (AopInfrastructureFactoryBeanFactory.factoryInitialized) return true;
    AopInfrastructureFactoryBeanFactory.infrastructureProvider = new DefaultAopInfrastructureProviderImpl();
    AopInfrastructureFactoryBeanFactory.factoryInitialized = true;
    return true;
  }

  static initializeInfrastructure(): IAopInfrastructureProvider {
    if (!AopInfrastructureFactoryBeanFactory.factoryInitialized) {
      AopInfrastructureFactoryBeanFactory.initializeFactory();
    }
    const provider = AopInfrastructureFactoryBeanFactory.infrastructureProvider!;
    if (!provider.isInfrastructureInitialized()) {
      provider.initializeInfrastructure();
    }
    return provider;
  }

  static getInfrastructureProvider(): IAopInfrastructureProvider | null {
    return AopInfrastructureFactoryBeanFactory.infrastructureProvider;
  }

  static getProxyFactory(): IAopProxyFactory | null {
    const provider = AopInfrastructureFactoryBeanFactory.infrastructureProvider;
    if (provider === null || !provider.isInfrastructureInitialized()) return null;
    return provider.getProxyFactory();
  }

  static getWeaver(): IAspectWeaver | null {
    const provider = AopInfrastructureFactoryBeanFactory.infrastructureProvider;
    if (provider === null || !provider.isInfrastructureInitialized()) return null;
    return provider.getWeaver();
  }

  static isInfrastructureInitialized(): boolean {
    return AopInfrastructureFactoryBeanFactory.factoryInitialized &&
      AopInfrastructureFactoryBeanFactory.infrastructureProvider !== null &&
      AopInfrastructureFactoryBeanFactory.infrastructureProvider.isInfrastructureInitialized();
  }

  static registerDefaultComputationAspects(weaver: IAspectWeaver): void {
    const beforeAdvice = new BeforeAspectAdviceImpl(
      (joinPoint) => {
        console.debug(
          `[AopInfrastructureFactoryBeanFactory v${AopInfrastructureFactoryBeanFactory.FACTORY_BEAN_VERSION}] ` +
          `[BEFORE] JoinPoint=[${joinPoint.getJoinPointName()}], ` +
          `method=[${joinPoint.getMethodName()}], ` +
          `context=[${joinPoint.getJoinPointName()}::${Date.now()}]`,
        );
      },
      100,
    );

    const afterAdvice = new AfterAspectAdviceImpl(
      (joinPoint, result) => {
        console.debug(
          `[AopInfrastructureFactoryBeanFactory v${AopInfrastructureFactoryBeanFactory.FACTORY_BEAN_VERSION}] ` +
          `[AFTER] JoinPoint=[${joinPoint.getJoinPointName()}], ` +
          `method=[${joinPoint.getMethodName()}], result=[${JSON.stringify(result)}]`,
        );
      },
      300,
    );

    const aroundLatencyAdvice = new AroundAspectAdviceImpl(
      (joinPoint) => {
        const start = performance.now();
        try {
          const result = joinPoint.proceed();
          const elapsed = performance.now() - start;
          console.debug(
            `[AopInfrastructureFactoryBeanFactory v${AopInfrastructureFactoryBeanFactory.FACTORY_BEAN_VERSION}] ` +
            `[AROUND_LATENCY] method=[${joinPoint.getMethodName()}], ` +
            `elapsed=[${elapsed.toFixed(3)}ms], args=[${JSON.stringify(joinPoint.getArguments())}]`,
          );
          return result;
        } catch (error) {
          const elapsed = performance.now() - start;
          console.debug(
            `[AopInfrastructureFactoryBeanFactory v${AopInfrastructureFactoryBeanFactory.FACTORY_BEAN_VERSION}] ` +
            `[AROUND_LATENCY_ERROR] method=[${joinPoint.getMethodName()}], ` +
            `elapsed=[${elapsed.toFixed(3)}ms], error=[${String(error)}]`,
          );
          throw error;
        }
      },
      200,
    );

    const resolutionPointcut = new ResolutionMethodAspectPointcutImpl();
    weaver.registerAspect(resolutionPointcut, beforeAdvice);
    weaver.registerAspect(resolutionPointcut, afterAdvice);
    weaver.registerAspect(resolutionPointcut, aroundLatencyAdvice);
  }

  static getFactoryBeanName(): string {
    return AopInfrastructureFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return AopInfrastructureFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }

  static resetFactory(): void {
    AopInfrastructureFactoryBeanFactory.infrastructureProvider = null;
    AopInfrastructureFactoryBeanFactory.factoryInitialized = false;
  }
}

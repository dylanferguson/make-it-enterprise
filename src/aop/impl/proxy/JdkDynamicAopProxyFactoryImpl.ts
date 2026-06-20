import { AbstractBaseAopProxyFactory } from "../../abstracts/AbstractBaseAopProxyFactory.js";
import type { IAspectWeaver } from "../../contracts/IAspectWeaver.js";
import type { IAspectJoinPoint } from "../../contracts/IAspectJoinPoint.js";
import { MethodInvocationAspectJoinPointImpl } from "../joinpoints/MethodInvocationAspectJoinPointImpl.js";
import { DefaultAspectWeaverImpl } from "../weaver/DefaultAspectWeaverImpl.js";

export class JdkDynamicAopProxyFactoryImpl extends AbstractBaseAopProxyFactory {
  private static readonly PROXY_FACTORY_NAME = "JdkDynamicAopProxyFactory";
  private static readonly PROXY_FACTORY_VERSION = "1.0.0-JDK-DYNAMIC-AOP-PROXY-FACTORY";
  private static readonly RESOLUTION_TARGET_METHODS: readonly string[] = [
    "resolveValue", "resolveRange", "getFacadeName", "getFacadeVersion",
    "delegateSingleValueResolution", "delegateRangeResolution",
  ];

  private readonly proxyCache: Map<object, object> = new Map();
  private readonly targetCache: Map<object, object> = new Map();

  constructor() {
    super(JdkDynamicAopProxyFactoryImpl.PROXY_FACTORY_NAME, JdkDynamicAopProxyFactoryImpl.PROXY_FACTORY_VERSION);
  }

  override createProxy<T extends object>(target: T, weaver: IAspectWeaver): T {
    const cached = this.proxyCache.get(target);
    if (cached !== undefined) {
      return cached as T;
    }

    const self = this;
    const proxy = new Proxy(target, {
      get(proxyTarget: T, prop: string | symbol): unknown {
        const originalMethod = (proxyTarget as Record<string | symbol, unknown>)[prop];
        if (typeof originalMethod !== "function") {
          return originalMethod;
        }

        if (!JdkDynamicAopProxyFactoryImpl.RESOLUTION_TARGET_METHODS.includes(String(prop))) {
          return originalMethod;
        }

        return (...args: unknown[]): unknown => {
          const joinPoint: IAspectJoinPoint = new MethodInvocationAspectJoinPointImpl(
            proxyTarget,
            String(prop),
            args,
            (...innerArgs: unknown[]) => (originalMethod as (...a: unknown[]) => unknown)(...innerArgs),
          );

          if (weaver instanceof DefaultAspectWeaverImpl) {
            const advice = weaver.getApplicableAdvice(joinPoint);
            if (advice.length > 0) {
              joinPoint.setAdviceChain(advice);
            }
          }

          return joinPoint.proceed();
        };
      },
    });

    this.proxyCache.set(target, proxy);
    this.targetCache.set(proxy, target);
    return proxy;
  }

  override getUnderlyingTarget<T extends object>(proxy: T): T | null {
    const target = this.targetCache.get(proxy);
    return (target as T) ?? null;
  }
}

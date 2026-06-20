import type { IEnterpriseConfigurationDescriptor } from "../contracts/IEnterpriseConfigurationDescriptor.js";
import type { IEnterpriseDecoratorChainConfigurationRegistry } from "../contracts/IEnterpriseDecoratorChainConfigurationRegistry.js";

export class FizzBuzzEnterpriseDecoratorChainConfigurationRegistryImpl implements IEnterpriseDecoratorChainConfigurationRegistry {
  private static readonly REGISTRY_NAME = "FizzBuzzEnterpriseDecoratorChainConfigurationRegistryImpl";
  private static readonly REGISTRY_VERSION = "1.0.0-DECORATOR-REGISTRY";

  private enabledDecorators: Map<string, boolean>;
  private chainOrder: string[];
  private configurationProfileName: string;

  constructor(profileName: string = "STANDARD") {
    this.configurationProfileName = profileName;
    this.enabledDecorators = new Map();
    this.chainOrder = [];
    this.applyDefaultConfiguration();
  }

  private applyDefaultConfiguration(): void {
    const defaultDecorators = [
      "ConfigurationAware", "ValidationAware", "InterceptionFilter",
      "DocumentAware", "AopAware", "PreEvaluation", "StateMachine",
      "Transaction", "AbstractDivisibility", "JndiEjb", "PostProcessor",
      "StrategyLookupService",
    ];
    for (const name of defaultDecorators) {
      this.enabledDecorators.set(name, true);
    }
    this.chainOrder = [...defaultDecorators];
  }

  isDecoratorEnabled(decoratorName: string): boolean {
    return this.enabledDecorators.get(decoratorName) ?? true;
  }

  getDecoratorChainOrder(): readonly string[] {
    return [...this.chainOrder];
  }

  setDecoratorEnabled(decoratorName: string, enabled: boolean): void {
    this.enabledDecorators.set(decoratorName, enabled);
    if (!this.chainOrder.includes(decoratorName)) {
      this.chainOrder.push(decoratorName);
    }
  }

  reloadConfigurationFromDescriptor(descriptor: IEnterpriseConfigurationDescriptor): void {
    const decoratorChainChildren = descriptor.getRootNode()
      .getChildNodesByName("decorator-chain")
      .flatMap(n => [...n.getChildNodes()]);
    for (const decoratorNode of decoratorChainChildren) {
      if (decoratorNode.getNodeName() === "decorator") {
        const name = decoratorNode.getAttribute("name");
        const enabled = decoratorNode.getAttribute("enabled");
        if (name !== null) {
          this.enabledDecorators.set(name, enabled === "true");
          if (!this.chainOrder.includes(name)) {
            this.chainOrder.push(name);
          }
        }
      }
    }
    const mediationEnabled = descriptor.getProperty("mediation.enabled");
    if (mediationEnabled !== null) {
      this.configurationProfileName = mediationEnabled.getValue() === "true"
        ? "MEDIATION_ENABLED" : "STANDARD";
    }
  }

  getRegistryName(): string {
    return FizzBuzzEnterpriseDecoratorChainConfigurationRegistryImpl.REGISTRY_NAME;
  }

  getRegistryVersion(): string {
    return FizzBuzzEnterpriseDecoratorChainConfigurationRegistryImpl.REGISTRY_VERSION;
  }

  getRegisteredDecoratorCount(): number {
    return this.enabledDecorators.size;
  }

  getRegisteredDecoratorNames(): readonly string[] {
    return [...this.enabledDecorators.keys()];
  }

  getConfigurationProfileName(): string {
    return this.configurationProfileName;
  }
}

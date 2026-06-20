import type { IEnterpriseDeploymentPlan } from "../../contracts/IEnterpriseDeploymentPlan.js";
import type { IXmlParsedElement } from "../../contracts/IXmlParsedElement.js";

export class EnterpriseDeploymentPlanImpl implements IEnterpriseDeploymentPlan {
  private static readonly EJB_JAR_KEY = "META-INF/ejb-jar.xml";
  private static readonly APPLICATION_KEY = "META-INF/application.xml";
  private static readonly PERSISTENCE_KEY = "META-INF/persistence.xml";
  private static readonly BEANS_KEY = "META-INF/beans.xml";
  private static readonly STRATEGY_DEFINITIONS_KEY = "META-INF/fizzbuzz-modulo-strategy-definitions.xml";
  private static readonly NORMALIZATION_DEFINITIONS_KEY = "META-INF/fizzbuzz-output-normalization-definitions.xml";

  private readonly planName: string;
  private readonly planVersion: string;
  private readonly descriptors: Map<string, IXmlParsedElement> = new Map();

  constructor(planName: string, planVersion: string) {
    this.planName = planName;
    this.planVersion = planVersion;
  }

  getPlanName(): string {
    return this.planName;
  }

  getPlanVersion(): string {
    return this.planVersion;
  }

  getParsedDescriptor(descriptorName: string): IXmlParsedElement | null {
    return this.descriptors.get(descriptorName) ?? null;
  }

  getRegisteredDescriptorNames(): readonly string[] {
    return Array.from(this.descriptors.keys());
  }

  hasDescriptor(descriptorName: string): boolean {
    return this.descriptors.has(descriptorName);
  }

  registerDescriptor(name: string, parsedElement: IXmlParsedElement): void {
    this.descriptors.set(name, parsedElement);
  }

  getEjbJarDescriptor(): IXmlParsedElement | null {
    return this.descriptors.get(EnterpriseDeploymentPlanImpl.EJB_JAR_KEY) ?? null;
  }

  getApplicationDescriptor(): IXmlParsedElement | null {
    return this.descriptors.get(EnterpriseDeploymentPlanImpl.APPLICATION_KEY) ?? null;
  }

  getPersistenceDescriptor(): IXmlParsedElement | null {
    return this.descriptors.get(EnterpriseDeploymentPlanImpl.PERSISTENCE_KEY) ?? null;
  }

  getBeansDescriptor(): IXmlParsedElement | null {
    return this.descriptors.get(EnterpriseDeploymentPlanImpl.BEANS_KEY) ?? null;
  }

  getStrategyDefinitionDescriptor(): IXmlParsedElement | null {
    return this.descriptors.get(EnterpriseDeploymentPlanImpl.STRATEGY_DEFINITIONS_KEY) ?? null;
  }

  getNormalizationDefinitionDescriptor(): IXmlParsedElement | null {
    return this.descriptors.get(EnterpriseDeploymentPlanImpl.NORMALIZATION_DEFINITIONS_KEY) ?? null;
  }
}

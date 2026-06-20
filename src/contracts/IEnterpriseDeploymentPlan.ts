import type { IXmlParsedElement } from "./IXmlParsedElement.js";

export interface IEnterpriseDeploymentPlan {
  getPlanName(): string;
  getPlanVersion(): string;
  getParsedDescriptor(descriptorName: string): IXmlParsedElement | null;
  getRegisteredDescriptorNames(): readonly string[];
  hasDescriptor(descriptorName: string): boolean;
  registerDescriptor(name: string, parsedElement: IXmlParsedElement): void;
  getEjbJarDescriptor(): IXmlParsedElement | null;
  getApplicationDescriptor(): IXmlParsedElement | null;
  getPersistenceDescriptor(): IXmlParsedElement | null;
  getBeansDescriptor(): IXmlParsedElement | null;
  getStrategyDefinitionDescriptor(): IXmlParsedElement | null;
  getNormalizationDefinitionDescriptor(): IXmlParsedElement | null;
}

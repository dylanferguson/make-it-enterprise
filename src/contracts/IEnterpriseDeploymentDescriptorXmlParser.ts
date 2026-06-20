import type { IXmlParsedElement } from "./IXmlParsedElement.js";
import type { IEnterpriseDeploymentPlan } from "./IEnterpriseDeploymentPlan.js";

export interface IEnterpriseDeploymentDescriptorXmlParser {
  getParserName(): string;
  getParserVersion(): string;
  parseDescriptorFile(descriptorPath: string): IXmlParsedElement | null;
  parseDescriptorContent(content: string): IXmlParsedElement;
  getSupportedDescriptorPatterns(): readonly string[];
  produceDeploymentPlan(): IEnterpriseDeploymentPlan;
}

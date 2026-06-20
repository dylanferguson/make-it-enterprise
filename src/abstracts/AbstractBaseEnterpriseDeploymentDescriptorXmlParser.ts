import type { IEnterpriseDeploymentDescriptorXmlParser } from "../contracts/IEnterpriseDeploymentDescriptorXmlParser.js";
import type { IXmlParsedElement } from "../contracts/IXmlParsedElement.js";
import type { IEnterpriseDeploymentPlan } from "../contracts/IEnterpriseDeploymentPlan.js";

export abstract class AbstractBaseEnterpriseDeploymentDescriptorXmlParser
  implements IEnterpriseDeploymentDescriptorXmlParser
{
  private readonly parserName: string;
  private readonly parserVersion: string;
  private readonly supportedPatterns: readonly string[];

  constructor(parserName: string, parserVersion: string, supportedPatterns: readonly string[]) {
    this.parserName = parserName;
    this.parserVersion = parserVersion;
    this.supportedPatterns = supportedPatterns;
  }

  getParserName(): string {
    return this.parserName;
  }

  getParserVersion(): string {
    return this.parserVersion;
  }

  abstract getSupportedDescriptorPatterns(): readonly string[];
  abstract parseDescriptorFile(descriptorPath: string): IXmlParsedElement | null;
  abstract parseDescriptorContent(content: string): IXmlParsedElement;
  abstract produceDeploymentPlan(): IEnterpriseDeploymentPlan;
}

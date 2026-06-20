import { AbstractBaseDeploymentDescriptorReader } from "../../abstracts/AbstractBaseDeploymentDescriptorReader.js";
import type { IDeploymentDescriptorEntry } from "../../contracts/IDeploymentDescriptorReader.js";
import type { IModuloArithmeticStrategyProvider } from "../../contracts/IModuloArithmeticStrategyProvider.js";
import type { IModuloArithmeticStrategy } from "../../contracts/IModuloArithmeticStrategy.js";
import { DefaultModuloArithmeticStrategyImpl } from "../strategies/DefaultModuloArithmeticStrategyImpl.js";
import type { IModuloEvaluationStrategyProvider } from "../../contracts/IModuloEvaluationStrategyProvider.js";

interface XmlBeanDefinition {
  beanName: string;
  beanClassName: string;
  initParameters: Record<string, string>;
  referenceNames: string[];
}

export class XmlDeploymentDescriptorReaderImpl extends AbstractBaseDeploymentDescriptorReader {
  private static readonly DESCRIPTOR_NAME = "FizzBuzzDeploymentDescriptor";
  private static readonly DESCRIPTOR_VERSION = "ejb-jar-2.0";

  private readonly evaluationStrategyProvider: IModuloEvaluationStrategyProvider;

  constructor(evaluationStrategyProvider: IModuloEvaluationStrategyProvider) {
    super();
    this.evaluationStrategyProvider = evaluationStrategyProvider;
  }

  override readDescriptor(): readonly IDeploymentDescriptorEntry[] {
    const rawXml = this.getEmbeddedDescriptorXml();
    const entries = this.parseDescriptorEntries(rawXml);
    this.logDescriptorParsing(entries.length);
    return entries.map((def) => ({
      getBeanName: () => def.beanName,
      getBeanClassName: () => def.beanClassName,
      getInitParameters: () => ({ ...def.initParameters }),
      getReferenceNames: () => [...def.referenceNames],
    }));
  }

  override getDescriptorName(): string {
    return XmlDeploymentDescriptorReaderImpl.DESCRIPTOR_NAME;
  }

  override getDescriptorVersion(): string {
    return XmlDeploymentDescriptorReaderImpl.DESCRIPTOR_VERSION;
  }

  override configureFromDescriptor(provider: IModuloArithmeticStrategyProvider): void {
    const entries = this.readDescriptor();
    for (const entry of entries) {
      const params = entry.getInitParameters();
      if (entry.getBeanClassName().includes("DefaultModuloArithmeticStrategy")) {
        const divisorStr = params["targetDivisor"];
        const divisor = divisorStr ? parseInt(divisorStr, 10) : NaN;
        if (!isNaN(divisor)) {
          const strategy: IModuloArithmeticStrategy = new DefaultModuloArithmeticStrategyImpl(
            this.evaluationStrategyProvider,
          );
          provider.registerStrategy(divisor, strategy);
          console.debug(
            `[DeploymentDescriptor] Registered DefaultModuloArithmeticStrategy for divisor ${divisor}`,
          );
        }
      }
    }
  }

  private getEmbeddedDescriptorXml(): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE ejb-jar PUBLIC "-//Sun Microsystems, Inc.//DTD Enterprise JavaBeans 2.0//EN" "http://java.sun.com/dtd/ejb-jar_2_0.dtd">
<ejb-jar>
  <enterprise-beans>
    <session>
      <ejb-name>FizzBuzzComputationService</ejb-name>
      <ejb-class>com.fizzbuzz.enterprise.ejb.FizzBuzzComputationServiceBean</ejb-class>
      <session-type>Stateless</session-type>
      <transaction-type>Container</transaction-type>
      <env-entry>
        <env-entry-name>applicationName</env-entry-name>
        <env-entry-type>java.lang.String</env-entry-type>
        <env-entry-value>FizzBuzzEnterpriseEdition</env-entry-value>
      </env-entry>
      <ejb-ref>
        <ejb-ref-name>ejb/ModuloEvaluationStrategy</ejb-ref-name>
        <ejb-ref-type>Session</ejb-ref-type>
        <home>com.fizzbuzz.enterprise.ejb.ModuloEvaluationStrategyHome</home>
        <remote>com.fizzbuzz.enterprise.ejb.ModuloEvaluationStrategy</remote>
      </ejb-ref>
    </session>
    <session>
      <ejb-name>ModuloEvaluationStrategyService</ejb-name>
      <ejb-class>com.fizzbuzz.enterprise.ejb.ModuloEvaluationStrategyServiceBean</ejb-class>
      <session-type>Stateless</session-type>
      <transaction-type>Container</transaction-type>
    </session>
  </enterprise-beans>
  <assembly-descriptor>
    <container-transaction>
      <method>
        <ejb-name>FizzBuzzComputationService</ejb-name>
        <method-name>*</method-name>
      </method>
      <trans-attribute>Required</trans-attribute>
    </container-transaction>
  </assembly-descriptor>
</ejb-jar>`;
  }

  private parseDescriptorEntries(xml: string): XmlBeanDefinition[] {
    const definitions: XmlBeanDefinition[] = [];
    const sessionPattern = /<session>([\s\S]*?)<\/session>/g;
    let match: RegExpExecArray | null;
    while ((match = sessionPattern.exec(xml)) !== null) {
      const block = match[1] ?? "";
      const beanName = this.extractTag(block, "ejb-name") ?? "UnknownBean";
      const beanClassName = this.extractTag(block, "ejb-class") ?? "UnknownClass";
      const envEntries: Record<string, string> = {};
      const envPattern = /<env-entry>[\s\S]*?<env-entry-name>([\s\S]*?)<\/env-entry-name>[\s\S]*?<env-entry-value>([\s\S]*?)<\/env-entry-value>[\s\S]*?<\/env-entry>/g;
      let envMatch: RegExpExecArray | null;
      while ((envMatch = envPattern.exec(block)) !== null) {
        const envName = envMatch[1];
        const envValue = envMatch[2];
        if (envName !== undefined && envValue !== undefined) {
          envEntries[envName.trim()] = envValue.trim();
        }
      }
      const refNames: string[] = [];
      const refPattern = /<ejb-ref-name>([\s\S]*?)<\/ejb-ref-name>/g;
      let refMatch: RegExpExecArray | null;
      while ((refMatch = refPattern.exec(block)) !== null) {
        const refName = refMatch[1];
        if (refName !== undefined) {
          refNames.push(refName.trim());
        }
      }
      definitions.push({
        beanName,
        beanClassName,
        initParameters: envEntries,
        referenceNames: refNames,
      });
    }
    return definitions;
  }

  private extractTag(xml: string, tag: string): string | null {
    const pattern = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`);
    const execMatch = pattern.exec(xml);
    if (execMatch === null) return null;
    const content = execMatch[1];
    return content !== undefined ? content.trim() : null;
  }
}

import { AbstractBaseEnterpriseDeploymentDescriptorXmlParser } from "../../../abstracts/AbstractBaseEnterpriseDeploymentDescriptorXmlParser.js";
import type { IXmlParsedElement } from "../../../contracts/IXmlParsedElement.js";
import { XmlParsedElementImpl } from "./XmlParsedElementImpl.js";
import { EnterpriseDeploymentPlanImpl } from "../EnterpriseDeploymentPlanImpl.js";
import type { IEnterpriseDeploymentPlan } from "../../../contracts/IEnterpriseDeploymentPlan.js";
import * as fs from "node:fs";
import * as path from "node:path";

export class DeploymentDescriptorXmlDomParserImpl extends AbstractBaseEnterpriseDeploymentDescriptorXmlParser {
  private static readonly PARSER_NAME = "DeploymentDescriptorXmlDomParser";
  private static readonly PARSER_VERSION = "1.0.0-XML-DOM-PARSER";
  private static readonly SUPPORTED_PATTERNS: readonly string[] = [
    "META-INF/ejb-jar.xml",
    "META-INF/application.xml",
    "META-INF/persistence.xml",
    "META-INF/beans.xml",
    "META-INF/fizzbuzz-modulo-strategy-definitions.xml",
    "META-INF/fizzbuzz-output-normalization-definitions.xml",
  ];

  private readonly parsedDescriptors: Map<string, IXmlParsedElement> = new Map();
  private deploymentPlan: IEnterpriseDeploymentPlan | null = null;

  constructor() {
    super(
      DeploymentDescriptorXmlDomParserImpl.PARSER_NAME,
      DeploymentDescriptorXmlDomParserImpl.PARSER_VERSION,
      DeploymentDescriptorXmlDomParserImpl.SUPPORTED_PATTERNS,
    );
  }

  override getSupportedDescriptorPatterns(): readonly string[] {
    return DeploymentDescriptorXmlDomParserImpl.SUPPORTED_PATTERNS;
  }

  override parseDescriptorFile(descriptorPath: string): IXmlParsedElement | null {
    try {
      const resolvedPath = path.resolve(descriptorPath);
      if (!fs.existsSync(resolvedPath)) {
        console.debug(`[${this.getParserName()}] Descriptor file not found: ${descriptorPath}`);
        return null;
      }
      const content = fs.readFileSync(resolvedPath, "utf-8");
      const parsed = this.parseDescriptorContent(content);
      this.parsedDescriptors.set(descriptorPath, parsed);
      console.debug(
        `[${this.getParserName()}] Parsed descriptor: ${descriptorPath} (${parsed.tagName}, ${parsed.children.length} child elements)`,
      );
      return parsed;
    } catch (error) {
      console.warn(
        `[${this.getParserName()}] Failed to parse descriptor: ${descriptorPath}: ${error instanceof Error ? error.message : String(error)}`,
      );
      return null;
    }
  }

  override parseDescriptorContent(content: string): IXmlParsedElement {
    let cleanedContent = this.stripXmlDeclaration(content);
    cleanedContent = this.stripDocType(cleanedContent);
    const trimmedContent = cleanedContent.trim();
    const root = this.parseElement(trimmedContent, 0);
    return root.element;
  }

  override produceDeploymentPlan(): IEnterpriseDeploymentPlan {
    if (this.deploymentPlan === null) {
      this.deploymentPlan = new EnterpriseDeploymentPlanImpl(
        "FizzBuzzEnterpriseDeploymentPlan",
        "1.0.0-DEPLOYMENT-PLAN",
      );
      for (const [name, element] of this.parsedDescriptors.entries()) {
        this.deploymentPlan.registerDescriptor(name, element);
      }
    }
    return this.deploymentPlan;
  }

  private stripXmlDeclaration(xml: string): string {
    const declMatch = xml.match(/^<\?xml\s+[^?]+\?>\s*/);
    if (declMatch) {
      return xml.slice(declMatch[0].length);
    }
    return xml;
  }

  private stripDocType(xml: string): string {
    let result = xml;
    const doctypeRegex = /<!DOCTYPE[\s\S]*?>/;
    const doctypeMatch = result.match(doctypeRegex);
    if (doctypeMatch) {
      result = result.slice(0, doctypeMatch.index) + result.slice(doctypeMatch.index! + doctypeMatch[0].length);
    }
    return result;
  }

  private parseElement(xml: string, startIndex: number): { element: IXmlParsedElement; endIndex: number } {
    const tagStartMatch = xml.slice(startIndex).match(/<([!?])/);
    if (tagStartMatch && tagStartMatch.index === 0) {
      const ch = tagStartMatch[1];
      if (ch === "!") {
        const commentEnd = xml.indexOf("-->", startIndex);
        if (commentEnd !== -1) {
          return this.parseElement(xml, commentEnd + 3);
        }
      }
      if (ch === "?") {
        const piEnd = xml.indexOf("?>", startIndex);
        if (piEnd !== -1) {
          return this.parseElement(xml, piEnd + 2);
        }
      }
    }

    const openTagMatch = xml.slice(startIndex).match(/<(\w[\w.-]*)([^>]*)\/?\s*>/);
    if (!openTagMatch || openTagMatch.index !== 0) {
      const textEnd = xml.indexOf("<", startIndex);
      if (textEnd === -1) {
        const textContent = xml.slice(startIndex).trim();
        return {
          element: new XmlParsedElementImpl("#text", new Map(), textContent, []),
          endIndex: xml.length,
        };
      }
      const textContent = xml.slice(startIndex, textEnd).trim();
      if (textContent.length > 0) {
        const nextResult = this.parseElement(xml, textEnd);
        return {
          element: nextResult.element,
          endIndex: nextResult.endIndex,
        };
      }
      return this.parseElement(xml, textEnd);
    }

    const tagName = openTagMatch[1]!;
    const attrString = openTagMatch[2]!;
    const isSelfClosing = openTagMatch[0].endsWith("/>");

    const attributes = this.parseAttributes(attrString);

    if (isSelfClosing) {
      const endIndex = startIndex + openTagMatch[0].length;
      return {
        element: new XmlParsedElementImpl(tagName!, attributes, "", []),
        endIndex,
      };
    }

    const contentStart = startIndex + openTagMatch[0].length;
    const closeTag = `</${tagName}>`;

    const children: IXmlParsedElement[] = [];
    let idx = contentStart;
    let textBuffer = "";

    while (idx < xml.length) {
      const nextOpen = xml.indexOf("<", idx);
      if (nextOpen === -1) break;

      const closeTagCheck = xml.slice(nextOpen).match(`^</${tagName}\\s*>`);
      if (closeTagCheck) {
        const trimmedText = textBuffer.trim();
        if (trimmedText.length > 0) {
          children.push(new XmlParsedElementImpl("#text", new Map(), trimmedText, []));
        }
        const endIndex = nextOpen + closeTagCheck[0].length;
        return {
          element: new XmlParsedElementImpl(tagName, attributes, textBuffer.trim(), children),
          endIndex,
        };
      }

      textBuffer += xml.slice(idx, nextOpen);

      const childResult = this.parseElement(xml, nextOpen);
      const trimmedText = textBuffer.trim();
      if (trimmedText.length > 0) {
        children.push(new XmlParsedElementImpl("#text", new Map(), trimmedText, []));
        textBuffer = "";
      }
      children.push(childResult.element);
      idx = childResult.endIndex;
      textBuffer = "";
    }

    return {
      element: new XmlParsedElementImpl(tagName, attributes, "", children),
      endIndex: idx,
    };
  }

  private parseAttributes(attrString: string): Map<string, string> {
    const attrs = new Map<string, string>();
    const attrRegex = /(\w[\w:-]*)\s*=\s*"([^"]*)"|(\w[\w:-]*)\s*=\s*'([^']*)'/g;
    let match: RegExpExecArray | null;
    while ((match = attrRegex.exec(attrString)) !== null) {
      if (match[1] !== undefined) {
        attrs.set(match[1], match[2] ?? "");
      } else if (match[3] !== undefined) {
        attrs.set(match[3], match[4] ?? "");
      }
    }
    return attrs;
  }
}

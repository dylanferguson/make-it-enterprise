import type { IEnterpriseFizzBuzzCompositeStrategyTree } from "../../contracts/IEnterpriseFizzBuzzCompositeStrategyTree.js";
import { CompositeStrategyTreeBuilderImpl } from "../composite/CompositeStrategyTreeBuilderImpl.js";
import { CompositeStrategyResolutionDelegateImpl } from "../composite/CompositeStrategyResolutionDelegateImpl.js";
import { EnterpriseFizzBuzzCompositeStrategyTreeImpl } from "../composite/EnterpriseFizzBuzzCompositeStrategyTreeImpl.js";
import { CompositeStrategyTreeLeafNodeImpl } from "../composite/CompositeStrategyTreeLeafNodeImpl.js";
import { CompositeStrategyTreeBranchNodeImpl } from "../composite/CompositeStrategyTreeBranchNodeImpl.js";
import { DefaultNumberCompositeStrategyLeafNodeImpl } from "../composite/DefaultNumberCompositeStrategyLeafNodeImpl.js";

export enum CompositeStrategyTreeConfigurationProfile {
  STANDARD_FIZZBUZZ = "STANDARD_FIZZBUZZ",
  FIZZ_ONLY = "FIZZ_ONLY",
  BUZZ_ONLY = "BUZZ_ONLY",
  REVERSE_PRIORITY = "REVERSE_PRIORITY",
}

export class CompositeStrategyTreeFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "CompositeStrategyTreeFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-COMPOSITE-FACTORY";

  private static instance: IEnterpriseFizzBuzzCompositeStrategyTree | null = null;
  private static currentProfile: CompositeStrategyTreeConfigurationProfile =
    CompositeStrategyTreeConfigurationProfile.STANDARD_FIZZBUZZ;

  static createCompositeStrategyTree(
    profile: CompositeStrategyTreeConfigurationProfile = CompositeStrategyTreeConfigurationProfile.STANDARD_FIZZBUZZ,
  ): IEnterpriseFizzBuzzCompositeStrategyTree {
    if (
      CompositeStrategyTreeFactoryBeanFactory.instance === null ||
      CompositeStrategyTreeFactoryBeanFactory.currentProfile !== profile
    ) {
      CompositeStrategyTreeFactoryBeanFactory.currentProfile = profile;
      CompositeStrategyTreeFactoryBeanFactory.instance =
        CompositeStrategyTreeFactoryBeanFactory.buildCompositeTreeForProfile(profile);
    }
    return CompositeStrategyTreeFactoryBeanFactory.instance;
  }

  static resetCompositeStrategyTree(): void {
    CompositeStrategyTreeFactoryBeanFactory.instance = null;
    CompositeStrategyTreeFactoryBeanFactory.currentProfile =
      CompositeStrategyTreeConfigurationProfile.STANDARD_FIZZBUZZ;
  }

  static getCurrentProfile(): CompositeStrategyTreeConfigurationProfile {
    return CompositeStrategyTreeFactoryBeanFactory.currentProfile;
  }

  static getFactoryBeanName(): string {
    return CompositeStrategyTreeFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return CompositeStrategyTreeFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }

  private static buildCompositeTreeForProfile(
    profile: CompositeStrategyTreeConfigurationProfile,
  ): IEnterpriseFizzBuzzCompositeStrategyTree {
    const delegate = new CompositeStrategyResolutionDelegateImpl();

    switch (profile) {
      case CompositeStrategyTreeConfigurationProfile.STANDARD_FIZZBUZZ: {
        const fizzLeaf = new CompositeStrategyTreeLeafNodeImpl("fizzDivisibleByThree", 3, "Fizz", 50);
        const buzzLeaf = new CompositeStrategyTreeLeafNodeImpl("buzzDivisibleByFive", 5, "Buzz", 40);
        const fizzBuzzCombination = new CompositeStrategyTreeBranchNodeImpl(
          "fizzBuzzCombination",
          100,
          "APPEND",
        );
        fizzBuzzCombination.addChild(fizzLeaf);
        fizzBuzzCombination.addChild(buzzLeaf);

        const defaultLeaf = new DefaultNumberCompositeStrategyLeafNodeImpl();

        const root = new CompositeStrategyTreeBranchNodeImpl(
          "fizzBuzzEvaluationRoot",
          1000,
          "FIRST_MATCH",
        );
        root.addChild(fizzBuzzCombination);
        root.addChild(defaultLeaf);

        return new EnterpriseFizzBuzzCompositeStrategyTreeImpl(root, delegate);
      }
      case CompositeStrategyTreeConfigurationProfile.FIZZ_ONLY: {
        const fizzLeaf = new CompositeStrategyTreeLeafNodeImpl("fizzDivisibleByThree", 3, "Fizz", 50);
        const defaultLeaf = new DefaultNumberCompositeStrategyLeafNodeImpl();
        const root = new CompositeStrategyTreeBranchNodeImpl("fizzOnlyRoot", 1000, "FIRST_MATCH");
        root.addChild(fizzLeaf);
        root.addChild(defaultLeaf);
        return new EnterpriseFizzBuzzCompositeStrategyTreeImpl(root, delegate);
      }
      case CompositeStrategyTreeConfigurationProfile.BUZZ_ONLY: {
        const buzzLeaf = new CompositeStrategyTreeLeafNodeImpl("buzzDivisibleByFive", 5, "Buzz", 40);
        const defaultLeaf = new DefaultNumberCompositeStrategyLeafNodeImpl();
        const root = new CompositeStrategyTreeBranchNodeImpl("buzzOnlyRoot", 1000, "FIRST_MATCH");
        root.addChild(buzzLeaf);
        root.addChild(defaultLeaf);
        return new EnterpriseFizzBuzzCompositeStrategyTreeImpl(root, delegate);
      }
      case CompositeStrategyTreeConfigurationProfile.REVERSE_PRIORITY: {
        const buzzLeaf = new CompositeStrategyTreeLeafNodeImpl("buzzDivisibleByFive", 5, "Buzz", 50);
        const fizzLeaf = new CompositeStrategyTreeLeafNodeImpl("fizzDivisibleByThree", 3, "Fizz", 40);
        const fizzBuzzCombination = new CompositeStrategyTreeBranchNodeImpl(
          "fizzBuzzCombination",
          100,
          "APPEND",
        );
        fizzBuzzCombination.addChild(buzzLeaf);
        fizzBuzzCombination.addChild(fizzLeaf);
        const defaultLeaf = new DefaultNumberCompositeStrategyLeafNodeImpl();
        const root = new CompositeStrategyTreeBranchNodeImpl("reversePriorityRoot", 1000, "FIRST_MATCH");
        root.addChild(fizzBuzzCombination);
        root.addChild(defaultLeaf);
        return new EnterpriseFizzBuzzCompositeStrategyTreeImpl(root, delegate);
      }
      default: {
        const fizzLeaf = new CompositeStrategyTreeLeafNodeImpl("fizzDivisibleByThree", 3, "Fizz", 50);
        const buzzLeaf = new CompositeStrategyTreeLeafNodeImpl("buzzDivisibleByFive", 5, "Buzz", 40);
        const defaultLeaf = new DefaultNumberCompositeStrategyLeafNodeImpl();
        const root = new CompositeStrategyTreeBranchNodeImpl("defaultRoot", 1000, "FIRST_MATCH");
        root.addChild(fizzLeaf);
        root.addChild(buzzLeaf);
        root.addChild(defaultLeaf);
        return new EnterpriseFizzBuzzCompositeStrategyTreeImpl(root, delegate);
      }
    }
  }
}

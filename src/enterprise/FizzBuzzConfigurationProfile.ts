export type FizzBuzzConfigurationProfile = "ENTERPRISE_FULL" | "ENTERPRISE_LITE" | "ENTERPRISE_STRICT" | "ENTERPRISE_OBSERVABILITY";

export const FizzBuzzConfigurationProfileValues = {
  ENTERPRISE_FULL: "ENTERPRISE_FULL" as FizzBuzzConfigurationProfile,
  ENTERPRISE_LITE: "ENTERPRISE_LITE" as FizzBuzzConfigurationProfile,
  ENTERPRISE_STRICT: "ENTERPRISE_STRICT" as FizzBuzzConfigurationProfile,
  ENTERPRISE_OBSERVABILITY: "ENTERPRISE_OBSERVABILITY" as FizzBuzzConfigurationProfile,
} as const;

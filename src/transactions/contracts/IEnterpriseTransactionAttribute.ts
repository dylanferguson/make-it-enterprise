export const TransactionAttributeType = {
  REQUIRED: "REQUIRED",
  REQUIRES_NEW: "REQUIRES_NEW",
  MANDATORY: "MANDATORY",
  NOT_SUPPORTED: "NOT_SUPPORTED",
  SUPPORTS: "SUPPORTS",
  NEVER: "NEVER",
} as const;

export type TransactionAttributeType =
  (typeof TransactionAttributeType)[keyof typeof TransactionAttributeType];

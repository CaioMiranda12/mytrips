// styles/inputVariants.ts
export type InputColorVariant = "default" | "blue" | "green" | "red";

export const inputVariants: Record<InputColorVariant, string> = {
  default:
    "focus:ring-cyan-500 focus:border-transparent",
  blue:
    "focus:ring-blue-500 focus:border-transparent",
  green:
    "focus:ring-green-500 focus:border-transparent",
  red:
    "focus:ring-red-500 focus:border-transparent"
};

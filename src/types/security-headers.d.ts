declare module "*.mjs" {
  export const securityHeaders: Array<{
    key: string;
    value: string;
  }>;
}

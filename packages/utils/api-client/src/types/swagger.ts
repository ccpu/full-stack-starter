export interface SwaggerInfo {
  title: string;
  description: string;
  version: string;
  contact?: Record<string, unknown>;
}

export type SwaggerPath = Record<
  string,
  {
    operationId?: string;
    parameters?: unknown[];
    responses?: Record<string, unknown>;
    summary?: string;
    tags?: string[];
  }
>;

export interface Swagger {
  openapi: string;
  info: SwaggerInfo;
  paths: Record<string, SwaggerPath>;
  tags?: unknown[];
  servers?: unknown[];
  components?: {
    schemas?: Record<string, unknown>;
  };
}

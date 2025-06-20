/* eslint-disable @typescript-eslint/no-explicit-any */
export interface SwaggerInfo {
  title: string;
  description: string;
  version: string;
  contact?: Record<string, any>;
}

export type SwaggerPath = Record<
  string,
  {
    operationId?: string;
    parameters?: any[];
    responses?: Record<string, any>;
    summary?: string;
    tags?: string[];
  }
>;

export interface Swagger {
  openapi: string;
  info: SwaggerInfo;
  paths: Record<string, SwaggerPath>;
  tags?: any[];
  servers?: any[];
  components?: {
    schemas?: Record<string, any>;
  };
}

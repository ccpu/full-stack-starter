import { z } from 'zod/v4';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  // Add other server environment variables here as needed
});

export const env = envSchema.parse(process.env);

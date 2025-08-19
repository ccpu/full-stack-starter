import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import config from '../config/defaults.cjs';

import { AppModule } from './app.module';
import { env } from './env';

// Constants
const JSON_INDENT_SPACES = 2;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());

  // Set global prefix for all routes
  app.setGlobalPrefix('api');
  if (env.NODE_ENV !== 'production') {
    // Swagger configuration
    const swaggerConfig = new DocumentBuilder()
      .setTitle('API Documentation')
      .setDescription('The API description')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);

    // Save Swagger JSON to root directory
    const swaggerJson = JSON.stringify(document, null, JSON_INDENT_SPACES);
    const rootDir = join(__dirname, '..');
    const swaggerPath = join(rootDir, 'swagger.json');
    writeFileSync(swaggerPath, swaggerJson);
    console.warn(`Swagger JSON saved to: ${swaggerPath}`);
    console.warn(swaggerPath);

    // Serve Swagger at /docs instead of /api
    SwaggerModule.setup('docs', app, document);
  }

  const port = config.getPort();
  const host = '0.0.0.0';

  await app.listen(port, host);
  const appHost = config.getHost();
  const appUrl = `http://${appHost}:${port}`;

  const BOX_WIDTH = 44;
  console.warn(`┌${'─'.repeat(BOX_WIDTH)}┐`);
  console.warn(`│ Application: ${appUrl}/api    │`);
  if (env.NODE_ENV !== 'production') {
    console.warn(`│     Swagger: ${appUrl}/docs   │`);
  }
  console.warn(`└${'─'.repeat(BOX_WIDTH)}┘`);
}

bootstrap().catch((err) => {
  console.error('NestJS Fastify bootstrap error:', err);
  process.exit(1);
});

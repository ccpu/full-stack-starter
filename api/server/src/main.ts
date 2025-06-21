import { writeFileSync } from "fs";
import { join } from "path";
import { NestFactory } from "@nestjs/core";
import { FastifyAdapter } from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());

  // Set global prefix for all routes
  app.setGlobalPrefix("api");

  if (process.env.NODE_ENV !== "production") {
    // Swagger configuration
    const config = new DocumentBuilder()
      .setTitle("API Documentation")
      .setDescription("The API description")
      .setVersion("1.0")
      .build();
    const document = SwaggerModule.createDocument(app, config);

    // Save Swagger JSON to root directory
    const swaggerJson = JSON.stringify(document, null, 2);
    const rootDir = join(__dirname, "..");
    const swaggerPath = join(rootDir, "swagger.json");
    writeFileSync(swaggerPath, swaggerJson);
    console.log(`\x1b[36mSwagger JSON saved to: ${swaggerPath}\x1b[0m`);
    console.log(swaggerPath);

    // Serve Swagger at /docs instead of /api
    SwaggerModule.setup("docs", app, document);
  }

  const port = process.env.PORT ? Number(process.env.PORT) : 49252;
  const host = "0.0.0.0";

  await app.listen(port, host);
  console.log("\x1b[32m" + "┌" + "─".repeat(44) + "┐\x1b[0m");
  console.log(
    `\x1b[32m│ Application: http://localhost:${port}/api     │\x1b[0m`,
  );
  if (process.env.NODE_ENV !== "production") {
    console.log(
      `\x1b[32m│     Swagger: http://localhost:${port}/docs    │\x1b[0m`,
    );
  }
  console.log("\x1b[32m" + "└" + "─".repeat(44) + "┘\x1b[0m");
}

bootstrap().catch((err) => {
  console.error("NestJS Fastify bootstrap error:", err);
  process.exit(1);
});

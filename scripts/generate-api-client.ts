#!/usr/bin/env node
import { generateClientApi } from "./api-client/generate-client.js";
import { resolveFromRoot } from "./utils/index.js";

// Parse arguments properly
const args = process.argv.slice(2);
const force = args.includes("--force") || args.includes("-f");
const swaggerFileArg = args.find(
  (arg) => !arg.startsWith("--") && !arg.startsWith("-"),
);
const swaggerFile = swaggerFileArg || "api/server/swagger.json";

generateClientApi(resolveFromRoot(swaggerFile), force);

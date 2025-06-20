#!/usr/bin/env node
import {
  generateClientApi,
  resolveFromRoot,
} from "../packages/utils/api-client/src/index.js";

// Parse arguments properly
const args = process.argv.slice(2);
const force = args.includes("--force") || args.includes("-f");
const swaggerFileArg = args.find(
  (arg) => !arg.startsWith("--") && !arg.startsWith("-"),
);
const swaggerFile = swaggerFileArg ?? "api/server/swagger.json";

generateClientApi(resolveFromRoot(swaggerFile), force);

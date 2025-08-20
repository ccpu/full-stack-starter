#!/usr/bin/env node

/**
 * Docker Health Check Script
 *
 * This script checks if the NestJS application is healthy by making
 * an HTTP request to the /health endpoint (using @nestjs/terminus).
 *
 * Configuration logic matches AppConfig.ts to ensure consistency:
 * - Port: process.env.PORT || 49252
 * - Host: process.env.HOST || "localhost"
 */

const http = require('node:http');
const process = require('node:process');
const config = require('../config/defaults.cjs');

const { STATUS_OK } = http;

const options = {
  hostname: config.server.host,
  port: config.getPort(),
  path: config.getFullHealthPath(),
  method: 'GET',
  timeout: 3000,
};

const healthCheck = http.request(options, (res) => {
  if (res.statusCode === STATUS_OK) {
    process.exit(0);
  } else {
    process.exit(1);
  }
});

healthCheck.on('error', (err) => {
  console.error(`Health check failed: ${err.message}`);
  process.exit(1);
});

healthCheck.on('timeout', () => {
  console.error('Health check timed out');
  healthCheck.destroy();
  process.exit(1);
});

healthCheck.end();

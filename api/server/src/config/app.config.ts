import config from "./config.json";

/**
 * Application configuration
 * Centralized configuration for port, host, and other app settings
 */

const defaultPort = config.server.port as number;

const AppConfig = {
  /**
   * Get the port from environment variable or default to value from default-port.json
   */
  getPort(): number {
    return process.env.PORT ? Number(process.env.PORT) : defaultPort;
  },

  /**
   * Get the host from environment variable or default to localhost
   */
  getHost(): string {
    return process.env.HOST || config.server.host;
  },

  /**
   * Get the base URL for the application
   */
  getBaseUrl(): string {
    const port = AppConfig.getPort();
    return `http://${AppConfig.getHost()}:${port}`;
  },

  /**
   * Get the API base URL
   */
  getApiBaseUrl(): string {
    return `${AppConfig.getBaseUrl()}/api`;
  },

  /**
   * Get the health check URL
   */
  getHealthUrl(): string {
    return `${AppConfig.getApiBaseUrl()}/health`;
  },

  /**
   * Check if running in production
   */
  isProduction(): boolean {
    return process.env.NODE_ENV === "production";
  },
};

export { AppConfig };

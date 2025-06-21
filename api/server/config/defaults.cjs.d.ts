declare const config: {
  server: {
    port: number;
    host: string;
    basePrefix: string;
  };
  health: {
    path: string;
  };
  getPort: () => number;
  getHost: () => string;
  getFullHealthPath: () => string;
};

export = config;

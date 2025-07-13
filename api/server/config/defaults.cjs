// ╔══════════════════════════════════════════════════════════════════════╗
// ║ ⚠️  WARNING: No secrets should be added to this file!               ║
// ║      This file is ONLY for basic configs.                            ║
// ╚══════════════════════════════════════════════════════════════════════╝
module.exports = {
  server: {
    port: 49252,
    host: 'localhost',
    basePrefix: '/api',
  },
  health: {
    path: '/health',
  },

  // Helper functions
  getPort: function () {
    return process.env.PORT ?? this.server.port;
  },

  getHost: function () {
    return process.env.HOST ?? this.server.host;
  },

  getFullHealthPath: function () {
    return `${this.server.basePrefix}${this.health.path}`;
  },
};

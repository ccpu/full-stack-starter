import { Controller, Get, ServiceUnavailableException } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { HealthCheckService, MemoryHealthIndicator } from "@nestjs/terminus";
import { Throttle } from "@nestjs/throttler";

@ApiTags("health")
@Controller("health")
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private memory: MemoryHealthIndicator,
  ) {}

  @Get()
  @Throttle({ default: { limit: 20, ttl: 30000 } }) // 20 requests every 30 seconds
  @ApiOperation({ summary: "Service status check" })
  @ApiResponse({ status: 200, description: "Service is available" })
  @ApiResponse({ status: 503, description: "Service is unavailable" })
  @ApiResponse({ status: 429, description: "Too many requests" })
  async check() {
    try {
      await this.health.check([
        // Check that we don't use more than 1GB heap memory (generous limit)
        () => this.memory.checkHeap("memory_heap", 1024 * 1024 * 1024),
        // Check that we don't use more than 2GB RSS memory (generous limit)
        () => this.memory.checkRSS("memory_rss", 2048 * 1024 * 1024),
        // Note: Disk check removed for compatibility - can be added back with proper configuration
      ]);

      return { status: "ok" };
    } catch {
      throw new ServiceUnavailableException({ status: "error" });
    }
  }
}

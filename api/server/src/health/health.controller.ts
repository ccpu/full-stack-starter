import type { HealthCheckService, MemoryHealthIndicator } from '@nestjs/terminus';
import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

// eslint-disable-next-line no-magic-numbers
const ONE_GB = 1024 * 1024 * 1024;
// eslint-disable-next-line no-magic-numbers
const TWO_GB = 2048 * 1024 * 1024;

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private memory: MemoryHealthIndicator,
  ) {}

  @Get()
  @Throttle({ default: { limit: 20, ttl: 30000 } }) // 20 requests every 30 seconds
  @ApiOperation({ summary: 'Service status check' })
  @ApiResponse({ status: 200, description: 'Service is available' })
  @ApiResponse({ status: 503, description: 'Service is unavailable' })
  @ApiResponse({ status: 429, description: 'Too many requests' })
  async check(): Promise<{ status: string }> {
    try {
      await this.health.check([
        // Check that we don't use more than 1GB heap memory (generous limit)
        async () => this.memory.checkHeap('memory_heap', ONE_GB),
        // Check that we don't use more than 2GB RSS memory (generous limit)
        async () => this.memory.checkRSS('memory_rss', TWO_GB),
        // Note: Disk check removed for compatibility - can be added back with proper configuration
      ]);

      return { status: 'ok' };
    } catch {
      throw new ServiceUnavailableException({ status: 'error' });
    }
  }
}

import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { cn } from "@utils/tailwind";

import { AppService } from "./app.service";

@ApiTags("app")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: "Get hello message" })
  @ApiResponse({ status: 200, description: "Returns a hello message" })
  getHello(): string {
    console.log(cn("foo", "bar", "baz"));
    return this.appService.getHello();
  }
}

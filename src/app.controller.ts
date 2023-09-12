import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { BlockCallSchema } from './kernel/process/block-schema.interface';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('script-kernel.get-hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('script-kernel.get-all-modules-keys')
  getAllModulesKeys() {
    return this.appService.getAllModulesKeys();
  }

  @MessagePattern('script-kernel.get-all-module-functions')
  getAllModuleFunctionsByModuleTag(@Payload('module_tag') module_tag: string) {
    return this.appService.getAllModuleFunctionsByModuleTag(module_tag);
  }

  @MessagePattern('script-kernel.create-script-process')
  createScriptProcess(arg: {
    blockCallSchema: BlockCallSchema;
    is_testingMode: boolean;
    script_arguments: Record<string, any>;
  }) {
    return this.appService.createScriptProcess(arg);
  }
}

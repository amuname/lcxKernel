import { Inject, Injectable } from '@nestjs/common';
// import { ModuleRegistryService } from './module-registry/module-registry.service';
import { moduleRegistry } from './kernel/module-registry/module-registry';
import { AppProcess } from './kernel/process/app-process';
import { BlockCallSchema } from './kernel/process/block-schema.interface';
import { AppProcessContext } from './kernel/process/app-context';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  private readonly moduleRegistry = moduleRegistry;
  private readonly appProcess = AppProcess;
  private readonly appProcessContext = AppProcessContext;
  constructor(@Inject('TRANSPORT') private transport: ClientProxy) {}
  // constructor() {}

  getHello(): string {
    return 'Hello World!';
  }

  async getAllModulesKeys() {
    console.log('getAllModulesKeys', this.moduleRegistry.allModulesKeys);
    return this.moduleRegistry.allModulesKeys;
  }

  async getAllModuleFunctionsByModuleTag(module_tag: string) {
    return this.moduleRegistry.getModuleFunctionsByTag(module_tag);
  }

  async createScriptProcess({
    blockCallSchema,
    is_testingMode,
    script_arguments,
  }: {
    blockCallSchema: BlockCallSchema;
    is_testingMode: boolean;
    script_arguments: Record<string, Record<string, any>>;
  }) {
    const ctx = await this.createProcessContext(
      is_testingMode,
      script_arguments,
    );
    const block_call_schema =
      typeof blockCallSchema === 'string'
        ? JSON.parse(blockCallSchema)
        : blockCallSchema;

    const app_process = new this.appProcess(block_call_schema, ctx);
    const result = await app_process.call();
    // this.logResult(result);
    return result.get('end');
  }

  async createProcessContext(
    is_testing_mode: boolean,
    script_arguments: Record<string, Record<string, any>>,
  ) {
    return new this.appProcessContext(
      this.transport,
      is_testing_mode,
      script_arguments,
    );
  }
}

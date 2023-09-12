import { ApplicationModule } from '../application-module/application-module';
import { conditionBlockModule } from '../implementation/condition-module/condition-module';
import { functionBlockModule } from '../implementation/function-block-module/function-block-module';
import { functionModule } from '../implementation/function-module/function-module';
import { mathModule } from '../implementation/math-module/math-module';
import { numberModule } from '../implementation/number-module/number-module';
import { objectModule } from '../implementation/object-module/object-module';
import { scriptModule } from '../implementation/script-module/script-module';
import { startEndModule } from '../implementation/start-end-module/start-end-module';
import { stringModule } from '../implementation/string-module/string-module';

export class ModuleRegistry {
  private application_modules: Map<string, ApplicationModule>;

  constructor() {
    this.application_modules = new Map<string, ApplicationModule>();
    this.add(startEndModule.module_tag, startEndModule);
    this.add(conditionBlockModule.module_tag, conditionBlockModule);
    this.add(functionBlockModule.module_tag, functionBlockModule);
    this.add(functionModule.module_tag, functionModule);
    this.add(mathModule.module_tag, mathModule);
    this.add(numberModule.module_tag, numberModule);
    this.add(objectModule.module_tag, objectModule);
    this.add(scriptModule.module_tag, scriptModule);
    this.add(stringModule.module_tag, stringModule);
  }

  private add(key: string, app_module: ApplicationModule): void {
    if (!(app_module instanceof ApplicationModule)) {
      throw new Error('Invalid module');
    }
    this.application_modules.set(key, app_module);
  }

  public get(key: string): ApplicationModule {
    if (!this.application_modules.has(key)) {
      throw new Error('Invalid module');
    } else {
      const app_module = this.application_modules.get(key);
      if (!(app_module instanceof ApplicationModule))
        throw new Error('Invalid module');
      else return app_module;
    }
  }

  get allModulesKeys() {
    return [...this.application_modules.keys()];
  }

  public getModuleFunctionsByTag(module_tag: string) {
    return this.application_modules.get(module_tag).getWrapperBlocks();
  }
}

export const moduleRegistry = new ModuleRegistry();

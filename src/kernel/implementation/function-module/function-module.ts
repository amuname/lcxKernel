import { ApplicationModule } from '../../application-module/application-module';
import { Apply } from './apply/apply';
import { ExecuteFunction } from './execute-function/execute-function';
import { GetFunction } from './get-function/get-function';
// import { moduleRegistry } from '../../module-registry/module-registry';

export const functionModule = new ApplicationModule('Function');

// moduleRegistry.add(functionModule.module_tag, functionModule);

functionModule.add(Apply.name, new Apply());
functionModule.add(ExecuteFunction.name, new ExecuteFunction());
functionModule.add(GetFunction.name, new GetFunction());

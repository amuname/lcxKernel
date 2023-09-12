import { ApplicationModule } from '../../application-module/application-module';
import { ApplyBlock } from './apply/apply-block';
import { ExecuteFunction } from './execute-function/execute-function';
// import { moduleRegistry } from '../../module-registry/module-registry';

export const functionBlockModule = new ApplicationModule('FunctionBlock');

functionBlockModule.add(ApplyBlock.name, new ApplyBlock());
functionBlockModule.add(ExecuteFunction.name, new ExecuteFunction());
functionBlockModule.add(ApplyBlock.name, new ApplyBlock());
// moduleRegistry.add(functionBlockModule.module_tag, functionBlockModule);

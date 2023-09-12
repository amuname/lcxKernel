import { ApplicationModule } from '../../application-module/application-module';
import { IfElseCondition } from './if-else-module/if-else';
import { IfCondition } from './if-module/if-block';
// import { moduleRegistry } from '../../module-registry/module-registry';

export const conditionBlockModule = new ApplicationModule('ConditionBlock');

conditionBlockModule.add(IfElseCondition.name, new IfElseCondition());
conditionBlockModule.add(IfCondition.name, new IfCondition());
// moduleRegistry.add(conditionBlockModule.module_tag, conditionBlockModule);

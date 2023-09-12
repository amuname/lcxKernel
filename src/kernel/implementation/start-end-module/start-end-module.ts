import { ApplicationModule } from '../../application-module/application-module';
import { End } from './end-proc/end-proc';
import { Start } from './start-proc/start-proc';
// import { moduleRegistry } from '../../module-registry/module-registry';

export const startEndModule = new ApplicationModule('StartEnd');

startEndModule.add(Start.name, new Start());
startEndModule.add(End.name, new End());

// moduleRegistry.add(conditionBlockModule.module_tag, conditionBlockModule);

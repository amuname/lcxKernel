import { ApplicationModule } from '../../application-module/application-module';
import { LoadScriptAndApply } from './load-script-and-apply/load-script-and-apply';
// import { moduleRegistry } from '../../module-registry/module-registry';

export const scriptModule = new ApplicationModule('Script');

scriptModule.add(LoadScriptAndApply.name, new LoadScriptAndApply());

// moduleRegistry.add(scriptModule.module_tag, scriptModule);

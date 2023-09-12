import { ApplicationModule } from '../../application-module/application-module';
import { FromEntries } from './from-entries/from-entries';
// import { moduleRegistry } from '../../module-registry/module-registry';

export const objectModule = new ApplicationModule('Object');

objectModule.add(FromEntries.name, new FromEntries());

// moduleRegistry.add(objectModule.module_tag, objectModule);

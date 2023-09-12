import { ApplicationModule } from '../../application-module/application-module';
import { AddNumbers } from './add-numbers/add-numbers';
// import { moduleRegistry } from '../../module-registry/module-registry';

export const mathModule = new ApplicationModule('Math');

mathModule.add(AddNumbers.name, new AddNumbers());

// moduleRegistry.add(mathModule.module_tag, mathModule);

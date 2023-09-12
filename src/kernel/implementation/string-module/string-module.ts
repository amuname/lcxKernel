import { ApplicationModule } from '../../application-module/application-module';
import { Concat } from './concat/concat';
import { Length } from './length/length';
import { Split } from './split/split';
import { Trim } from './trim/trim';
// import { moduleRegistry } from '../../module-registry/module-registry';

export const stringModule = new ApplicationModule('String');

stringModule.add(Concat.name, new Concat());
stringModule.add(Length.name, new Length());
stringModule.add(Split.name, new Split());
stringModule.add(Trim.name, new Trim());

// moduleRegistry.add(stringModule.module_tag, stringModule);

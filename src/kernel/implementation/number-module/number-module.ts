import { ApplicationModule } from '../../application-module/application-module';
import { ParseFloat } from './parse-float/parse-float';
import { ParseInt } from './parse-int/parse-int';
import { ToString } from './to-string/to-string';
// import { moduleRegistry } from '../../module-registry/module-registry';

export const numberModule = new ApplicationModule('Number');

numberModule.add(ParseFloat.name, new ParseFloat());
numberModule.add(ParseInt.name, new ParseInt());
numberModule.add(ToString.name, new ToString());

// moduleRegistry.add(numberModule.module_tag, numberModule);

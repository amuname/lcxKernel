import { Predicate4 } from './predicate-class';
import {
  WrapperArguments,
  LocalWrapperArguments,
  OtherWrapperArguments,
  ContextWrapperArguments,
  MixedWrapperArguments,
} from '../wrapper-arguments/wrapper-arguments';

export class PredicateLocalArgumentsWrapper extends Predicate4<
  LocalWrapperArguments,
  OtherWrapperArguments,
  ContextWrapperArguments,
  MixedWrapperArguments
> {
  public predicate(arg: WrapperArguments): arg is LocalWrapperArguments {
    return arg.placement === 'local';
  }
}

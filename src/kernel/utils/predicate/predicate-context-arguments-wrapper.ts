import { Predicate4 } from './predicate-class';
import {
  WrapperArguments,
  LocalWrapperArguments,
  OtherWrapperArguments,
  ContextWrapperArguments,
  MixedWrapperArguments,
} from '../wrapper-arguments/wrapper-arguments';

export class PredicateContextArgumentsWrapper extends Predicate4<
  ContextWrapperArguments,
  OtherWrapperArguments,
  LocalWrapperArguments,
  MixedWrapperArguments
> {
  public predicate(arg: WrapperArguments): arg is ContextWrapperArguments {
    return arg.placement === 'context';
  }
}

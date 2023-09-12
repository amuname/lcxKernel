import { Predicate4 } from './predicate-class';
import {
  WrapperArguments,
  LocalWrapperArguments,
  OtherWrapperArguments,
  ContextWrapperArguments,
  MixedWrapperArguments,
} from '../wrapper-arguments/wrapper-arguments';

export class PredicateOtherArgumentsWrapper extends Predicate4<
  OtherWrapperArguments,
  LocalWrapperArguments,
  ContextWrapperArguments,
  MixedWrapperArguments
> {
  public predicate(arg: WrapperArguments): arg is OtherWrapperArguments {
    return arg.placement === 'other_wrapper';
  }
}

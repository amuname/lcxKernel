import { Predicate4 } from './predicate-class';
import {
  WrapperArguments,
  LocalWrapperArguments,
  OtherWrapperArguments,
  ContextWrapperArguments,
  MixedWrapperArguments,
} from '../wrapper-arguments/wrapper-arguments';

export class PredicateMixedArgumentsWrapper extends Predicate4<
  MixedWrapperArguments,
  LocalWrapperArguments,
  ContextWrapperArguments,
  OtherWrapperArguments
> {
  public predicate(arg: WrapperArguments): arg is MixedWrapperArguments {
    return arg.placement === 'mixed';
  }
}

import { Predicate3 } from './predicate-class';
import {
  MixedWrapperValue,
  LocalMixedWrapperValue,
  OtherMixedWrapperValue,
  ContextMixedWrapperValue,
} from '../wrapper-arguments/wrapper-arguments';

export class PredicateOtherInMixedArgumentsWrapper extends Predicate3<
  OtherMixedWrapperValue,
  LocalMixedWrapperValue,
  ContextMixedWrapperValue
> {
  public predicate(arg: MixedWrapperValue): arg is OtherMixedWrapperValue {
    return arg.placement === 'other_wrapper';
  }
}

import { Predicate3 } from './predicate-class';
import {
  MixedWrapperValue,
  LocalMixedWrapperValue,
  OtherMixedWrapperValue,
  ContextMixedWrapperValue,
} from '../wrapper-arguments/wrapper-arguments';

export class PredicateLocalInMixedArgumentsWrapper extends Predicate3<
  LocalMixedWrapperValue,
  OtherMixedWrapperValue,
  ContextMixedWrapperValue
> {
  public predicate(arg: MixedWrapperValue): arg is LocalMixedWrapperValue {
    return arg.placement === 'local';
  }
}

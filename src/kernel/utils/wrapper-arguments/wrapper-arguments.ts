export interface LocalWrapperArguments {
  placement: 'local';
  value: Record<string, LocalMixedWrapperValue>;
}

export interface OtherWrapperArguments {
  placement: 'other_wrapper';
  value: string;
}

export interface ContextWrapperArguments {
  placement: 'context';
  value: string;
}

export interface MixedWrapperArguments {
  placement: 'mixed';
  value: Record<string, MixedWrapperValue>;
}

export type MixedWrapperValue =
  | LocalMixedWrapperValue
  | OtherMixedWrapperValue
  | ContextMixedWrapperValue;

export interface LocalMixedWrapperValue {
  placement: 'local';
  value: string | number | boolean;
}

export interface ContextMixedWrapperValue {
  placement: 'context';
  value: string;
}

export interface OtherMixedWrapperValue {
  placement: 'other_wrapper';
  value: any;
}

export type WrapperArguments =
  | LocalWrapperArguments
  | OtherWrapperArguments
  | ContextWrapperArguments
  | MixedWrapperArguments;

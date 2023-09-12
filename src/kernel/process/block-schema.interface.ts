import { WrapperArguments } from '../utils/wrapper-arguments/wrapper-arguments';

export interface Block {
  id: string;
  prev_id: string;
  module: string;
  wrapper: string;
  wrapper_arguments: WrapperArguments;
  wrapper_result_schema: Record<string, any>;
  next:
    | {
        id: string;
      }[]
    | never[];
}

export type BlockCallSchema = Record<string | 'start' | 'end', Block>;

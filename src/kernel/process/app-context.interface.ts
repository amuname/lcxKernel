import { AppProcessContext } from './app-context';
import { AppProcess } from './app-process';

export interface AppProcessContextInterface {
  MAX_DEPTH: 128;
  actual_depth: number;
  cur_process: AppProcess;
  // process_uuid_s: Set<string>;
  parent_process?: AppProcess;
  is_testing_mode: boolean;
  // setScriptArguments: (args: Record<string, Record<string, any>>) => void;
  getScriptArgumentByKey: (key: string) => Record<string, any>;
  createNextProcessContext: (is_testing_mode: boolean) => AppProcessContext;
}

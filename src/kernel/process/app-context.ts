import { ClientProxy } from '@nestjs/microservices';
import { AppProcessContextInterface } from './app-context.interface';
import { AppProcess } from './app-process';

export class AppProcessContext implements AppProcessContextInterface {
  public MAX_DEPTH: 128;
  public is_testing_mode: boolean;
  private script_arguments: Record<string, Record<string, any>> | any;
  private process_uuid_s: Set<string>;
  public parent_process?: AppProcess;
  private _cur_process: AppProcess;
  public transport: ClientProxy;

  constructor(
    transport: ClientProxy,
    is_testing_mode: boolean,
    script_arguments: Record<string, any>,
    pocess_uuid_s = new Set<string>(),
    parent_process?: AppProcess,
  ) {
    this.transport = transport;
    this.is_testing_mode = is_testing_mode;
    this.script_arguments = script_arguments;
    this.process_uuid_s = pocess_uuid_s;
    this.parent_process = parent_process;
  }

  get actual_depth() {
    return this.process_uuid_s.size;
  }

  set cur_process(app_process: AppProcess) {
    this._cur_process = app_process;
    this.process_uuid_s.add(app_process.process_id);
  }

  get cur_process() {
    return this._cur_process;
  }

  public getAppProcessResultValue(key: string) {
    return this.cur_process.getResultValue(key);
  }

  getScriptArgumentByKey(key: string) {
    return this.script_arguments[key];
  }

  public createNextProcessContext(
    is_testing_mode?: boolean,
    script_arguments?: Record<string, any>,
  ) {
    if (this.actual_depth < this.MAX_DEPTH)
      return new AppProcessContext(
        this.transport,
        is_testing_mode === undefined ? this.is_testing_mode : is_testing_mode,
        script_arguments
          ? { ...script_arguments, ...this.script_arguments }
          : this.script_arguments,
        this.process_uuid_s,
        this.cur_process,
      );

    throw new Error(
      `MAX_DEPTH reached at AppProcess ID: ${this.cur_process.process_id}`,
    );
  }
}

import { FunctionWrapper } from '../implementation/function-wrapper/function-wrapper';

export interface WrapperBlock {
  module: string;
  wrapper: string;
  wrapper_arguments: FunctionWrapper['frontArgsSchema'];
  wrapper_result_schema: FunctionWrapper['frontResultSchema'];
}

export class ApplicationModule {
  private module_wrappers: Map<string, FunctionWrapper>;
  public module_tag: string;

  constructor(module_tag: string) {
    if (!module_tag) throw new Error('Invalid module tag');
    this.module_tag = module_tag;
    this.module_wrappers = new Map<string, FunctionWrapper>();
  }

  public add(key: string, wrapper: FunctionWrapper): void {
    if (!(wrapper instanceof FunctionWrapper)) {
      throw new Error('Invalid wrapper');
    }
    this.module_wrappers.set(key, wrapper);
  }

  public get(key: string): FunctionWrapper {
    if (!this.module_wrappers.has(key)) {
      throw new Error('Invalid wrapper');
    } else {
      const wrapper = this.module_wrappers.get(key);
      if (!(wrapper instanceof FunctionWrapper))
        throw new Error('Invalid wrapper');
      else return wrapper;
    }
  }

  public getWrapperBlocks(): WrapperBlock[] {
    return [...this.module_wrappers.entries()].map(
      ([wrapper_name, wrapper_function]) =>
        this.buildWrapperBlock(wrapper_name, wrapper_function),
    );
  }

  private buildWrapperBlock(
    func_wrapper_name: string,
    function_wrapper: FunctionWrapper,
  ): WrapperBlock {
    return {
      module: this.module_tag,
      wrapper: func_wrapper_name,
      wrapper_arguments: function_wrapper.frontArgsSchema,
      wrapper_result_schema: function_wrapper.frontResultSchema,
    };
  }
}

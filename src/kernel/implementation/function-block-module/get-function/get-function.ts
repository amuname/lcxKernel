import { z } from 'zod';
import { FunctionWrapper } from '../../function-wrapper/function-wrapper';
// import { functionBlockModule } from '../function-block-module';
import { moduleRegistry } from 'src/kernel/module-registry/module-registry';

export class GetFunction extends FunctionWrapper {
  public argsSchema = z.object({
    applicable_function: z.object({
      module: z.string(),
      function_wrapper: z.string(),
    }),
  });

  public resultSchema = z.object({});
  public frontArgsSchema = {
    avalible_from: ['local', 'context'],
    arg_schema: {
      applicable_function: {
        avalible_from: ['local', 'other_wrapper', 'context'],
        type: ['module', 'Object'],
      },
    },
  };

  public frontResultSchema = [
    'module',
    'Function',
    'wrapper',
    'ExecuteFunction',
  ];

  protected async implementation({
    applicable_function,
  }: {
    applicable_function: { module_name: string; function_wrapper: string };
  }): Promise<FunctionWrapper> {
    const { module_name, function_wrapper } = applicable_function;

    const moduleClass = moduleRegistry.get(module_name);
    const wrapperClass = moduleClass.get(function_wrapper);

    if (wrapperClass instanceof FunctionWrapper) {
      return wrapperClass;
    }
    throw new Error(`Invalid function wrapper: ${function_wrapper}`);
  }
}

export const wrapper = new GetFunction();

// functionBlockModule.add(GetFunction.name, wrapper);

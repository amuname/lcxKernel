import { z } from 'zod';
import { FunctionWrapper } from '../../function-wrapper/function-wrapper';
import { moduleRegistry } from '../../../module-registry/module-registry';
import { Block } from 'src/kernel/process/block-schema.interface';
import { AppProcessContext } from 'src/kernel/process/app-context';

export class Apply extends FunctionWrapper {
  public argsSchema = z.object({
    applicable_function: z.object({
      module: z.string(),
      function_wrapper: z.string(),
    }),
    function_arguments: z.object({}),
    is_testing_mode: z.boolean(),
  });

  public resultSchema = z.any();

  public frontArgsSchema = {
    avalible_from: ['local', 'context'],
    arg_schema: {
      applicable_function: {
        avalible_from: ['local', 'other_wrapper', 'context'],
        type: ['module', 'Object'],
      },
      function_arguments: {
        avalible_from: ['local', 'other_wrapper', 'context'],
        type: ['module', 'Object'],
      },
      is_testing_mode: {
        avalible_from: ['local', 'other_wrapper', 'context'],
        type: ['primitive', 'boolean'],
      },
    },
  };

  public frontResultSchema = ['primitive', 'void'];

  protected async implementation(
    {
      applicable_function,
      function_arguments,
      is_testing_mode,
    }: {
      applicable_function: { module_name: string; function_wrapper: string };
      function_arguments: { [key: string]: any };
      is_testing_mode: boolean;
    },
    ctx: AppProcessContext,
    block: Block,
  ): Promise<any> {
    const { module_name, function_wrapper } = applicable_function;

    const moduleClass = moduleRegistry.get(module_name);
    const wrapperClass = moduleClass.get(function_wrapper);

    if (wrapperClass instanceof FunctionWrapper) {
      return is_testing_mode
        ? wrapperClass.execTestingMode(function_arguments, ctx, block)
        : wrapperClass.execProductionMode(function_arguments, ctx, block);
    } else {
      throw new Error(`Invalid function wrapper: ${function_wrapper}`);
    }
  }
}

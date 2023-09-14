import { z } from 'zod';
import { FunctionWrapper } from '../../function-wrapper/function-wrapper';
import { Block } from 'src/kernel/process/block-schema.interface';
// import { functionBlockModule } from '../function-block-module';

export class ExecuteFunction extends FunctionWrapper {
  public argsSchema = z.object({
    function_to_exec: z.object({
      execProductionMode: z.function(),
      execTestingMode: z.function(),
    }),
    function_arguments: z.object({}),
    is_testing_mode: z.boolean(),
  });

  public resultSchema = z.any({});

  public frontArgsSchema = {
    avalible_from: ['local', 'context'],
    arg_schema: {
      function_to_exec: {
        name: 'Function to exec',
        description: 'Chose function. It will be executed',
        avalible_from: ['local', 'other_wrapper', 'context'],
        type: ['module', 'Function', 'wrapper', 'ExecuteFunction'],
      },
      function_arguments: {
        name: 'Function arguments',
        description: 'Provide arguments to function when it executed',
        avalible_from: ['local', 'other_wrapper', 'context'],
        type: ['module', 'Object'],
      },
      is_testing_mode: {
        name: 'Testing mode',
        description:
          'If true, function arguments will be compared with function arguments schema. It compare model and type',
        avalible_from: ['local', 'other_wrapper', 'context'],
        type: ['primitive', 'boolean'],
      },
    },
  };

  public frontResultSchema = ['module', 'Function'];

  protected async implementation(
    {
      function_to_exec,
      function_arguments,
      is_testing_mode,
    }: {
      function_to_exec: FunctionWrapper;
      function_arguments: object;
      is_testing_mode: boolean;
    },
    ctx: Record<string, any>,
    block: Block,
  ) {
    if (function_to_exec instanceof FunctionWrapper) {
      return is_testing_mode
        ? function_to_exec.execTestingMode(
            function_arguments,
            {
              ...ctx,
              is_testing_mode,
            },
            block,
          )
        : function_to_exec.execProductionMode(
            function_arguments,
            {
              ...ctx,
              is_testing_mode,
            },
            block,
          );
    }
    throw new Error(`Invalid function wrapper: ${function_to_exec}`);
  }
}

export const wrapper = new ExecuteFunction();

// functionBlockModule.add(ExecuteFunction.name, wrapper);

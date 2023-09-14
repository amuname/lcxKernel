import { z } from 'zod';
import { FunctionWrapper } from '../../function-wrapper/function-wrapper';
// import { functionBlockModule } from '../function-block-module';
import { ZodBlockCallSchema } from '../../../process/zod-block-schema';
import { BlockCallSchema } from '../../../process/block-schema.interface';
import { AppProcess } from '../../../process/app-process';
import { AppProcessContext } from '../../../process/app-context';

export class ApplyBlock extends FunctionWrapper {
  public argsSchema = z.object({
    block: ZodBlockCallSchema,
    is_testing_mode: z.boolean(),
  });

  public resultSchema = z.any().array();

  public frontArgsSchema = {
    avalible_from: ['local', 'context'],
    arg_schema: {
      applicable_function: {
        name: 'Applicable function',
        description:
          'Chose function. It will be returned from block. You can use return value to execute function later',
        avalible_from: ['local', 'other_wrapper', 'context'],
        type: ['module', 'Object'],
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

  public frontResultSchema = ['primitive', 'void'];

  protected async implementation(
    {
      block_schema,
      is_testing_mode,
    }: {
      block_schema: BlockCallSchema;
      is_testing_mode: boolean;
    },
    ctx: AppProcessContext,
  ): Promise<any> {
    const appProcess = new AppProcess(
      block_schema,
      ctx.createNextProcessContext(is_testing_mode),
    );

    const res = await appProcess.call();
    return res.get('end');
    // if (wrapperClass instanceof FunctionWrapper) {;
    //   await appProcess.callStack(, )

    // } else {
    //   throw new Error(`Invalid function wrapper: ${function_wrapper}`);
    // }
  }
}

// export const wrapper = new ApplyBlock();

// functionBlockModule.add(ApplyBlock.name, wrapper);

import { z } from 'zod';
import { FunctionWrapper } from '../../function-wrapper/function-wrapper';
import { conditionBlockModule } from '../condition-module';
import { ZodBlockCallSchema } from '../../../process/zod-block-schema';
import { BlockCallSchema } from '../../../process/block-schema.interface';
import { AppProcess } from '../../../process/app-process';
import { AppProcessContext } from '../../../process/app-context';

export class IfCondition extends FunctionWrapper {
  public argsSchema = z.object({
    condition: z.boolean(),
    if_block: ZodBlockCallSchema,
  });

  public resultSchema = z.any().array();

  public frontArgsSchema = {
    avalible_from: ['local', 'context'],
    arg_schema: {
      condition: {
        name: 'Condition (true/false)',
        description: 'If arg is true - "if block" wii be choosen',
        avalible_from: ['local', 'other_wrapper', 'context'],
        type: ['primitive', 'boolean'],
      },
      if_block_schema: {
        name: 'If block',
        description: 'If block. Script goes that way if condition arg is true',
        avalible_from: ['local', 'context'],
        type: ['module', 'Script'],
      },
    },
  };

  public frontResultSchema = ['primitive', 'void'];

  protected async implementation(
    {
      condition,
      if_block_schema,
    }: {
      condition: boolean;
      if_block_schema: BlockCallSchema;
    },
    ctx: AppProcessContext,
  ): Promise<any> {
    if (!condition) return;
    const appProcess = new AppProcess(
      if_block_schema,
      ctx.createNextProcessContext(),
    );

    const res = await appProcess.call();
    return res.get('end').value;
  }
}

// export const wrapper = new IfCondition();

// conditionBlockModule.add(IfCondition.name, wrapper);

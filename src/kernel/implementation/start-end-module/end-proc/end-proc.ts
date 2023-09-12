import { z } from 'zod';
import { FunctionWrapper } from '../../function-wrapper/function-wrapper';
// import { conditionBlockModule } from '../start-end-module';
// import { ZodBlockCallSchema } from 'src/kernel/process/zod-block-schema';
import { Block } from 'src/kernel/process/block-schema.interface';
// import { BlockCallSchema } from 'src/kernel/process/block-schema.interface';
// import { AppProcess } from 'src/kernel/process/app-process';
import { AppProcessContext } from 'src/kernel/process/app-context';

export class End extends FunctionWrapper {
  public argsSchema = z.any();

  public resultSchema = z.any();

  public frontArgsSchema = {
    avalible_from: ['local'],
    arg_schema: {},
  };

  public frontResultSchema = ['primitive', 'number'];

  protected async implementation(
    _arg: any,
    ctx: AppProcessContext,
    block: Block,
  ): Promise<any> {
    return ctx.cur_process.getResultValue(block.prev_id).value;
  }
}

// export const wrapper = new IfCondition();

// conditionBlockModule.add(IfCondition.name, wrapper);

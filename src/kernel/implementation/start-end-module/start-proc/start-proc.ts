import { z } from 'zod';
import { FunctionWrapper } from '../../function-wrapper/function-wrapper';
// import { conditionBlockModule } from '../start-end-module';
// import { ZodBlockCallSchema } from 'src/kernel/process/zod-block-schema';
// import { BlockCallSchema } from 'src/kernel/process/block-schema.interface';
// import { AppProcess } from 'src/kernel/process/app-process';
// import { AppProcessContext } from 'src/kernel/process/app-context';

export class Start extends FunctionWrapper {
  public argsSchema = z.any();

  public resultSchema = z.void();

  public frontArgsSchema = {
    avalible_from: ['local'],
    arg_schema: {},
  };

  public frontResultSchema = ['primitive', 'number'];

  protected async implementation(): Promise<void> {
    return;
  }
}

// export const wrapper = new IfElseCondition();

// conditionBlockModule.add(IfElseCondition.name, wrapper);

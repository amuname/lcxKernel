import { z } from 'zod';
import { FunctionWrapper } from '../../function-wrapper/function-wrapper';
// import { numberModule } from '../number-module';

export class ToString extends FunctionWrapper {
  public argsSchema = z.object({
    stringable_number: z.number(),
  });

  public resultSchema = z.string();

  public frontArgsSchema = {
    avalible_from: ['local', 'context'],
    arg_schema: {
      stringable_number: {
        avalible_from: ['local', 'other_wrapper', 'context'],
        type: ['primitive', 'number'],
      },
    },
  };

  public frontResultSchema = ['primitive', 'string'];

  protected async implementation({
    stringable_number,
  }: {
    stringable_number: number;
  }): Promise<string> {
    return stringable_number.toString();
  }
}

// export const wrapper = new ToString();

// numberModule.add(ToString.name, wrapper);

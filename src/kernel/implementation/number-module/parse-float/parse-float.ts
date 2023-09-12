import { z } from 'zod';
import { FunctionWrapper } from '../../function-wrapper/function-wrapper';
// import { numberModule } from '../number-module';

export class ParseFloat extends FunctionWrapper {
  public argsSchema = z.object({
    expect_number: z.string(),
  });

  public resultSchema = z.number();

  public frontArgsSchema = {
    avalible_from: ['local', 'context'],
    arg_schema: {
      expect_number: {
        avalible_from: ['local', 'other_wrapper', 'context'],
        type: ['primitive', 'string'],
      },
    },
  };

  public frontResultSchema = ['primitive', 'number'];

  protected async implementation({
    expect_number,
  }: {
    expect_number: string;
  }): Promise<number> {
    return Number.parseFloat(expect_number);
  }
}

// export const wrapper = new ParseFloat();

// numberModule.add(ParseFloat.name, wrapper);

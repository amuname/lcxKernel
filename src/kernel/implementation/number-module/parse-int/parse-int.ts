import { z } from 'zod';
import { FunctionWrapper } from '../../function-wrapper/function-wrapper';
// import { numberModule } from '../number-module';

export class ParseInt extends FunctionWrapper {
  public argsSchema = z.object({
    expect_number: z.string(),
  });

  public resultSchema = z.number();

  public frontArgsSchema = {
    avalible_from: ['local', 'context'],
    arg_schema: {
      expect_number: {
        name: 'Expect integer',
        description: 'String that represents integer will converted to integer',
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
    return Number.parseInt(expect_number);
  }
}

// export const wrapper = new ParseInt();

// numberModule.add(ParseInt.name, wrapper);

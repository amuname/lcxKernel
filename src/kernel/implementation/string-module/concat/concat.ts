import { z } from 'zod';
import { FunctionWrapper } from '../../function-wrapper/function-wrapper';
// import { stringModule } from '../string-module';

export class Concat extends FunctionWrapper {
  public argsSchema = z.object({
    firstString: z.string(),
    concat_symbol: z.string().optional(),
    secondString: z.string(),
  });

  public resultSchema = z.string();

  public frontArgsSchema = {
    avalible_from: ['local', 'context'],
    arg_schema: {
      firstString: {
        name: 'First string',
        description:
          'First string or char to concat "first string + concat symbol + second string"',
        avalible_from: ['local', 'other_wrapper', 'context'],
        type: ['primitive', 'string'],
      },
      concat_symbol: {
        name: 'Concat symbol or string',
        description:
          'Concat string or char to concat "first string + concat symbol + second string"',
        avalible_from: ['local', 'other_wrapper', 'context'],
        type: ['primitive', 'string'],
      },
      secondString: {
        name: 'Second string',
        description:
          'Second string or char to concat "first string + concat symbol + second string"',
        avalible_from: ['local', 'other_wrapper', 'context'],
        type: ['primitive', 'string'],
      },
    },
  };

  public frontResultSchema = ['primitive', 'string'];

  protected async implementation({
    firstString,
    concat_symbol = ' ',
    secondString,
  }: {
    firstString: string;
    concat_symbol?: string;
    secondString: string;
  }): Promise<string> {
    return firstString.concat(concat_symbol, secondString);
  }
}

// export const wrapper = new Concat();

// stringModule.add(Concat.name, wrapper);

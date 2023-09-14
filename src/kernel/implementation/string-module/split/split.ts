import { z } from 'zod';
import { FunctionWrapper } from '../../function-wrapper/function-wrapper';
// import { stringModule } from '../string-module';

export class Split extends FunctionWrapper {
  public argsSchema = z.object({
    inputString: z.string(),
    separator: z.string(),
  });

  public resultSchema = z.array(z.string());

  public frontArgsSchema = {
    avalible_from: ['local', 'context'],
    arg_schema: {
      firstString: {
        name: 'First string',
        description:
          'First string or char to divide "first string + divide symbol + second string" = "first string  + second string"',
        avalible_from: ['local', 'other_wrapper', 'context'],
        type: ['primitive', 'string'],
      },
      concat_symbol: {
        name: 'Divide string',
        description:
          'Divide string or char to divide "first string + divide symbol + second string" = "first string  + second string"',
        avalible_from: ['local', 'other_wrapper', 'context'],
        type: ['primitive', 'string'],
      },
      secondString: {
        name: 'Second string',
        description:
          'Second string or char to divide "first string + divide symbol + second string" = "first string  + second string"',
        avalible_from: ['local', 'other_wrapper', 'context'],
        type: ['primitive', 'string'],
      },
    },
  };

  public frontResultSchema = ['module', 'List'];

  protected async implementation({
    inputString,
    separator,
  }: {
    inputString: string;
    separator: string;
  }): Promise<string[]> {
    return inputString.split(separator);
  }
}

// export const wrapper = new Split();

// stringModule.add(Split.name, wrapper);

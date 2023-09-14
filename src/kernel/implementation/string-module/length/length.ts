import { z } from 'zod';
import { FunctionWrapper } from '../../function-wrapper/function-wrapper';
// import { stringModule } from '../string-module';

export class Length extends FunctionWrapper {
  public argsSchema = z.object({
    inputString: z.string(),
  });

  public resultSchema = z.number();

  public frontArgsSchema = {
    avalible_from: ['local', 'context'],
    arg_schema: {
      inputString: {
        name: 'Input string',
        description: 'Get conut of chars in string',
        avalible_from: ['local', 'other_wrapper', 'context'],
        type: ['primitive', 'string'],
      },
    },
  };

  public frontResultSchema = ['primitive', 'number'];

  protected async implementation({
    inputString,
  }: {
    inputString: string;
  }): Promise<number> {
    return inputString.length;
  }
}

// export const wrapper = new Length();

// stringModule.add(Length.name, wrapper);

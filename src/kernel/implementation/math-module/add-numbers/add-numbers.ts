import { z } from 'zod';
import { FunctionWrapper } from '../../function-wrapper/function-wrapper';
// import { mathModule } from '../math-module';

export class AddNumbers extends FunctionWrapper {
  public argsSchema = z.object({
    a: z.number(),
    b: z.number(),
  });

  public resultSchema = z.number();

  public frontArgsSchema = {
    avalible_from: ['local', 'context'],
    arg_schema: {
      a: {
        name: 'Argument A',
        description: 'A + b',
        avalible_from: ['local', 'other_wrapper', 'context'],
        type: ['primitive', 'number'],
      },
      b: {
        name: 'Argument B',
        description: 'a + B',
        avalible_from: ['local', 'other_wrapper', 'context'],
        type: ['primitive', 'number'],
      },
    },
  };

  public frontResultSchema = ['primitive', 'number'];

  protected async implementation({
    a,
    b,
  }: {
    a: number;
    b: number;
  }): Promise<number> {
    return a + b;
  }
}

// export const addNumbers = new AddNumbers();

// mathModule.add(AddNumbers.name, addNumbers);

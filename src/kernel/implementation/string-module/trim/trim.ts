import { z } from 'zod';
import { FunctionWrapper } from '../../function-wrapper/function-wrapper';
// import { stringModule } from '../string-module';

export class Trim extends FunctionWrapper {
  public argsSchema = z.object({
    inputString: z.string(),
  });

  public resultSchema = z.string();

  public frontArgsSchema = {
    avalible_from: ['local', 'context'],
    arg_schema: {
      inputString: {
        avalible_from: ['local', 'other_wrapper', 'context'],
        type: ['primitive', 'string'],
      },
    },
  };

  public frontResultSchema = ['primitive', 'string'];

  protected async implementation({
    inputString,
  }: {
    inputString: string;
  }): Promise<string> {
    return inputString.trim();
  }
}

// export const wrapper = new Trim();

// stringModule.add(Trim.name, wrapper);

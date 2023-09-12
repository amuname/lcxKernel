import { z } from 'zod';
import { FunctionWrapper } from '../../function-wrapper/function-wrapper';
// import { objectModule } from '../object-module';

export class FromEntries extends FunctionWrapper {
  public argsSchema = z.object({
    object_entries: z.array(z.tuple([z.string(), z.any()])),
  });

  public resultSchema = z.object({});

  public frontArgsSchema = {
    avalible_from: ['local', 'context'],
    arg_schema: {
      object_entries: {
        avalible_from: ['local', 'other_wrapper', 'context'],
        type: ['module', 'List'],
      },
    },
  };

  public frontResultSchema = ['module', 'Object'];

  protected async implementation({
    object_entries,
  }: {
    object_entries: [string, any][];
  }): Promise<object> {
    return Object.fromEntries(object_entries);
  }
}

// export const wrapper = new FromEntries();

// objectModule.add(FromEntries.name, wrapper);

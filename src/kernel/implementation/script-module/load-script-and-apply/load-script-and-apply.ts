import { z } from 'zod';
import { firstValueFrom } from 'rxjs';
import { FunctionWrapper } from '../../function-wrapper/function-wrapper';
import { AppProcessContext } from '../../../process/app-context';
import { AppProcess } from '../../../process/app-process';

export class LoadScriptAndApply extends FunctionWrapper {
  public argsSchema = z.object({
    script_id: z.string(),
    script_arguments: z.record(z.any()),
    is_testing_mode: z.boolean(),
  });

  public resultSchema = z.any();

  public frontArgsSchema = {
    avalible_from: ['local', 'context'],
    arg_schema: {
      script_id: {
        avalible_from: ['local', 'other_wrapper', 'context'],
        type: ['primitive', 'string'],
      },
      script_arguments: {
        avalible_from: ['local', 'context'],
        type: ['module', 'Object'],
      },
      is_testing_mode: {
        avalible_from: ['local', 'other_wrapper', 'context'],
        type: ['primitive', 'boolean'],
      },
    },
  };

  public frontResultSchema = ['module', 'Script'];

  protected async implementation(
    {
      script_id,
      version,
      script_arguments,
      is_testing_mode,
    }: {
      script_id: string;
      version: number;
      script_arguments: Record<string, any>;
      is_testing_mode: boolean;
    },
    ctx: AppProcessContext,
  ): Promise<any> {
    const script = await firstValueFrom(
      // ctx.transport.send('msg.script-storage.get-script-by-id', {
      ctx.transport.send('msg.script-storage.get-script-by-id-and-version', {
        id: script_id,
        version,
      }),
    );

    // console.log('script : ', script);
    // return script;
    const appProcess = new AppProcess(
      script,
      ctx.createNextProcessContext(is_testing_mode, script_arguments),
    );

    const res = await appProcess.call();
    return res.get('end');
  }
}

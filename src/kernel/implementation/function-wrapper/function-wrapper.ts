import { Block } from 'src/kernel/process/block-schema.interface';
import { z } from 'zod';

export abstract class FunctionWrapper {
  public argsSchema: z.Schema;
  public resultSchema: z.Schema;
  public frontArgsSchema: object;
  public frontResultSchema: object;

  protected abstract implementation(
    args: { [key: string]: any },
    ctx: Record<string, any>,
    block: Block,
  ): Promise<any>;

  protected async validateArgs(args: { [key: string]: any }): Promise<void> {
    this.argsSchema.parse(args);
  }

  public async execTestingMode(
    args: { [key: string]: any },
    ctx: Record<string, any>,
    block: Block,
  ): Promise<any> {
    await this.validateArgs(args);
    return await this.implementation(args, ctx, block);
  }

  public async execProductionMode(
    args: { [key: string]: any },
    ctx: Record<string, any>,
    block: Block,
  ): Promise<any> {
    try {
      return await this.implementation(args, ctx, block);
    } catch (error) {
      const argsString = JSON.stringify(args);
      throw new Error(`Failed to execute with arguments: ${argsString}`);
    }
  }
}

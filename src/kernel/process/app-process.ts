import { v4 as uuidv4 } from 'uuid';
import { FunctionWrapper } from '../implementation/function-wrapper/function-wrapper';
import { moduleRegistry } from '../module-registry/module-registry';
import { PredicateLocalArgumentsWrapper } from '../utils/predicate/predicate-local-arguments-wrapper';
import { PredicateMixedArgumentsWrapper } from '../utils/predicate/predicate-mixed-arguments-wrapper';
import { PredicateOtherArgumentsWrapper } from '../utils/predicate/predicate-other-arguments-wrapper';
import { Block, BlockCallSchema } from './block-schema.interface';
// import { UUID, randomUUID } from 'crypto';
import { AppProcessContext } from './app-context';
import { PredicateContextArgumentsWrapper } from '../utils/predicate/predicate-context-arguments-wrapper';
import { PredicateLocalInMixedArgumentsWrapper } from '../utils/predicate/predicate-mixed-local-wrapper-value';
import { PredicateOtherInMixedArgumentsWrapper } from '../utils/predicate/predicate-mixed-other-wrapper-value';
import { PredicateContextInMixedArgumentsWrapper } from '../utils/predicate/predicate-mixed-context-wrapper-value';

class ResultValue {
  public value: any;
  constructor(value: any) {
    this.value = value;
  }
}

export class AppProcess {
  public readonly process_id: string;
  private blockCallSchema: BlockCallSchema;
  private context: AppProcessContext;
  private result: Map<string, ResultValue>;

  constructor(blockCallSchema: BlockCallSchema, context: AppProcessContext) {
    this.blockCallSchema = blockCallSchema;
    this.context = context;
    this.result = new Map();
    this.process_id = uuidv4();
    context.cur_process = this;
  }

  private selectBlockByKey(key: keyof BlockCallSchema): Block {
    return this.blockCallSchema[key];
  }

  private getFunctionWrapperFromBlock(block: Block): FunctionWrapper {
    try {
      const moduleClass = moduleRegistry.get(block.module);
      const wrapperClass = moduleClass.get(block.wrapper);
      if (wrapperClass instanceof FunctionWrapper) {
        return wrapperClass;
      } else throw '';
    } catch (_) {
      throw new Error(`Invalid function block: ${JSON.stringify(block)}`);
    }
  }

  private getWrapperArgumentsFromBlock(block: Block): Record<string, any> {
    if (
      new PredicateMixedArgumentsWrapper().predicate(block.wrapper_arguments)
    ) {
      return Object.entries(block.wrapper_arguments.value).reduce(
        (acc, [key, val]) => {
          if (new PredicateLocalInMixedArgumentsWrapper().predicate(val))
            return (acc[key] = val.value), acc;
          if (new PredicateOtherInMixedArgumentsWrapper().predicate(val))
            return (acc[key] = this.result.get(val.value).value), acc;
          if (new PredicateContextInMixedArgumentsWrapper().predicate(val))
            return (
              (acc[key] = this.context.getScriptArgumentByKey(val.value)), acc
            );
          return acc;
        },
        {},
      );
    }

    if (
      new PredicateContextArgumentsWrapper().predicate(block.wrapper_arguments)
    ) {
      return this.context.getScriptArgumentByKey(block.wrapper_arguments.value);
    }

    if (new PredicateLocalArgumentsWrapper().predicate(block.wrapper_arguments))
      return Object.entries(block.wrapper_arguments.value).reduce(
        (acc, [key, val]) => ((acc[key] = val.value), acc),
        {},
      );

    if (new PredicateOtherArgumentsWrapper().predicate(block.wrapper_arguments))
      return this.result.get(block.wrapper_arguments.value).value;
  }

  public async call() {
    await this.blockRoutine('start');
    return this.result;
  }

  private async blockRoutine(next_id: keyof BlockCallSchema) {
    // console.log('next_id\n', next_id, '\n');
    const block = this.selectBlockByKey(next_id);
    const wrapper = this.getFunctionWrapperFromBlock(block);
    const wrapper_arguments = this.getWrapperArgumentsFromBlock(block);
    // console.log('wrapper_arguments: ', wrapper_arguments);
    const result = await this.wrapperCall(wrapper, wrapper_arguments, block);
    this.result.set(next_id, new ResultValue(result));
    // console.log('blockRoutine result: ', result);
    // console.log('blockRoutine result set: ', this.result);

    // return await Promise.all(block.next.map(({ id }) => this.blockRoutine(id))); // ???? в ts должно работать в js нет
    return block.next && (await this.blockRoutine(block.next));
  }

  private wrapperCall(
    wrapper: FunctionWrapper,
    wrapper_arguments: object,
    block: Block,
  ): Promise<any> {
    return this.context.is_testing_mode
      ? wrapper.execTestingMode(wrapper_arguments, this.context, block)
      : wrapper.execProductionMode(wrapper_arguments, this.context, block);
  }

  public getResultValue(key: string): ResultValue {
    if (!this.result.has(key))
      throw new Error('Stack has no data assotiated with key' + key);
    return this.result.get(key);
  }
}

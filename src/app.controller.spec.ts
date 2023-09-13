import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlockCallSchema } from './kernel/process/block-schema.interface';
import {
  ContextWrapperArguments,
  LocalWrapperArguments,
  MixedWrapperArguments,
  OtherWrapperArguments,
} from './kernel/utils/wrapper-arguments/wrapper-arguments';
import { ClientsModule, Transport } from '@nestjs/microservices';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      // раскоментить только для теста подключения сервисов!! иначе джест не закончит работу
      imports: [
        ClientsModule.register([
          {
            name: 'TRANSPORT',
            transport: Transport.NATS,
            options: {
              servers: ['nats://localhost:4222'],
            },
          },
        ]),
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });

    // it('id return all modules"', async () => {
    //   expect(await appController.getAllModulesKeys()).toStrictEqual([
    //     'StartEnd',
    //     'ConditionBlock',
    //     'FunctionBlock',
    //     'Function',
    //     'Math',
    //     'Number',
    //     'Object',
    //     'Script',
    //     'String',
    //   ]);
    // });

    it('callAppProcess no context', async () => {
      const result_schema = {
        test: 'для теста, реальный объект будет другой',
      };

      const arguments_schema: LocalWrapperArguments = {
        placement: 'local',
        value: {
          a: {
            placement: 'local',
            value: 0,
          },
          b: {
            placement: 'local',
            value: 4,
          },
        },
      };

      const script_schema: BlockCallSchema = {
        start: {
          id: 'start',
          prev_id: '',
          module: 'StartEnd',
          wrapper: 'Start',
          wrapper_arguments: {} as LocalWrapperArguments,
          wrapper_result_schema: {},
          next: 'block1',
        },
        block1: {
          id: 'block1',
          prev_id: 'start',
          module: 'Math',
          wrapper: 'AddNumbers',
          wrapper_arguments: arguments_schema,
          wrapper_result_schema: result_schema,
          next: 'end',
        },
        end: {
          id: 'end',
          prev_id: 'block1',
          module: 'StartEnd',
          wrapper: 'End',
          wrapper_arguments: {} as LocalWrapperArguments,
          wrapper_result_schema: {},
          next: '',
        },
      };

      expect(
        (
          await appController.createScriptProcess({
            blockCallSchema: script_schema,
            is_testingMode: false,
            script_arguments: {},
          })
        ).value,
      ).toBe(4);
    });

    // it('callAppProcess all arg in context', async () => {
    //   const result_schema = {
    //     test: 'для теста, реальный объект будет другой',
    //   };

    //   const arguments_schema: ContextWrapperArguments = {
    //     placement: 'context',
    //     value: 'ctx1',
    //   };

    //   const script_schema: BlockCallSchema = {
    //     start: {
    //       id: 'start',
    //       prev_id: '',
    //       module: 'StartEnd',
    //       wrapper: 'Start',
    //       wrapper_arguments: {
    //         placement: 'local',
    //         value: 'some value',
    //       },
    //       wrapper_result_schema: {},
    //       next: [
    //         {
    //           id: 'block1',
    //         },
    //       ],
    //     },
    //     block1: {
    //       id: 'block1',
    //       prev_id: 'start',
    //       module: 'Math',
    //       wrapper: 'AddNumbers',
    //       wrapper_arguments: arguments_schema,
    //       wrapper_result_schema: result_schema,
    //       next: [
    //         {
    //           id: 'end',
    //         },
    //       ],
    //     },
    //     end: {
    //       id: 'end',
    //       prev_id: 'block1',
    //       module: 'StartEnd',
    //       wrapper: 'End',
    //       wrapper_arguments: {
    //         placement: 'local',
    //         value: 'local value',
    //       },
    //       wrapper_result_schema: {},
    //       next: [],
    //     },
    //   };

    //   expect(
    //     (
    //       await appController.createScriptProcess({
    //         blockCallSchema: script_schema,
    //         is_testingMode: false,
    //         script_arguments: {
    //           ctx1: {
    //             a: 1,
    //             b: 3,
    //           },
    //         },
    //       })
    //     ).value,
    //   ).toBe(4);
    // });

    // it('callAppProcess some arg in context', async () => {
    //   const result_schema = {
    //     test: 'для теста, реальный объект будет другой',
    //   };

    //   const arguments_schema: MixedWrapperArguments = {
    //     placement: 'mixed',
    //     value: {
    //       a: {
    //         placement: 'local',
    //         value: 1,
    //       },
    //       b: {
    //         placement: 'context',
    //         value: 'ctx1',
    //       },
    //     },
    //   };

    //   const script_schema: BlockCallSchema = {
    //     start: {
    //       id: 'start',
    //       prev_id: '',
    //       module: 'StartEnd',
    //       wrapper: 'Start',
    //       wrapper_arguments: {
    //         placement: 'local',
    //         value: 'some value',
    //       },
    //       wrapper_result_schema: {},
    //       next: [
    //         {
    //           id: 'block1',
    //         },
    //       ],
    //     },
    //     block1: {
    //       id: 'block1',
    //       prev_id: 'start',
    //       module: 'Math',
    //       wrapper: 'AddNumbers',
    //       wrapper_arguments: arguments_schema,
    //       wrapper_result_schema: result_schema,
    //       next: [
    //         {
    //           id: 'end',
    //         },
    //       ],
    //     },
    //     end: {
    //       id: 'end',
    //       prev_id: 'block1',
    //       module: 'StartEnd',
    //       wrapper: 'End',
    //       wrapper_arguments: {
    //         placement: 'local',
    //         value: 'local value',
    //       },
    //       wrapper_result_schema: {},
    //       next: [],
    //     },
    //   };

    //   expect(
    //     (
    //       await appController.createScriptProcess({
    //         blockCallSchema: script_schema,
    //         is_testingMode: false,
    //         script_arguments: {
    //           ctx1: 3,
    //         },
    //       })
    //     ).value,
    //   ).toBe(4);
    // });

    // it('callAppProcess some arg in other_wrapper', async () => {
    //   const result_schema = {
    //     test: 'для теста, реальный объект будет другой',
    //   };

    //   const arguments_schema: MixedWrapperArguments = {
    //     placement: 'mixed',
    //     value: {
    //       a: {
    //         placement: 'local',
    //         value: 1,
    //       },
    //       b: {
    //         placement: 'other_wrapper',
    //         value: 'block1',
    //       },
    //     },
    //   };

    //   const script_schema: BlockCallSchema = {
    //     start: {
    //       id: 'start',
    //       prev_id: '',
    //       module: 'StartEnd',
    //       wrapper: 'Start',
    //       wrapper_arguments: {
    //         placement: 'local',
    //         value: 'some value',
    //       },
    //       wrapper_result_schema: {},
    //       next: [
    //         {
    //           id: 'block1',
    //         },
    //       ],
    //     },
    //     block1: {
    //       id: 'block1',
    //       prev_id: 'start',
    //       module: 'Math',
    //       wrapper: 'AddNumbers',
    //       wrapper_arguments: {
    //         placement: 'local',
    //         value: {
    //           a: 1,
    //           b: 2,
    //         },
    //       },
    //       wrapper_result_schema: result_schema,
    //       next: [
    //         {
    //           id: 'block2',
    //         },
    //       ],
    //     },
    //     block2: {
    //       id: 'block2',
    //       prev_id: 'block1',
    //       module: 'Math',
    //       wrapper: 'AddNumbers',
    //       wrapper_arguments: arguments_schema,
    //       wrapper_result_schema: result_schema,
    //       next: [
    //         {
    //           id: 'end',
    //         },
    //       ],
    //     },
    //     end: {
    //       id: 'end',
    //       prev_id: 'block2',
    //       module: 'StartEnd',
    //       wrapper: 'End',
    //       wrapper_arguments: {
    //         placement: 'local',
    //         value: 'local value',
    //       },
    //       wrapper_result_schema: {},
    //       next: [],
    //     },
    //   };

    //   expect(
    //     (
    //       await appController.createScriptProcess({
    //         blockCallSchema: script_schema,
    //         is_testingMode: false,
    //         script_arguments: {},
    //       })
    //     ).value,
    //   ).toBe(4);
    // });

    // it('callAppProcess arg in other_wrapper', async () => {
    //   const result_schema = {
    //     test: 'для теста, реальный объект будет другой',
    //   };

    //   const arguments_schema: OtherWrapperArguments = {
    //     placement: 'other_wrapper',
    //     value: 'block1',
    //   };

    //   const script_schema: BlockCallSchema = {
    //     start: {
    //       id: 'start',
    //       prev_id: '',
    //       module: 'StartEnd',
    //       wrapper: 'Start',
    //       wrapper_arguments: {
    //         placement: 'local',
    //         value: 'some value',
    //       },
    //       wrapper_result_schema: {},
    //       next: [
    //         {
    //           id: 'block1',
    //         },
    //       ],
    //     },
    //     block1: {
    //       id: 'block1',
    //       prev_id: 'start',
    //       module: 'Object',
    //       wrapper: 'FromEntries',
    //       wrapper_arguments: {
    //         placement: 'local',
    //         value: {
    //           object_entries: [
    //             ['a', 1],
    //             ['b', 3],
    //           ],
    //         },
    //       },
    //       wrapper_result_schema: result_schema,
    //       next: [
    //         {
    //           id: 'block2',
    //         },
    //       ],
    //     },
    //     block2: {
    //       id: 'block2',
    //       prev_id: 'block1',
    //       module: 'Math',
    //       wrapper: 'AddNumbers',
    //       wrapper_arguments: arguments_schema,
    //       wrapper_result_schema: result_schema,
    //       next: [
    //         {
    //           id: 'end',
    //         },
    //       ],
    //     },
    //     end: {
    //       id: 'end',
    //       prev_id: 'block2',
    //       module: 'StartEnd',
    //       wrapper: 'End',
    //       wrapper_arguments: {
    //         placement: 'local',
    //         value: 'local value',
    //       },
    //       wrapper_result_schema: {},
    //       next: [],
    //     },
    //   };

    //   expect(
    //     (
    //       await appController.createScriptProcess({
    //         blockCallSchema: script_schema,
    //         is_testingMode: false,
    //         script_arguments: {},
    //       })
    //     ).value,
    //   ).toBe(4);
    // });

    // это тест подключения по транспорту, его не запускать
    /*it('callAppProcess arg in other_wrapper', async () => {
      const result_schema = {
        test: 'для теста, реальный объект будет другой',
      };

      const arguments_schema: OtherWrapperArguments = {
        placement: 'other_wrapper',
        value: 'block1',
      };

      const script_schema: BlockCallSchema = {
        start: {
          id: 'start',
          prev_id: '',
          module: 'StartEnd',
          wrapper: 'Start',
          wrapper_arguments: {
            placement: 'local',
            value: 'some value',
          },
          wrapper_result_schema: {},
          next: [
            {
              id: 'block1',
            },
          ],
        },
        block1: {
          id: 'block1',
          prev_id: 'start',
          module: 'Script',
          wrapper: 'LoadScriptAndApply',
          wrapper_arguments: {
            placement: 'local',
            value: {
              script_id: 'string',
              script_arguments: {},
              is_testing_mode: false,
            },
          },
          wrapper_result_schema: result_schema,
          next: [
            {
              id: 'end',
            },
          ],
        },
        end: {
          id: 'end',
          prev_id: 'block1',
          module: 'StartEnd',
          wrapper: 'End',
          wrapper_arguments: {
            placement: 'local',
            value: 'local value',
          },
          wrapper_result_schema: {},
          next: [],
        },
      };

      expect(
        (
          await appController.createScriptProcess({
            blockCallSchema: script_schema,
            is_testingMode: false,
            script_arguments: {},
          })
        ).value,
      ).toBe(4);
    });*/
  });
});

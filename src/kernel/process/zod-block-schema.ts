import { z } from 'zod';

export const ZodNextSchema = z.object({
  id: z.string(),
});

const ZodLocalWrapperArgumentsSchema = z.object({
  placement: z.literal('local'),
  value: z.any(),
});

const ZodOtherWrapperArgumentsSchema = z.object({
  placement: z.literal('other_wrapper'),
  value: z.string(),
});

const ZodContextWrapperArgumentsSchema = z.object({
  placement: z.literal('context'),
  value: z.string(),
});

const ZodLocalMixedWrapperValueSchema = z.object({
  placement: z.literal('local'),
  value: z.any(),
});

const ZodContextMixedWrapperValueSchema = z.object({
  placement: z.literal('context'),
  value: z.string(),
});

const ZodOtherMixedWrapperValueSchema = z.object({
  placement: z.literal('other_wrapper'),
  value: z.string(),
});

const ZodMixedWrapperValueSchema = z.union([
  ZodLocalMixedWrapperValueSchema,
  ZodContextMixedWrapperValueSchema,
  ZodOtherMixedWrapperValueSchema,
]);

const ZodMixedWrapperArgumentsSchema = z.object({
  placement: z.literal('mixed'),
  value: z.record(ZodMixedWrapperValueSchema),
});

const ZodWrapperArgumentsSchema = z.union([
  ZodLocalWrapperArgumentsSchema,
  ZodOtherWrapperArgumentsSchema,
  ZodContextWrapperArgumentsSchema,
  ZodMixedWrapperArgumentsSchema,
]);

export const ZodBlockSchema = z.object({
  id: z.string(),
  prev_id: z.string(),
  module: z.string(),
  wrapper: z.string(),
  wrapper_arguments: ZodWrapperArgumentsSchema,
  wrapper_result_schema: z.record(z.any()),
  next: z.array(ZodNextSchema),
});

export const ZodBlockCallSchema = z.record(ZodBlockSchema).refine((val) => {
  return Object.keys(val).includes('start') && Object.keys(val).includes('end');
});

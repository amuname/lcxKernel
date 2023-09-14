// import { LoadScriptAndApply } from '../load-script-and-apply/load-script-and-apply';

import { LoadScriptAndApply } from './load-script-and-apply';

describe('LoadScriptAndApply', () => {
  it('should be defined', () => {
    expect(new LoadScriptAndApply()).toBeDefined();
  });

  // it('frontArgsSchema should have keys name and description', () => {
  //   const wrapper = new LoadScriptAndApply().frontArgsSchema;
  //   const keys_has_name_and_deacription = Object.entries(
  //     wrapper.arg_schema,
  //   ).reduce((acc, [key, val]) => {
  //     acc[key] = Boolean(val.name && val.description);
  //     return acc;
  //   }, {});
  //   const res = Object.values(keys_has_name_and_deacription).find((e) => !e);
  //   expect(res).toBeFalsy();
  // });
});

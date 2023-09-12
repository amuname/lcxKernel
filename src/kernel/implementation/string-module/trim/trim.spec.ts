import { AppProcessContext } from '../../../process/app-context';
import { Trim } from './trim';

describe('Trim', () => {
  it('should be defined', () => {
    expect(new Trim()).toBeDefined();
  });

  it('expect smth', async () => {
    const trim = new Trim();
    const args: {
      inputString: string;
    } = { inputString: ' uwu ' };
    expect(
      await trim.execProductionMode(
        args,
        new AppProcessContext(false, { asd: { asd: 1 } }, new Set()),
      ),
    ).toBe('uwu');
  });
});

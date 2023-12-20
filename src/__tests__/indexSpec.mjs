import { jest } from '@jest/globals';

import * as main from '../index';

const {
  default: {
    autoYield,
    setConfig,
    autoYieldReset,
    nextFrameYield,
    autoYieldStartPoint,
  },
} = main;

describe('Tasks', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
    setConfig({ autoEnable: true });
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.resetAllMocks();
    autoYieldReset();
  });

  describe('autoYield method', () => {
    it('should auto yield for first time usage', async () => {
      const promise = autoYield();
      jest.runOnlyPendingTimers();
      await promise;

      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 0);
    });

    it('should auto yield every task for parallel usage', async () => {
      const promise = autoYield();
      autoYield();

      jest.runOnlyPendingTimers();
      await promise;

      expect(setTimeout).toHaveBeenCalledTimes(2);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 0);
    });

    it('should auto yield task only if current task reach deadline', async () => {
      const promise = autoYield();
      jest.runOnlyPendingTimers();
      await promise;

      const promise2 = autoYield();
      jest.runOnlyPendingTimers();
      await promise2;

      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 0);
    });

    it('should auto yield reset logic', async () => {
      const promise = autoYield();
      jest.runOnlyPendingTimers();
      await promise;

      autoYieldReset();

      const promise2 = autoYield();
      jest.runOnlyPendingTimers();
      await promise2;

      expect(setTimeout).toHaveBeenCalledTimes(2);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 0);
    });

    it('should auto yield with defined starting point', async () => {
      autoYieldStartPoint();
      const promise = autoYield();
      jest.runOnlyPendingTimers();
      await promise;

      const promise2 = autoYield();
      jest.runOnlyPendingTimers();
      await promise2;

      expect(setTimeout).toHaveBeenCalledTimes(0);
    });

    it('should turn off auto logic yield', async () => {
      setConfig({ autoEnable: false });
      const promise = autoYield();
      jest.runOnlyPendingTimers();
      await promise;

      autoYieldReset();

      const promise2 = autoYield();
      jest.runOnlyPendingTimers();
      await promise2;

      expect(setTimeout).toHaveBeenCalledTimes(0);
    });

    it('should yield logic to next frame', async () => {
      const promise = nextFrameYield();
      jest.runOnlyPendingTimers();
      await promise;

      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 16);
    });

    it('should enable shared global context', async () => {
      setConfig({ autoShareContext: true });
      const promise = autoYield();
      jest.runOnlyPendingTimers();
      await promise;

      autoYieldReset();

      const promise2 = autoYield();
      jest.runOnlyPendingTimers();
      await promise2;

      expect(setTimeout).toHaveBeenCalledTimes(2);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 0);
      expect(globalThis.__esmjTaskYieldTime__).toBeDefined();
    });
  });
});

import { jest } from '@jest/globals';

import * as main from '../index';

const {
  default: { autoYield, autoYieldToggle, autoYieldReset },
} = main;

describe('Tasks', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
    autoYieldToggle(true);
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

    it('should turn off auto logic yield', async () => {
      autoYieldToggle(false);
      const promise = autoYield();
      jest.runOnlyPendingTimers();
      await promise;

      autoYieldReset();

      const promise2 = autoYield();
      jest.runOnlyPendingTimers();
      await promise2;

      expect(setTimeout).toHaveBeenCalledTimes(0);
    });
  });
});
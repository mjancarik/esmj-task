//EXTENDING
type NavigatorScheduling = Navigator & {
  scheduling: { isInputPending?: () => boolean };
};

let __yield_time__: number | null = null;
let enabled = true;
const DEADLINE = 45;
const FRAME = 0;

function forceYield() {
  return new Promise((resolve) => {
    setTimeout(() => {
      __yield_time__ = performance.now() + DEADLINE;
      resolve(void 0);
    }, FRAME);
  });
}

function autoYield() {
  if (
    !enabled ||
    (__yield_time__ !== null && !shouldYieldWork(__yield_time__))
  ) {
    return;
  }

  return forceYield();
}

function autoYieldReset() {
  __yield_time__ = null;
}

function autoYieldToggle(state) {
  enabled = state;
}

function shouldYieldWork(deadline) {
  const currentTime = performance.now();

  return (
    (typeof navigator !== 'undefined' &&
      (navigator as NavigatorScheduling)?.scheduling?.isInputPending?.()) ||
    currentTime > deadline
  );
}

export { forceYield, autoYield, autoYieldReset, autoYieldToggle };

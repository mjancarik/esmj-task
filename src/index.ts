//EXTENDING
type NavigatorScheduling = Navigator & {
  scheduling: { isInputPending?: () => boolean };
};

declare global {
  interface Window {
    scheduler?: {
      yield: () => Promise<void>;
    };
  }
}

type Context = {
  __esmjTaskYieldTime__?: number;
};

let context: Context = {};
let config = {
  autoEnable: true,
  autoShareContext: false,
};
const DEADLINE = 45;
const FRAME = 0;
const NEXT_FRAME = 16;

function nextFrameYield() {
  if (typeof requestAnimationFrame === 'undefined') {
    return forceYield(NEXT_FRAME);
  }

  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      forceYield().then(resolve);
    });
  });
}

function forceYield(frame?: number) {
  const context = getGlobalContext() as Window;

  if (typeof context.scheduler?.yield === 'function') {
    return context.scheduler.yield();
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      autoYieldStartPoint();
      resolve(void 0);
    }, frame ?? FRAME);
  });
}

async function autoYield() {
  if (
    !config.autoEnable ||
    (context.__esmjTaskYieldTime__ !== undefined &&
      !shouldYieldWork(context.__esmjTaskYieldTime__))
  ) {
    return;
  }

  return forceYield();
}

function setConfig(newConfig = {}) {
  config = { ...config, ...newConfig };

  if (config.autoShareContext) {
    context = getGlobalContext();
  } else {
    context = {};
  }
}

function autoYieldReset() {
  context.__esmjTaskYieldTime__ = undefined;
}

function autoYieldStartPoint() {
  context.__esmjTaskYieldTime__ = performance.now() + DEADLINE;
}

function getGlobalContext() {
  if (typeof globalThis !== 'undefined') {
    return globalThis;
  }
  if (typeof self !== 'undefined') {
    return self;
  }
  if (typeof window !== 'undefined') {
    return window;
  }
  if (typeof global !== 'undefined') {
    return global;
  }

  return {};
}

function shouldYieldWork(deadline) {
  const currentTime = performance.now();

  return (
    (typeof navigator !== 'undefined' &&
      (navigator as NavigatorScheduling)?.scheduling?.isInputPending?.()) ||
    currentTime > deadline
  );
}

export {
  forceYield,
  autoYield,
  autoYieldReset,
  autoYieldStartPoint,
  setConfig,
  nextFrameYield,
};

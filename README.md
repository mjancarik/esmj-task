# Task

The `@esmj/task` is tiny package for divide long task to new tasks and improve browser responsiveness, user experience and INP (core web vitals) metric. The new tasks are creating only if it is need.

## Requirements

- Node 18+

## Install

```shell
npm install @esmj/task
```

## Usage

It works for both Javascript modules (ESM and CJS).

```javascript 
import { autoYield, autoYieldStartPoint } from '@esmj/task';

(async () => {
  const tasks = [
    longRunnigTask1,
    normalTask1,
    normalTask2,
    longRunnigTask2
  ];

  autoYieldStartPoint()
  for (const task of tasks) {
    await autoYield()
    await task();
  }
})

```
## API
### autoYield()
Type: `() => Promise<void>`
Method divide long task to new tasks if it is need. If `autoYield` method is called without set start point with `autoYieldStartPoint` method then the first call of `autoYield` method is `forceYield`. If autoYield logic is turn off then returns immediately resolved Promise<void>.

### forceYield()
Type: `() => Promise<void>`
Method create new task for every call, yield to next event loop (0 ms delay). 

### nextFrameYield()
Type: `() => Promise<void>`
Method create new task for every call, yield to next frame (16 ms delay).

### autoYieldReset
Type: `() => void`
Method reset logic for creating new tasks.

### autoYieldStartPoint
Type: `() => void`
Method set start point for `autoYield` method so first call of `autoYield` method not create new task with `forceYield`.

### setConfig
Type: `({ autoEnable: boolean, autoShareContext: boolean }) => void`
Method config package autoEnable: turn on/off autoYield logic and autoShareContext: turn on/off shared context through global variable.
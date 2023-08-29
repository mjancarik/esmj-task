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
import { autoYield } from '@esmj/task';

(async () => {
  const tasks = [
    longRunnigTask1,
    normalTask1,
    normalTask2,
    longRunnigTask2
  ];
  for (const task of tasks) {
    await autoYield()
    await task();
  }
})

```
## API
### autoYield()
Type: `() => Promise<void>`
Method divide long task to new tasks if it is need. If autoYield logic is turn off returns immediately resolved Promise<void>.

### forceYield()
Type: `() => Promise<void>`
Method create new task for every call.

### autoYieldReset
Type: `() => void`
Method reset logic for creating new tasks.

### autoYieldToggle
Type: `(state: boolean) => void`
Method turn on/off autoYield logic.
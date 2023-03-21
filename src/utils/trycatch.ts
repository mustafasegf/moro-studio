import tryToCatch from "try-to-catch";

export function tryCatch<Data, FnArgs extends any[]>(
  fn: (...args: FnArgs) => Data,
  ...fnArgs: FnArgs
): [Error] | [null, Data] {
  try {
    return [null, fn(...fnArgs)];
  } catch (err) {
    if (!(err instanceof Error)) {
      return [new Error(String(err))];
    }
    return [err];
  }
}

export { tryToCatch }
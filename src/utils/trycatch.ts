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

export async function tryToCatch<Data, FnArgs extends any[]>(
  fn: (...args: FnArgs)  => Promise<Data> | Data,
  ...fnArgs: FnArgs
): Promise<[Error] | [null, Data]>{
  try {
    return [null, await fn(...fnArgs)];
  } catch (err) {
    if (!(err instanceof Error)) {
      return [new Error(String(err))];
    }
    return [err];
  }
}
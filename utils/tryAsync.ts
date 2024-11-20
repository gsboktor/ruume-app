export const tryAsync = async <T, E extends Error>(
  fn: () => Promise<T>,
  e?: (err: E) => void,
  s?: (res: T) => void,
) => {
  try {
    const res = await fn();
    s?.(res);
    return res;
  } catch (err) {
    e?.(err as E);
  }
};
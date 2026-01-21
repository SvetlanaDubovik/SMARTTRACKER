type Debounced<T extends (...args: any[]) => void> = ((...args: Parameters<T>) => void) & {
  cancel: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => void>(fn: T, delay = 300): Debounced<T> {
  let t: number | undefined;
  const debounced = (...args: Parameters<T>) => {
    window.clearTimeout(t);
    t = window.setTimeout(() => fn(...args), delay);
  };
  debounced.cancel = () => {
    if (t !== undefined) {
      window.clearTimeout(t);
      t = undefined;
    }
  };
  return debounced;
}

type Debounced<Args extends unknown[]> = ((...args: Args) => void) & {
  cancel: () => void;
};

export function debounce<Args extends unknown[]>(
  fn: (...args: Args) => void,
  delay = 300
): Debounced<Args> {
  let t: number | undefined;
  const debounced = (...args: Args) => {
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

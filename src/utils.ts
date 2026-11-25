export function slowdown(duration: number) {
  const start = performance.now();
  while (performance.now() - start < duration);
}

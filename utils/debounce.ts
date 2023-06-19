export default function debounce<T extends (...args: any) => any>(
  cb: T,
  delay: number = 1000
) {
  let timeoutId: any;

  return (...cbArgs: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => cb(...cbArgs), delay);
  };
}

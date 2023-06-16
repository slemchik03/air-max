export default function makeSearchParamsUrl(from: {
  [k: string]: Set<string>;
}) {
  const searchParams = new URLSearchParams();

  for (const key in from) {
    if (Object.hasOwn(from, key)) {
      searchParams.set(key, Array.from(from[key].values()).join(","));
    }
  }
  return searchParams.toString();
}

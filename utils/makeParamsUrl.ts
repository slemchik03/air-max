export default function makeParamsUrl(params: {
  [k: string]: string[] | string;
}) {
  const searchParamsUrl = new URLSearchParams();
  for (const key in params) {
    const value = params[key];
    if (Object.hasOwn(params, key)) {
      if (Array.isArray(value)) {
        searchParamsUrl.set(key, value.join(","));
      } else {
        searchParamsUrl.set(key, value);
      }
    }
  }
  return searchParamsUrl.toString();
}

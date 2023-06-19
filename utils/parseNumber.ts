export default function parseNumber(n: number) {
  if (n) {
    const nArr = n.toString().split("");
    const res = [];
  
    for (let i = nArr.length - 1; i >= 0; i--) {
      if (!((i + 1) % 3)) {
        nArr.splice(i - 1, 0, ",");
      }
    }
    return nArr.join("");
  }
return 0
}

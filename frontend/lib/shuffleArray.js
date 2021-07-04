export default function shuffleArray(a, b, c, d) {
  const newArray = [].concat(a);
  c = newArray.length;
  while (c) {
    (b = (Math.random() * c--) | 0),
      (d = newArray[c]),
      (newArray[c] = newArray[b]),
      (newArray[b] = d);
  }
  return newArray;
}

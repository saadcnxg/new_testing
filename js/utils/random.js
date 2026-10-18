export function pick(list, exclude = null) {
  if (list.length < 2) return list[0];
  let item;
  do {
    item = list[Math.floor(Math.random() * list.length)];
  } while (item === exclude);
  return item;
}

export function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
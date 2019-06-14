export const pick = items => items[Math.floor(Math.random(), items.length)];

export function remove(items, item) {
  for (let i = 0; i < items.length; i++) {
    items[i] === item && [...items.slice(0, i), ...items.slice(i + 1)];
  }
}

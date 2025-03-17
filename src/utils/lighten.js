export function lighten(hexColor, amount) {
  hexColor = hexColor.replace('#', '');
  const r = parseInt(hexColor.substring(0, 2), 16);
  const g = parseInt(hexColor.substring(2, 4), 16);
  const b = parseInt(hexColor.substring(4, 6), 16);
  let a;
  if (hexColor.length > 6) {
    a = parseInt(hexColor.substring(6, 8), 16);
  }
  const newR = Math.round(Math.min(255, r + amount));
  const newG = Math.round(Math.min(255, g + amount));
  const newB = Math.round(Math.min(255, b + amount));
  const hex = (val) => val.toString(16).padStart(2, '0');
  return `#${hex(newR)}${hex(newG)}${hex(newB)}${a ? hex(a) : ''}`;
}

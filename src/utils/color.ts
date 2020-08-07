export function color(hexColor: string): number {
  return parseInt(hexColor.substring(1), 16);
}

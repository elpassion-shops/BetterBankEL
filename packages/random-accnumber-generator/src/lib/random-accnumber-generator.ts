export function randomAccnumberGenerator(): string {
  return `491020289222763005${Math.floor(
    Math.random() * 100000000
  ).toString()}`;
}

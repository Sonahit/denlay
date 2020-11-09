export function enumToArray<Enum>(en: Enum): Array<Enum[any]> {
  return Object.keys(en)
    .filter((k) => !Number.isFinite(+k))
    .map((k: string) => (en as { [key: string]: any })[k]);
}

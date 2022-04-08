export default function truncate(str: string, length: number) {
  return `${str.substring(0, length)} ${str.length > length ? "..." : ""}`;
}

export function encode(str) {
  return btoa(encodeURIComponent(str));
}

export function decode(str) {
  return decodeURIComponent(atob(str));
}
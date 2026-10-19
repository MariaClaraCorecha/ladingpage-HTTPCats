// Adaptador para o serviço externo http.cat.
export function catImageUrl(code: number): string {
  return `https://http.cat/${code}.jpg`;
}

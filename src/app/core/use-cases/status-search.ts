import { HttpStatus, StatusClass, statusClassOf } from '../domain/index';

export interface StatusFilter {
  query: string;
  statusClass: StatusClass | null;
  includeUnofficial: boolean;
}

// Busca sem diferenciar maiúsculas nem acentos ("nao" encontra "não").
function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');
}

export function filterStatuses(
  statuses: readonly HttpStatus[],
  filter: StatusFilter,
): HttpStatus[] {
  const q = normalize(filter.query.trim());
  return statuses.filter(
    (s) =>
      (filter.statusClass === null || statusClassOf(s.code) === filter.statusClass) &&
      (filter.includeUnofficial || !s.unofficial) &&
      (!q || normalize(`${s.code} ${s.name} ${s.description}`).includes(q)),
  );
}

export function countByClass(statuses: readonly HttpStatus[], statusClass: StatusClass): number {
  return statuses.filter((s) => statusClassOf(s.code) === statusClass).length;
}

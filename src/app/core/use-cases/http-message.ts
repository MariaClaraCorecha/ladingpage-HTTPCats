import { Scenario } from '../domain/index';

function formatHeaders(headers: Record<string, string>): string[] {
  return Object.entries(headers).map(([key, value]) => `${key}: ${value}`);
}

function withBody(lines: string[], body?: string): string {
  if (body) lines.push('', body);
  return lines.join('\n');
}

export function formatRequest(s: Scenario): string {
  return withBody(
    [`${s.method} ${s.path} HTTP/1.1`, ...formatHeaders(s.requestHeaders)],
    s.requestBody,
  );
}

export function formatResponse(s: Scenario, statusName: string): string {
  return withBody(
    [`HTTP/1.1 ${s.status} ${statusName}`, ...formatHeaders(s.responseHeaders)],
    s.responseBody,
  );
}

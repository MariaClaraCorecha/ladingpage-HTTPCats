export type HeaderDirection = 'request' | 'response' | 'both';

export interface HeaderInfo {
  name: string;
  direction: HeaderDirection;
  description: string;
  example: string;
  codes: number[];
}

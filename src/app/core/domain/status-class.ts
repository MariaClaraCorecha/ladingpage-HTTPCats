import { StatusClass } from './http-status.model';

export function statusClassOf(code: number): StatusClass {
  return Math.floor(code / 100) as StatusClass;
}

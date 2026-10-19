import { HttpStatus } from '../../core/domain/index';
import { CLIENT_ERROR_STATUSES } from './client-error';
import { INFORMATIONAL_STATUSES } from './informational';
import { REDIRECTION_STATUSES } from './redirection';
import { SERVER_ERROR_STATUSES } from './server-error';
import { SUCCESS_STATUSES } from './success';

export { STATUS_CLASSES } from './status-classes';

export const HTTP_STATUSES: HttpStatus[] = [
  ...INFORMATIONAL_STATUSES,
  ...SUCCESS_STATUSES,
  ...REDIRECTION_STATUSES,
  ...CLIENT_ERROR_STATUSES,
  ...SERVER_ERROR_STATUSES,
];

export function findStatus(code: number): HttpStatus | undefined {
  return HTTP_STATUSES.find((s) => s.code === code);
}

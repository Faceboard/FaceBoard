export const CHANGE_AUTH_FIELD = 'CHANGE_AUTH_FIELD';

export function authChange(field, value) {
  return {
    type: CHANGE_AUTH_FIELD,
    field,
    value
  }
}

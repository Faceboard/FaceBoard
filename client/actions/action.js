export const CHANGE_AUTH_FIELD = 'CHANGE_AUTH_FIELD';
export const FETCHING_USERS = 'FETCHING_USERS';
export const USERS_FETCHED = 'USERS_FETCHED';
export const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR';


export function authChange (field, value) {
  return {
    type: CHANGE_AUTH_FIELD,
    field,
    value
  };
}

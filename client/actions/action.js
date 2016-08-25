export const CHANGE_AUTH_FIELD = 'CHANGE_AUTH_FIELD';
export const FETCHING_USERS = 'FETCHING_USERS';
export const USERS_FETCHED = 'USERS_FETCHED';
export const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR';
export const CHANGE_FIELD = 'CHANGE_FIELD';
export const FETCHING_MESSAGES = 'FETCHING_MESSAGES';
export const MESSAGES_FETCHED = 'MESSAGES_FETCHED';
export const MESSAGES_ERROR = 'MESSAGES_ERROR';
export const FETCHING_FIREPAD = 'FETCHING_FIREPAD';
export const FIREPAD_FETCHED = 'FIREPAD_FETCHED';
export const FIREPAD_MODE = 'FIREPAD_MODE';
export const CHANGE_MESSAGE_TEXT = 'CHANGE_MESSAGE_TEXT';
export const FETCHING_PRIVATE_MESSAGES = 'FETCHING_PRIVATE_MESSAGES';
export const FETCHING_FRIENDS = 'FETCHING_FRIENDS';
export const FRIENDS_FETCHED = 'FRIENDS_FETCHED';
export const FETCHING_FRIENDS_ERROR = 'FETCHING_FRIENDS_ERROR';
export const FETCHING_PCHAT = "FETCHING_PCHAT";
export const PCHAT_FETCHED = "PCHAT_FETCHED";
export const PCHAT_ERROR = "PCHAT_ERROR";
export const TOGGLE_DIV = "TOGGLE_DIV";
export const FETCHING_WHITEBOARD = 'FETCHING_WHITEBOARD';
export const WHITEBOARD_FETCHED = 'WHITEBOARD_FETCHED';
export const WHITEBOARD_ERROR = 'WHITEBOARD_ERROR';
export const FILTER_USERS = 'FILTER_USERS';
export const FETCHING_ROOM_MESSAGES = 'FETCHING_ROOM_MESSAGES';
export const ROOM_MESSAGES_FETCHED = 'ROOM_MESSAGES_FETCHED';
export const ROOM_MESSAGES_ERROR = 'ROOM_MESSAGES_ERROR';
export const FETCHING_ROOMS = 'FETCHING_ROOMS';
export const FETCHED_ROOMS = 'FETCHED_ROOMS';
export const FETCHED_ROOMS_ERROR = 'FETCHED_ROOMS_ERROR';
export const CHOOSE_ROOM = 'CHOOSE_ROOM';
export const CHOOSE_USER = 'CHOOSE_USER'

export function authChange (field, value) {
  return {
    type: CHANGE_AUTH_FIELD,
    field,
    value
  };
}

export function modeChange (mode) {
  return {
    type: FIREPAD_MODE,
    mode
  };
}

export function toggleDiv (hidden) {
  return {
    type: TOGGLE_DIV,
    hidden: hidden
  };
};

import axios from 'axios';
import { constantUrl } from '../sync';
import { FETCHING_ROOM_MESSAGES, ROOM_MESSAGES_FETCHED, ROOM_MESSAGES_ERROR, FETCHING_ROOMS, FETCHED_ROOMS, FETCHED_ROOMS_ERROR, CHOOSE_ROOM } from './action';
import socket from '../sync';

export function getRoomMessages (roomname) {
  console.log('this was called');
  return function (dispatch) {
    dispatch({ type: FETCHING_ROOM_MESSAGES });
    axios.post(constantUrl + '/messages/rooms/findAll', {roomname})
      .then((response) => {
        dispatch({
          type: ROOM_MESSAGES_FETCHED,
          payload: response.data
        });
        console.log('this is a response', response.data);
      })
      .catch((error) => {
        dispatch({
          type: ROOM_MESSAGES_ERROR,
          error: error
        });
      });
  };
};

export function getRoomsForUser () {
  return function (dispatch) {
    dispatch({type: FETCHING_ROOMS});
    axios.get(constantUrl + '/rooms/findAll')
      .then((response) => {
        dispatch({
          type: FETCHED_ROOMS,
          payload: response.data
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCHED_ROOMS_ERROR,
          error: error
        });
      });
  };
};

export function addRooms (roomname) {
  return function (dispatch) {
    dispatch({type: FETCHING_ROOMS});
    axios.post(constantUrl + '/rooms/make', {
      roomname
    })
    .then((response) => {
      dispatch(getRoomsForUser());
    })
    .catch((error) => {
      dispatch({
        type: FETCHED_ROOMS_ERROR,
        payload: error
      });
    });
  };
};

export function deleteRoom(roomname) {
  let data = {
    userid: global.localStorage.userid,
    roomname
  };
  socket.emit('delete room', data);
};

export function joinRoom (roomObj) {
  global.localStorage.currentRoom = roomObj.roomname;
  let obj = {
    roomname: roomObj.roomname,
  };
  socket.emit('join room', roomObj);
};

export function chooseRoom (room) {
  return {
    type: CHOOSE_ROOM,
    chosenRoom: room
  };
};
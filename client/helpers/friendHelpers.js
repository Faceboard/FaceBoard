import { store } from '../index';
import { addFriend } from '../actions/friends';

export function findFriend (data) {
  let friendArray = document.getElementsByClassName('friends');
  let hasFriend = false;
  for (let i = 0; i < friendArray.length; i++) {
    if (friendArray[i].dataset['friendname'] === data.useronename && !friendArray[i].classList.contains('in-pchat')) {
      friendArray[i].classList.add('hasMessage');
      hasFriend = true;
      delete global.newFriend;
    }
  }
  if (!hasFriend) {
    store.dispatch(addFriend(data.useroneid, data.useronename));
    global.newFriend = data;
  }
};

export function findNewFriend (friendname) {
  let friendArray = document.getElementsByClassName('friends');
  for (let i  = 0; i < friendArray.length; i++) {
    if (friendArray[i].innerHTML === friendname) {
      friendArray[i].classList.add('in-pchat');
      delete global.newName;
    }
  }
}

export function removeHighlight (target) {
  let friendArray = document.getElementsByClassName('friends');

  for (let i = 0; i < friendArray.length; i++) {
    if (friendArray[i].dataset['friendname'] === target) {
      friendArray[i].classList.remove('hasMessage');
    }
  }
};

export function removePChatHighlighting () {
  let friendArray = document.getElementsByClassName('friends');
  for (let  i = 0; i < friendArray.length; i++) {
    friendArray[i].classList.remove('in-pchat');
  }
}

export function startPChat (target) {
  let friendArray = document.getElementsByClassName('friends');
  for (let i = 0; i < friendArray.length; i++) {
    if (friendArray[i].dataset['friendname'] === target) {
      friendArray[i].classList.add('in-pchat');
      delete global.newName;
    }
    if (friendArray[i].dataset['friendname'] !== target) {
      friendArray[i].classList.remove('in-pchat');
    }
  }
}

// look inside of friendArray[i] to get to the left side
export function onlineUser (target) {

  let friendArray = document.getElementsByClassName('friends');

  for (let i = 0; i < friendArray.length; i++) {
    if (friendArray[i].dataset['friendname'] === target) {
      friendArray[i].classList.remove('offline');
      friendArray[i].classList.add('online');
    }
  }
};

export function offlineUser (target) {

  let friendArray = document.getElementsByClassName('friends');

  for (let i = 0; i < friendArray.length; i++) {
    if (friendArray[i].dataset['friendname'] === target) {
      friendArray[i].classList.remove('online');
      friendArray[i].classList.add('offline');
    }
  }
};

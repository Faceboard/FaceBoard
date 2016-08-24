import { store } from '../index';
import { addFriend } from '../actions/friends';

export function findFriend (data) {
  let friendArray = document.getElementsByClassName('friends');
  let hasFriend = false;
  for (let i = 0; i < friendArray.length; i++) {
    console.log('friendArray', friendArray[i].innerHTML);
    if (friendArray[i].innerHTML === data.useronename && !friendArray[i].classList.contains('in-pchat')) {
      friendArray[i].classList.add('hasMessage');
      hasFriend = true;
      delete global.newFriend;
    }
  }
  if (!hasFriend) {
    console.log('this happened');
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
    if (friendArray[i].innerHTML === target) {
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
    if (friendArray[i].innerHTML === target) {
      friendArray[i].classList.add('in-pchat');
      delete global.newName;
    }
    if (friendArray[i].innerHTML !== target) {
      friendArray[i].classList.remove('in-pchat');
    }
  }
}

export function onlineUser (target) {

  let friendArray = document.getElementsByClassName('friends');

  for (let i = 0; i < friendArray.length; i++) {
    if (friendArray[i].innerHTML === target) {
      friendArray[i].classList.remove('fa-star-o');
      friendArray[i].classList.add('fa-star');
    }
  }
};

export function offlineUser (target) {

  let friendArray = document.getElementsByClassName('friends');

  for (let i = 0; i < friendArray.length; i++) {
    if (friendArray[i].innerHTML === target) {
      friendArray[i].classList.remove('fa-star');
      friendArray[i].classList.add('fa-star-o');
    }
  }
};
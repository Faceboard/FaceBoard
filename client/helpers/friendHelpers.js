export function findFriend (data) {
  let friendArray = document.getElementsByClassName('friends');

  for (let i = 0; i < friendArray.length; i++) {
    if (friendArray[i].innerHTML === data.useronename && !friendArray[i].classList.contains('in-pchat')) {
      friendArray[i].classList.add('hasMessage');
    }
  }
};

export function removeHighlight (target) {
  let friendArray = document.getElementsByClassName('friends');

  for (let i = 0; i < friendArray.length; i++) {
    if (friendArray[i].innerHTML === target) {
      friendArray[i].classList.remove('hasMessage');
    }
  }
};

export function startPChat (target) {
  let friendArray = document.getElementsByClassName('friends');
  for (let i = 0; i < friendArray.length; i++) {
    if (friendArray[i].innerHTML === target) {
      friendArray[i].classList.add('in-pchat');
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
      friendArray[i].classList.remove('fa');
      friendArray[i].classList.remove('fa-star-o');
      friendArray[i].classList.add('fa');
      friendArray[i].classList.add('fa-star');
    }
  }
};

export function offlineUser (target) {

  let friendArray = document.getElementsByClassName('friends');

  for (let i = 0; i < friendArray.length; i++) {
    if (friendArray[i].innerHTML === target) {
      friendArray[i].classList.add('fa');
      friendArray[i].classList.add('fa-star');
      friendArray[i].classList.remove('fa');
      friendArray[i].classList.remove('fa-star-o');
    }
  }
};

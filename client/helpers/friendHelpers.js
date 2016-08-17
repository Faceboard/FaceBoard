export function findFriend () {
  let friendArray = document.getElementsByClassName('friends');
  for (let i = 0; i < friendArray.length; i++) {
    if (friendArray[i].innerHTML === global.localStorage.secondusername) {
      friendArray[i].className = 'hasMessage';
    }
  }
};


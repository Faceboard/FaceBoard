export function findFriend (data) {
  let friendArray = document.getElementsByClassName('friends');
  for (let i = 0; i < friendArray.length; i++) {
    if (friendArray[i].innerHTML === data.useronename) {
      friendArray[i].className = 'hasMessage';
    }
  }
};


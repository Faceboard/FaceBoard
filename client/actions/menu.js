import { makePrivateSession } from './session';
import { deleteFriend } from './friends';
const remote = window.require('electron').remote;
const Menu = remote.Menu;
const MenuItem = remote.MenuItem;
const ipcRenderer = window.require('electron').ipcRenderer;

let menuRendered;

export function makeMenu () {
  let menu = new Menu();
  menu.append(new MenuItem({
    label: 'Invite user',
    click: () => {
      makePrivateSession(global.localStorage.username, global.localStorage.secondPerson);
    }
  }));
  menu.append(new MenuItem({
    label: 'Delete Friend',
    click: () => {
      deleteFriend(global.localStorage.secondPerson);
    }
  }));

  let rightClickListener = (event) => {
    event.preventDefault();
    global.localStorage.secondPerson = event.target.innerHTML;
    menu.popup(remote.getCurrentWindow());
  }



  if (!menuRendered) {
    let allFriends = document.getElementsByClassName('friends');
    if (allFriends.length) {
      menuRendered = true;
    }
    for (let i = 0; i < allFriends.length; i++) {
      // remove previous event rightClickListener before adding a new one
      allFriends[i].removeEventListener('contextmenu', rightClickListener);
      allFriends[i].addEventListener('contextmenu', rightClickListener);
    }
  }

}

export function reattachMenus () {
  menuRendered = false;
}

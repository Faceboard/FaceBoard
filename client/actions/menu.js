import { makePrivateSession } from './session';
const remote = window.require('electron').remote;
const Menu = remote.Menu;
const MenuItem = remote.MenuItem;
const ipcRenderer = window.require('electron').ipcRenderer;

let menuRendered;

export function makeMenu () {
  let menu = new Menu();
  console.log('made menu');
  menu.append(new MenuItem({
    label: 'Invite user',
    click: () => {
      makePrivateSession(global.localStorage.username, global.localStorage.secondPerson);
    }
  }));

  var listener = (event) => {
    event.preventDefault();
    global.localStorage.secondPerson = event.target.innerHTML;
    menu.popup(remote.getCurrentWindow());
  }

  if (!menuRendered) {
    let allFriends = document.getElementsByClassName('friends');
    if (allFriends.length) {
      menuRendered = true;
    }
    for (var i = 0; i < allFriends.length; i++) {
      // remove previous event listener before adding a new one
      allFriends[i].removeEventListener('contextmenu', listener);

      console.log('THIS IS WHERE LISTENER IS ADDED');

      allFriends[i].addEventListener('contextmenu', listener);
    }
  }
}

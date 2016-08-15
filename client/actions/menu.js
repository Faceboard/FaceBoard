import { makePrivateSession } from './session';
const remote = window.require('electron').remote;
const Menu = remote.Menu;
const MenuItem = remote.MenuItem;

export function makeMenu () {
  let menu = new Menu();
  menu.append(new MenuItem({
    label: 'Invite user',
    click: () => {
      makePrivateSession(global.localStorage.username, global.localStorage.secondPerson);
    }
  }))

  let allFriends = document.getElementsByClassName('friends');
  for (var i = 0; i < allFriends.length; i++) {
    allFriends[i].addEventListener('contextmenu', (event) => {
      event.preventDefault();
      global.localStorage.secondPerson = event.target.innerHTML;
      menu.popup(remote.getCurrentWindow());
    }, false)
  }
  window.menuMade = true;
}

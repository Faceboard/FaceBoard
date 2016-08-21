import { makePrivateSession } from './session';
import { deleteFriend } from './friends';
import { rightClickPChat } from './chat';
const remote = window.require('electron').remote;
const Menu = remote.Menu;
const MenuItem = remote.MenuItem;
const ipcRenderer = window.require('electron').ipcRenderer;

let menuRendered;

export function makeMenu (router) {
  let menu = new Menu();
  menu.append(new MenuItem({
    label: 'Invite user',
    click: () => {
      makePrivateSession(global.localStorage.username, global.localStorage.secondusername);
    }
  }));
  menu.append(new MenuItem({
    label: 'Delete Friend',
    click: () => {
      deleteFriend(global.localStorage.secondusername);
    }
  }));

  menu.append(new MenuItem({
    label: 'Private message user',
    click: () => {
      rightClickPChat(router);
    }
  }));

  let rightClickListener = (event) => {
    event.preventDefault();
    global.localStorage.seconduserid = event.target.value;
    global.localStorage.secondusername = event.target.innerHTML;
    global.localStorage.pchat = global.localStorage.username + global.localStorage.seconduserid;
    menu.popup(remote.getCurrentWindow());
  };

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

};

export function makeChatMenu () {
  let chatMenu = new Menu();
  chatMenu.append(new MenuItem({
    label: 'Invite user',
    click: () => {
      makePrivateSession(global.localStorage.username, global.localStorage.secondusername);
    }
  }));

  chatMenu.append(new MenuItem({
    label: 'Private message user',
    click: () => {
      rightClickPChat(router);
    }
  }));

  let chatListener = (event) => {
    event.preventDefault();
    console.log('called');
    chatMenu.popup(remote.getCurrentWindow());
  };

  let allUsers = document.getElementsByClassName('user');

  for (let i = 0; i < allUsers.length; i++) {
    console.log('this was also called');
    allUsers[i].addEventListener('click', chatListener);
  }
}

export function reattachMenus () {
  menuRendered = false;
};

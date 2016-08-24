import { makePrivateSession } from './session';
import { rightClickPChat } from './chat';
import { showRoomSelect } from './room';
const remote = window.require('electron').remote;
const Menu = remote.Menu;
const MenuItem = remote.MenuItem;
const ipcRenderer = window.require('electron').ipcRenderer;

let menuRendered;
let chatMenuRendered;
let pchatMenuRendered;

export function makeMenu (router) {
  let menu = new Menu();
  menu.append(new MenuItem({
    label: 'Invite user',
    click: () => {
      makePrivateSession(global.localStorage.username, global.localStorage.secondusername);
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

export function makeChatMenu (router) {
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

  chatMenu.append(new MenuItem({
    label: 'Invite user to a room',
    click: () => {
      showRoomSelect();
    }
  }));

  let chatListener = (event) => {
    event.preventDefault();
    let seconduser = event.target.textContent.slice(0, event.target.textContent.length - 1);
    global.localStorage.seconduserid = event.target.getAttribute('value');
    global.localStorage.secondusername = seconduser;
    global.localStorage.pchat = global.localStorage.username + global.localStorage.seconduserid;
    chatMenu.popup(remote.getCurrentWindow());
  };

  let allUsers = document.getElementsByClassName('user');
  let el;
  let elClone;
  for (let i = 0; i < allUsers.length; i++) {
    el = allUsers[i];
    elClone = el.cloneNode(true);
    elClone.addEventListener('click', chatListener);
    el.parentNode.replaceChild(elClone, el);
  }
};

export function makePChatMenu () {
  let pchatMenu = new Menu();

  pchatMenu.append(new MenuItem({
    label: 'Invite user',
    click: () => {
      makePrivateSession(global.localStorage.username, global.localStorage.secondusername);
    }
  }));

  pchatMenu.append(new MenuItem({
    label: 'Invite user to a room',
    click: () => {
      showRoomSelect();
    }
  }));


  let pchatListener = (event) => {
    let seconduser = event.target.textContent.slice(0, event.target.textContent.length - 1);
    global.localStorage.secondusername = seconduser;
    pchatMenu.popup(remote.getCurrentWindow());
  }

  let allUsers = document.getElementsByClassName('user');
  let el;
  let elClone;
  for (let i = 0; i < allUsers.length; i++) {
    el = allUsers[i];
    elClone = el.cloneNode(true);
    elClone.addEventListener('click', pchatListener);
    el.parentNode.replaceChild(elClone, el);
  }
}

export function reattachMenus () {
  menuRendered = false;
};


export function reattachChatMenus () {
  chatMenuRendered = false;
}

export function reattachPChatMenu () {
  pchatMenuRendered = false;
}
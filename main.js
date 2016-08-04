"use strict";

//required for windows .exe files. Mac and Linux will ignore this.
// if (require('electron-squirrel-startup')) return;

const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const app = electron.app;

let win;

app.on('ready', function() {

  win = new BrowserWindow({
    width: 800,
    height: 600
  });

  win.loadURL(`file://${__dirname}/client/static/index.html`);
  win.webContents.openDevTools();

  app.on('closed', function() {
    win = null;
  });

});

// auto reload on any changes
// look into this
// require('electron-reload')(__dirname);

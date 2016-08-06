"use strict";

const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const app = electron.app;

// if (handleSquirrelEvent()) { return; }
//
// function handleSquirrelEvent() {
//   if (process.argv.length === 1) {
//     return false;
//   }
//
//   const ChildProcess = require('child_process');
//   const path = require('path');
//
//   const appFolder = path.resolve(process.execPath, '..');
//   const rootAtomFolder = path.resolve(appFolder, '..');
//   const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
//   const exeName = path.basename(process.execPath);
//
//   const spawn = function(command, args) {
//     let spawnedProcess, error;
//
//     try {
//       spawnedProcess = ChildProcess.spawn(command, args, {detached: true});
//     } catch (error) {}
//
//     return spawnedProcess;
//   };
//
//   const spawnUpdate = function(args) {
//     return spawn(updateDotExe, args);
//   };
//
//   const squirrelEvent = process.argv[1];
//   switch (squirrelEvent) {
//     case '--squirrel-install':
//     case '--squirrel-updated':
//       spawnUpdate(['--createShortcut', exeName]);
//       setTimeout(app.quit, 1000);
//       return true;
//
//     case '--squirrel-uninstall':
//       spawnUpdate(['--removeShortcut', exeName]);
//       setTimeout(app.quit, 1000);
//       return true;
//
//     case '--squirrel-obsolete':
//       app.quit();
//       return true;
//   }
// };
//
//
//
//





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
require('electron-reload')(__dirname);

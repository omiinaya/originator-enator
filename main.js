require('electron-reload')(__dirname, { ignored: /db|[\/\\]\./, argv: [] });
require('@electron/remote/main').initialize()
const { app, BrowserWindow } = require('electron');
const path = require('path');

global.window;

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.loadFile(path.join(__dirname, './assets/html/index.html'));
  global.window = mainWindow
};

app.on('ready', createWindow);

require('./ipcMain.js')
require('electron-reload')(__dirname, { ignored: /db|[\/\\]\./, argv: [] });
require('@electron/remote/main').initialize()
const { app, BrowserWindow } = require('electron');
const path = require('path');

global.window;

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    show: false,
    minWidth: 800,
    minHeight: 770,
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.loadFile(path.join(__dirname, './assets/html/index.html'));

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  global.window = mainWindow
};

app.on('ready', () => {
  createWindow()
});

require('./ipcM.js')
require('./get.js')
require('./set.js')
require('./core.js')
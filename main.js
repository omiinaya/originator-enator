require('v8-compile-cache')

const { app, BrowserWindow } = require('electron');
const path = require('path');

require('electron-reload')(__dirname, {
      electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
      ignored: /db|[\/\\]\./, argv: [] })

global.window;

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    show: false,
    width: 800,
    height: 900,
    minWidth: 800,
    minHeight: 900,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
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
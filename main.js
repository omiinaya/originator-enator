require('v8-compile-cache')

const { app, BrowserWindow } = require('electron');
const path = require('path');

require('electron-reload')(__dirname, {
      electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
      ignored: /db|[\/\\]\./, argv: [] })

global.window;
global.pause;

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    show: false,
    width: 800,
    height: 950,
    minWidth: 800,
    minHeight: 950,
    icon: path.join(__dirname + './assets/images/favicon.png'),
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
  global.pause = false;
};

app.on('ready', () => {
  createWindow()
});

require('./ipcM.js')
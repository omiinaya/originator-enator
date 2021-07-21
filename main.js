require('v8-compile-cache');
require('electron-reload')(__dirname, { ignored: /db|[\/\\]\./, argv: [] });
require('@electron/remote/main').initialize()
const { app, BrowserWindow } = require('electron');
const path = require('path');

global.window;

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    show: false,
    width: 800,
    height: 900,
    minWidth: 800,
    minHeight: 900,
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
  test()
});

function test() {
  var root = process.env['USERPROFILE'].split('\\')[0] + '\\'
  console.log(root)
}

require('./ipcM.js')
require('electron-reload')(__dirname, { ignored: /db|[\/\\]\./, argv: [] });
const { app, BrowserWindow } = require('electron');
const { execSync } = require('child_process')
const ipc = require('electron').ipcMain
const path = require('path');

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.loadFile(path.join(__dirname, './assets/html/index.html'));
};


app.on('ready', createWindow);

ipc.on('TESTING_1', function () {
  console.log(getSystemInfo())
  console.log(getCurrentUser())
  console.log(getPCName())
  setPCDescription()
  setPCName()
})

function getSystemInfo() {
  var motherboard = execSync('wmic baseboard get product').toString().replace(/\n/g, '').split(' ')[2].trim()
  return motherboard
}

function getPCName() {
  var name = execSync('cmd /k hostname').toString().trim()
  return name
}

function getCurrentUser() {
  var user = execSync('echo %USERNAME%').toString().trim()
  return user
}

function setPCDescription() {
  var description = getCurrentUser()+"PC"
  execSync('net config server /srvcomment:' + description)
}

function setPCName() {
  var currentName = getPCName()
  var newName = getCurrentUser() + "-PC"
  execSync('WMIC computersystem where caption='+ currentName +' rename '+newName)
}

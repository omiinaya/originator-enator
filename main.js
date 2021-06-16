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
  console.log(getMBInfo())
  console.log(getUser())
  console.log(getPCName())
  setPCDescription()
  setPCName()
  setMonitorTimeout()
})

function getMBInfo() {
  return execSync('wmic baseboard get product').toString().replace(/\n/g, '').split(' ')[2].trim()
}

function getPCName() {
  return execSync('echo %computername%').toString().trim()
}

function getUser() {
  return execSync('echo %USERNAME%').toString().trim()
}

//NamePC
function setPCDescription() {
  var description = getUser()+"PC"
  return execSync('net config server /srvcomment:' + description)
}

//Name-PC
function setPCName() {
  var newName = "'"+getUser() + "-PC'"
  return execSync("WMIC computersystem where caption='%computername%' call rename name="+newName)
}

function setMonitorTimeout() {
  return execSync('powercfg /change monitor-timeout-ac 0').toString()
}
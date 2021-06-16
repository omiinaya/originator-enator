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
})

ipc.on('TESTING_2', function () {
  console.log(getUser())
})

ipc.on('TESTING_3', function () {
  console.log(getPCName())
})

ipc.on('TESTING_4', function () {
  setPCDescription()
})

ipc.on('TESTING_5', function () {
  setPCName()
})

ipc.on('TESTING_6', function () {
  setMonitorTimeout()
})

ipc.on('TESTING_7', function () {
  console.log(getPowerGUID("High"))
})

ipc.on('TESTING_8', function () {
  console.log(getPowerGUID("Balanced"))
})

ipc.on('TESTING_9', function () {
  setPowerCfg('High')
})

ipc.on('TESTING_10', function () {
  setPowerCfg('Balanced')
})

function getMBInfo() {
  var x = execSync('wmic baseboard get product').toString().replace("Product", "").trim()
  var y = x.lastIndexOf(' ')
  var z = x.substring(0, y + 1)
  return z
}

function getPCName() {
  return execSync('echo %computername%').toString().trim()
}

function getUser() {
  return execSync('echo %USERNAME%').toString().trim()
}

function getPowerGUID(a) {
  var raw = execSync('powercfg /list').toString().trim()
  var bloated = raw.split('\n');
  var list = bloated.splice(2, bloated.length - 1);
  var guid;
  list.forEach(line => {
    if (line.includes(a)) {
      guid = line.substring(
        line.lastIndexOf(":") + 1,
        line.lastIndexOf("(")
      )
      .trim()
    }
  })
  return guid
}

function setPCDescription() {
  var description = getUser() + "PC"
  return execSync('net config server /srvcomment:' + description)
}

function setPCName() {
  var newName = "'" + getUser() + "-PC'"
  return execSync("WMIC computersystem where caption='%computername%' call rename name=" + newName)
}

function setMonitorTimeout() {
  return execSync('powercfg /change monitor-timeout-ac 0').toString()
}

function setPowerCfg(a) {
  return execSync('powercfg /setactive '+getPowerGUID(a)).toString()
}
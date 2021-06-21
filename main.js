require('electron-reload')(__dirname, { ignored: /db|[\/\\]\./, argv: [] });
const { app, BrowserWindow } = require('electron');
const { execSync, spawnSync, spawn } = require('child_process')
const ipc = require('electron').ipcMain
const path = require('path');
const exec = require('@mh-cbon/aghfabsowecwn').exec;

//exec options
var opts = {
  bridgeTimeout: 5000,    // a timeout to detect that UAC was not validated, defaults to 3 minutes
  stdio: 'pipe',          // How do you want your pipes ?
  env: {
    'FORCE_COLOR': 1,  // example, enable chalk coloring  
    'DEBUG': '*'      // example, enable visionmedia/debug output
  }
}

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

ipc.on('TESTING_11', function () {
  pShellExec('helloworld.ps1')
})

ipc.on('TESTING_12', function () {
  setStandbyTimeout()
})

ipc.on('TESTING_13', function () {
  takeOwnership('C:\\Users\\Nfernal\\Desktop\\test\\')
})

ipc.on('TESTING_14', function () {
  console.log(getCurrentScheme())
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
  //getting the raw output of the command
  var raw = execSync('powercfg /list').toString().trim()
  //splitting the output into lines
  var bloated = raw.split('\n');
  //removing the first 2 lines
  var list = bloated.splice(2, bloated.length - 1);
  //check if a line contains whatever value was passed on a (high/balanced)
  var guid;
  list.forEach(line => {
    if (line.includes(a)) {
      guid = line.substring(
        line.lastIndexOf(":") + 1,
        line.lastIndexOf("(")
      ).trim()
    }
  })
  return guid
}

function getCurrentScheme() {
  var output = execSync('powercfg /getactivescheme').toString().trim()
  var scheme = output.substring(
    output.lastIndexOf(":") + 1,
    output.lastIndexOf("(")
  ).trim()
  return scheme
}

function setPCDescription(arg) {
  if (!arg) {
    //if no name provided as an argument, change it to usernamepc
    var description = getUser() + "PC"
    return exec('net config server /srvcomment:' + description)
  } else {
    //if argument provided, change it to arg
    return exec('net config server /srvcomment:' + arg)
  }
}

function setPCName(arg) {
  if (!arg) {
    //if no name provided as an argument, change it to username-pc
    var newName = "'" + getUser() + "-PC'"
    return exec("WMIC computersystem where caption='%computername%' call rename name=" + newName)
  } else {
    //if argument provided, change it to arg
    return exec("WMIC computersystem where caption='%computername%' call rename name=" + arg)
  }
}

function setMonitorTimeout() {
  exec('powercfg /change monitor-timeout-ac 0') //0 = never
  exec('powercfg /change monitor-timeout-dc 0')
}

function setStandbyTimeout() {
  exec('powercfg -change -standby-timeout-ac 0')
  exec('powercfg -change -standby-timeout-dc 0')
}

function setPowerCfg(a) {
  //if there is no high setting, register it
  if (!getPowerGUID(a)) {
    registerPowerPlan(a)
  } else {
    return execSync('powercfg /setactive ' + getPowerGUID(a))
  }
}

function registerPowerPlan(a) {
  if (a === "High") {
    execSync('powercfg -duplicatescheme 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c')
    setPowerCfg(a)
  } else if (a === "Ultimate") {
    //unnecessary else with GUID for Ultimate
    execSync('powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61')
    setPowerCfg(a)
  }
}

//executing pshell if admin rights
function pShellExec(a) {
  var child = spawn('powershell.exe', ['./assets/scripts/' + a]);

  child.stdout.on("data", function (data) {
    console.log("out: " + data)
  })

  child.stderr.on("data", function (data) {
    console.log("err: " + data)
  })

  child.on("exit", function () {
    console.log("Script successfully executed")
  })
}

function takeOwnership(a) {
  var child = exec('takeown /f ' + a + ' /r /d y', opts)

  child.stdout.pipe(process.stdout)
  child.stderr.pipe(process.stderr)

  child.on('close', function (code) {
    console.log('Hostile takeover successful.')
  })
}

//C:\ProgramData\Microsoft\Windows\SystemData
//C:\ProgramData\Microsoft\Windows\SystemData\S-1-5-18\ReadOnly\LockScreen_Z
//directory where windows stores lockscreen image
//takeown /f <foldername> /r /d y
//reg=HKEY_CURRENT_USER\SOFTWARE\Microsoft\Windows\CurrentVersion\ContentDeliveryManager\RotatingLockScreenEnalbed
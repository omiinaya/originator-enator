require('electron-reload')(__dirname, { ignored: /db|[\/\\]\./, argv: [] });
const { app, BrowserWindow } = require('electron');
const { execSync, spawn, exec } = require('child_process')
const ipc = require('electron').ipcMain
const path = require('path');
const elevate = require('@mh-cbon/aghfabsowecwn').exec;
const delay = ms => new Promise(res => setTimeout(res, ms));

let window;
let scriptsHome = __dirname + '\\assets\\scripts\\';

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
  window = mainWindow
};

app.on('ready', createWindow);

ipc.on('TESTING_1', function () {
  print(getMBInfo())
})

ipc.on('TESTING_2', function () {
  print(getUser())
})

ipc.on('TESTING_3', function () {
  print(getPCName())
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
  print(getPowerGUID("High"))
})

ipc.on('TESTING_8', function () {
  print(getPowerGUID("Balanced"))
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
  print(getCurrentScheme())
})

ipc.on('TESTING_15', function () {
  print(getSchemeContents())
})

ipc.on('TESTING_16', function () {
  getRegistry()
})

ipc.on('TESTING_17', function () {
  imageSwap()
})

ipc.on('TESTING_18', function () {
  getDrives()
})

ipc.on('TESTING_19', function () {
  registerPowerPlan('High')
})

ipc.on('TESTING_20', function () {
  registerPowerPlan('Ultimate')
})

ipc.on('TESTING_21', function () {
  unpinBloat()
})

ipc.on('TESTING_22', function () {
  initializeDrives()
})

ipc.on('TESTING_23', function () {
  disableOneDrive()
})

ipc.on('TESTING_24', function () {
  installSoftware()
})

ipc.on('TESTING_25', function () {
  beforeCleanUp()
})

ipc.on('TESTING_26', function () {
  setEdgeHome()
})

ipc.on('TESTING_27', function () {
  runCleanUp()
})

ipc.on('TESTING_28', function () {
  runClearLogs()
})

ipc.on('TESTING_29', function () {
  runSysprep()
})

ipc.on('TESTING_30', function () {
  runAfterSysprep()
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

function setPCDescription() {
  execSync('net config server /srvcomment:"%USERNAME%'+'PC"')
}

function setPCName() {
  execSync(`WMIC computersystem where caption='%computername%' call rename name='%USERNAME%`+`-PC'`)
}


function setMonitorTimeout() {
  elevate('powercfg /change monitor-timeout-ac 0') //0 = never
  elevate('powercfg /change monitor-timeout-dc 0')
}

function setStandbyTimeout() {
  elevate('powercfg -change -standby-timeout-ac 0')
  elevate('powercfg -change -standby-timeout-dc 0')
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
  var child = spawn('powershell.exe',['-ExecutionPolicy', 'ByPass', '-File','./assets/scripts/' + a], { shell:true, detached: true });

  child.stdout.on("data", function (data) {
    print("out: " + data)
  })

  child.stderr.on("data", function (data) {
    print("err: " + data)
  })

  child.on("exit", function () {
    print("Script successfully executed")
  })
}

function takeOwnership(a) {
  var child = elevate('takeown /F ' + a + ' /A /R /D Y', opts)

  child.stdout.pipe(process.stdout)
  child.stderr.pipe(process.stderr)

  child.on('close', function (code) {
    print('exit: ' + code)
  })
}

function takeOwnership2(a) {
  elevate('icacls ' + a + ' /grant Users:F', opts)
  elevate('icacls ' + a + ' /setowner "Administrators" /T /C', opts)
}

function getImageName(a) {
  var x = execSync('dir ' + a).toString().trim()
  var y = x.split('\n')
  var z = y.filter(name => name.includes('LockScreen') && name.includes('.jpg'))
  var name = z[0].substring(z[0].lastIndexOf(' '), z[0].lastIndexOf('g') + 1).trim()
  return name
}

function copyFile(a, b) {
  //copy sourceFile destinationFile
  var child = exec('copy ' + a + ' ' + b, opts)

  child.stdout.pipe(process.stdout)
  child.stderr.pipe(process.stderr)

  child.on('close', function (code) {
    print('exit: ' + code)
  })
}

function renameFile(a, b) {
  var child = elevate('rename  ' + a + '  ' + b, opts)

  child.stdout.pipe(process.stdout)
  child.stderr.pipe(process.stderr)

  child.on('close', function (code) {
    print('exit: ' + code)
  })
}

function disableOneDrive() {
  pShellExec('DISABLE_ONEDRIVE.ps1')
}

function installSoftware() {
  pShellExec('INSTALL_SOFTWARE.ps1')
}

function unpinBloat() {
  pShellExec('UNPIN_BLOAT.ps1')
}

function runSysprep() {
  //try exec('start "" "tmp.txt"', {cwd: 'C:\\Users\\testuser\\Node_dev'});
  var file = scriptsHome + 'sysprep.cmd';
  console.log(file)
  exec('start ' + file).toString().trim()
}

function runAfterSysprep() {
  var file = scriptsHome + 'RunAfterSysprep.cmd';
  console.log(file)
  exec('start ' + file).toString().trim()
}

function runCleanUp() {
  var file = scriptsHome + 'CleanUp.cmd';
  console.log(file)
  exec('start ' + file).toString().trim()
}

function runClearLogs() {
  var file = scriptsHome + 'clearlogs.bat';
  console.log(file)
  exec('start ' + file).toString().trim()
}

function getDrives() {
  var output = execSync('wmic logicaldisk get name, size, volumename, description').toString()
  var drives = output.split('\n').splice(1, output.length - 1)
  return drives
}

function initializeDrives() {
  pShellExec('INITIALIZE_DRIVES.ps1')
}

function beforeCleanUp() {
  pShellExec('BEFORE_CLEANUP.ps1')
}

function setEdgeHome() {
  pShellExec('SET_EDGE_TO_ORIGIN.ps1')
}

async function imageSwap() {
  var imgDir1 = 'C:\\ProgramData\\Microsoft\\Windows\\SystemData\\'
  var imgDir2 = imgDir1 + 'S-1-5-18\\ReadOnly\\LockScreen_Z\\'
  var imgDir3 = imgDir2 + getImageName(imgDir2)
  var originImage = __dirname + '\\assets\\images\\origin-red.jpg'
  var originCopy = 'origin-red.jpg'
  var imgDir4 = imgDir2 + originCopy
  /*
  takeOwnership(imgDir1)
  print('Successfully took ownership of the first directory.')
  await delay(2000)
  takeOwnership(imgDir2)
  print('Successfully took ownership of the second directory.')
  await delay(2000)
  takeOwnership2(imgDir3)
  print('Successfully took ownership of the actual image.')
  await delay(2000)
  */
  const originalName = getImageName(imgDir2)
  copyFile(originImage, imgDir2 + 'origin-red.jpg')
  await delay(2000)
  renameFile(imgDir3, 'OLD_' + getImageName(imgDir2))
  await delay(2000)
  print(originalName)
  print(imgDir4)
  renameFile(imgDir4, originalName)
}

//LockScreen___1920_1080_notdimmed
//C:\ProgramData\Microsoft\Windows\SystemData
//C:\ProgramData\Microsoft\Windows\SystemData\S-1-5-18\ReadOnly\LockScreen_Z
//directory where windows stores lockscreen image
//takeown /f <foldername> /r /d y
//reg=HKEY_CURRENT_USER\SOFTWARE\Microsoft\Windows\CurrentVersion\ContentDeliveryManager\RotatingLockScreenEnalbed


function print(a) {
  window.webContents.send('LOG_REQUEST', a);
}
const ipc = require('electron').ipcMain
const { execSync, spawn, exec } = require('child_process')
const elevated = require('@mh-cbon/aghfabsowecwn').exec;
const set = require('./set')

var opts = {
    bridgeTimeout: 5000,    // a timeout to detect that UAC was not validated, defaults to 3 minutes
    stdio: 'pipe',          // How do you want your pipes ?
    env: {
        'FORCE_COLOR': 1,     // example, enable chalk coloring  
        'DEBUG': '*'          // example, enable visionmedia/debug output
    }
}

function print(a) {
    global.window.webContents.send('LOG_REQUEST', a);
}

function registerPowerPlan(a) {
    if (a === "High") {
        execSync('powercfg -duplicatescheme 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c')
        set.PowerCfg(a)
    } else if (a === "Ultimate") {
        //unnecessary else with GUID for Ultimate
        execSync('powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61')
        set.PowerCfg(a)
    }
}

function pShellExec(a) {
    var child = spawn('powershell.exe', ['-ExecutionPolicy', 'ByPass', '-File', './assets/scripts/' + a], { shell: true, detached: true });

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
    var child = elevated('takeown /F ' + a + ' /A /R /D Y', opts)

    child.stdout.pipe(process.stdout)
    child.stderr.pipe(process.stderr)

    child.on('close', function (code) {
        print('exit: ' + code)
    })
}

function takeOwnership2(a) {
    elevated('icacls ' + a + ' /grant Users:F', opts)
    elevated('icacls ' + a + ' /setowner "Administrators" /T /C', opts)
}

function copyFile(a, b) {
    //copy sourceFile destinationFile
    var child = elevated('copy ' + a + ' ' + b, opts)

    child.stdout.pipe(process.stdout)
    child.stderr.pipe(process.stderr)

    child.on('close', function (code) {
        print('exit: ' + code)
    })
}

function renameFile(a, b) {
    var child = elevated('rename  ' + a + '  ' + b, opts)
  
    child.stdout.pipe(process.stdout)
    child.stderr.pipe(process.stderr)
  
    child.on('close', function (code) {
      print('exit: ' + code)
    })
  }

module.exports = {
    print,
    registerPowerPlan,
    pShellExec,
    takeOwnership,
    takeOwnership2,
    copyFile,
    renameFile
}
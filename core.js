const { execSync, spawn } = require('child_process')
const elevated = require('@mh-cbon/aghfabsowecwn').exec;

var opts = {
    bridgeTimeout: 5000,
    stdio: 'pipe',
    env: {
        'FORCE_COLOR': 1,
        'DEBUG': '*'
    }
}

function print(a) {
    window.webContents.send('LOG_REQUEST', a);
}

function registerPowerPlan(a) {
    if (a === "High") {
        execSync('powercfg -duplicatescheme 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c')
        setPowerCfg(a)
    } else if (a === "Ultimate") {
        execSync('powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61')
        setPowerCfg(a)
    }
}

function cmdShellExec(a) {
    var child = spawn('cmd.exe', ["/c", a], { shell: true, detached: true })

    child.stdout.on("data", function (data) {
        print("out: " + data)
    })

    child.stderr.on("data", function (data) {
        //print("err: " + data)
    })

    isDone(a, child.pid)
}

function pShellExec(a) {
    var child = spawn('powershell.exe', ['-ExecutionPolicy', 'ByPass', '-File', a], { shell: true, detached: true });

    child.stdout.on("data", function (data) {
        print("out: " + data)
    })

    child.stderr.on("data", function (data) {
        print("err: " + data)
    })

    isDone(a, child.pid)
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

function findProcessByName(a) {
    var content;

    try {
        content = execSync('tasklist /NH | findstr /I ' + a).toString().trim()
    }

    catch (error) {
        window.webContents.send('ALERT_REQUEST', 'Process not found.');
    }

    return content
}


function findProcessByPiD(a) {
    var content;

    try {
        content = execSync('wmic process where processId=' + a + ' get name').toString().replace('Name', '').trim()
    }

    catch (error) {
        window.webContents.send('ALERT_REQUEST', 'Process not found.');
    }

    return content
}

function killProcessByName(a) {
    return execSync('taskkill /IM ' + a + ' /F').toString().trim()
}

function restartSystem() {
    return execSync('shutdown /r /t 0').toString().trim()
}

/*
function isUsing(a) {
    //handle.exe -a -u ./HELLO_WORLD.ps1
    return execSync('handle.exe -a -u ' + a).toString().trim()
}
*/

function isDone(filename, PiD) {
    var isRunning = findProcessByPiD(PiD)
    timer = setTimeout(function () {
        print(isRunning)
        isDone(filename, PiD)
    }, 1000)
    if (!isRunning && !pause) {
        console.log(isRunning)
        clearTimeout(timer)
        print(filename + ' finished executing.')
        window.webContents.send('SHELL_END', filename);
    }
}

function findBySerial(bearings, serial) {
    return bearings.filter(element => element.Serial === serial)
}

module.exports = {
    print,
    registerPowerPlan,
    pShellExec,
    takeOwnership,
    takeOwnership2,
    copyFile,
    renameFile,
    findProcessByName,
    killProcessByName,
    isDone,
    cmdShellExec,
    findBySerial,
    restartSystem
}
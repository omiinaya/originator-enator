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
    global.window.webContents.send('LOG_REQUEST', a);
}

function registerPowerPlan(a) {
    if (a === "High") {
        execSync('powercfg -duplicatescheme 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c')
        set.PowerCfg(a)
    } else if (a === "Ultimate") {
        execSync('powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61')
        set.PowerCfg(a)
    }
}

function cmdShellExec(a) {
    var child = spawn('cmd.exe', ["/c", a], { shell: true, detached: true })

    child.stdout.on("data", function (data) {
        print("out: " + data)
    })

    child.stderr.on("data", function (data) {
        print("err: " + data)
    })

    child.on("exit", function (code) {
        console.log('exit: ' + code)
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

    child.on("exit", function (code) {
        console.log('exit: ' + code)
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

function nearestPower(num, power) {
    //power = 2 for power of 2
    return Math.pow(power, Math.round(Math.log(num) / Math.log(2)))
}

function findProcessByName(a) {
    try {
        return execSync('tasklist /NH | findstr /I ' + a).toString().trim()
    }
    catch (error) {
        return
    }
}


function findProcessByPiD(a) {
    try {
        return execSync('wmic process where processId=' + a + ' get name').toString().replace('Name', '').trim()
    }
    catch (error) {
        return
    }
}

function killProcessByName(a) {
    return execSync('taskkill /IM ' + a + ' /F').toString().trim()
}

/*
function isUsing(a) {
    //handle.exe -a -u ./HELLO_WORLD.ps1
    return execSync('handle.exe -a -u ' + a).toString().trim()
}
*/

function isDone(filename, PiD) {
    var isRunning = findProcessByPiD(PiD) //findProcessByName(process)
    timer = setTimeout(function () {
        print(isRunning)
        isDone(filename, PiD)
    }, 1000)
    if (!isRunning) {
        console.log(isRunning)
        clearTimeout(timer)
        print(filename + ' finished executing.')
        window.webContents.send('SHELL_END', filename);
    }
}

function isEmpty(a) {
    return a.indexOf(' ') > 0
}

function restartPC() {
    return execSync('shutdown /r').toString().trim()
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
    nearestPower,
    findProcessByName,
    killProcessByName,
    isDone,
    cmdShellExec,
    isEmpty,
    restartPC,
    findBySerial
}
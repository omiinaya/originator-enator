const { execSync, spawn } = require('child_process')
const elevated = require('@mh-cbon/aghfabsowecwn').exec;

var scriptsHome = process.cwd().split('\\')[0] + '\\scripts\\';

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

function pShellExec(a) {
    var child = spawn('powershell.exe', ['-ExecutionPolicy', 'ByPass', '-File', scriptsHome + a], { shell: true, detached: true });

    child.stdout.on("data", function (data) {
        print("out: " + data)
    })

    child.stderr.on("data", function (data) {
        print("err: " + data)
    })

    child.on("exit", function () {
        //print("Script successfully executed")
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

function findProcess(a) {
    try {
        return execSync('tasklist /NH | findstr /I ' + a).toString().trim()
    }
    catch (error) {
        return
    }
}

function killProcess(a) {
    return execSync('taskkill /IM ' + a + ' /F').toString().trim()
}

function isDone(process, filename) {
    var isRunning = findProcess(process)
    timer = setTimeout(function () {
      console.log(isRunning)
      isDone(process, filename)
    }, 1000)
    if (!isRunning) {
      clearTimeout(timer)
      console.log(filename + ' finished executing.')
    }
}

//maybe not necessary. we'll see.
function awaitStart(process, filename) {
    var isRunning = findProcess(process)
    var check = setTimeout(function () {
        if (!isRunning) {
            awaitStart(process, filename)
            console.log('Waiting on process...')
        } else {
            clearTimeout(check)
            isDone(process, filename)
        }
    })
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
    findProcess,
    killProcess,
    isDone,
    awaitStart
}
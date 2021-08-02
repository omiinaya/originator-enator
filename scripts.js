const { execSync } = require('child_process')
const core = require('./core')
const fs = require('fs')
const {
    setMonitorTimeout,
    setStandbyTimeout,
    setPCDescription,
    setPCName,
    setPowerCfgHigh,
    setPowerCfgBalanced
} = require('./set')
const {
    getRecoveryDrive,
    getSerialNumber,
    getItemsToPin
} = require('./get')

var PCProfile = process.env['USERPROFILE']
var PCRoot = PCProfile.split('\\')[0]
var PCDesktop = process.env['USERPROFILE'] + '\\Desktop\\'
var PCPublic = PCRoot + '\\Users\\Public\\'
var PublicDesktop = PCPublic + 'Desktop\\'
var USBRoot = process.cwd().split('\\')[0]
var scriptsHome = USBRoot + '\\scripts\\';

function disableOneDrive() {
    var file = scriptsHome + 'DISABLE_ONEDRIVE.ps1'
    core.pShellExec(file)
}

function installSoftware() {
    var file = scriptsHome + 'INSTALL_SOFTWARE.ps1'
    core.pShellExec(file)
}

function unpinBloat() {
    var file = scriptsHome + 'UNPIN_BLOAT.ps1'
    core.pShellExec(file)
}

function setLSImg() {
    var file = scriptsHome + 'SET_LOCK_SCREEN.ps1'
    core.pShellExec(file)
}

function runSysprep() {
    var file = scriptsHome + 'sysprep.cmd'
    core.cmdShellExec(file)
}

function runAfterSysprep() {
    var file = scriptsHome + 'RunAfterSysprep.cmd'
    core.cmdShellExec(file)
}

function runCleanUp() {
    var file = scriptsHome + 'CleanUp.cmd'
    core.cmdShellExec(file)
}

function runClearLogs() {
    var file = scriptsHome + 'clearlogs.cmd'
    core.cmdShellExec(file)
}

function initializeDrives() {
    var file = scriptsHome + 'INITIALIZE_DRIVES.ps1'
    core.pShellExec(file)
}

function beforeCleanUp() {
    var file = scriptsHome + 'BEFORE_CLEANUP.ps1'
    core.pShellExec(file)
}

function setEdgeHome() {
    var file = scriptsHome + 'SET_EDGE_TO_ORIGIN.ps1'
    core.pShellExec(file)
}

function installEdge() {
    var file = scriptsHome + 'INSTALL_EDGE.ps1'
    core.pShellExec(file)
}

function eraseRemnants() {
    var file = scriptsHome + 'eraseRemnants.cmd'
    core.cmdShellExec(file)
}

function activateWindows() {
    var file = scriptsHome + '\\ORIGINator2.0\\OA3\\Assemble.ps1'
    core.pShellExec(file)
}

function runBenchmarks() {
    var file = PCRoot + '\\ORIGINator2.0\\Benchmarks\\Run.ps1'
    core.pShellExec(file)
}

function saveScores() {
    var file = scriptsHome + '\\ORIGINator2.0\\Bin\\Source\\SaveScores.ps1'
    core.pShellExec(file)
}

function runNetwork() {
    var file = scriptsHome + 'Network.cmd'
    core.cmdShellExec(file)
}

function checkDrivers() {
    var file = scriptsHome + 'checkDrivers.cmd'
    core.cmdShellExec(file)
}

function formatRecoveryDrive() {
    var corsair = getRecoveryDrive()
    if (corsair) {
        var file = scriptsHome + 'formatDrive.cmd ' + corsair
        core.cmdShellExec(file)
    } else {
        window.webContents.send('ALERT_REQUEST', 'No drive labeled "CORSAIR" found.');
    }
}

function createRecoveryDrive() {
    var corsair = getRecoveryDrive()
    if (corsair) {
        core.cmdShellExec('ROBOCOPY ' + scriptsHome + '\\Originator2.0\\Software\\USBRecovery\\Image\\ /E /Z /MT ' + corsair)
        execSync('label ' + corsair + 'USB Recover')
    } else {
        window.webContents.send('ALERT_REQUEST', 'No drive labeled "CORSAIR" found.');
    }
}

function pinPrograms() {
    var toPin = getItemsToPin()
    if (toPin.length > 0) {
        toPin.forEach((item) => {
            var file = scriptsHome + 'PINTOTASKBAR.ps1 "' + PublicDesktop + item + '" PIN'
            core.pShellExec(file)
        })
    } else {
        console.log('No items to pin.')
    }
}

function resetUI() {
    window.webContents.send('CLEARBEARINGS_REQUEST')
}

function runHello() {
    var file = scriptsHome + 'HELLO_WORLD.ps1'
    core.pShellExec(file)
}

function abort() {
    var processes = ["powershell.exe", "cmd.exe"]
    processes.forEach(process => {
        try {
            window.webContents.send('CLEARQUEUE_REQUEST');
            core.killProcessByName(process)
        }
        catch (error) {
            console.log(error)
        }
    })
}

function progressUpdate(data) {
    var mb = getSerialNumber()
    var json = fs.readFileSync(scriptsHome + '\\bearings.json')
    var bearings = JSON.parse(json);
    var isFound = core.findBySerial(bearings, mb)
    console.log(isFound)
    if (isFound.length <= 0) {
        bearings.push({
            Serial: mb,
            [data]: true
        })
        fs.writeFileSync(scriptsHome + '\\bearings.json', JSON.stringify(bearings));
    } else {
        bearings.forEach(bearing => {
            if (bearing.Serial === mb) {
                Object.assign(bearing, { [data]: true })
                fs.writeFileSync(scriptsHome + '\\bearings.json', JSON.stringify(bearings));
            }
        })
    }
}

function progressRequest() {
    var mb = getSerialNumber()
    var json = fs.readFileSync(scriptsHome + '\\bearings.json')
    var bearings = JSON.parse(json);
    bearings.forEach((bearing) => {
        if (bearing.Serial === mb) {
            for (const key in bearing) {
                if (key !== 'Serial') {
                    window.webContents.send('CHECK_RESPONSE2', key);
                }
            }
        }
    })
}

function restartPC() {
    return execSync('shutdown /r').toString().trim()
}

module.exports = {
    disableOneDrive,
    installSoftware,
    unpinBloat,
    runSysprep,
    runAfterSysprep,
    runCleanUp,
    runClearLogs,
    initializeDrives,
    beforeCleanUp,
    setEdgeHome,
    installEdge,
    setLSImg,
    eraseRemnants,
    runHello,
    activateWindows,
    runBenchmarks,
    saveScores,
    runNetwork,
    checkDrivers,
    runBenchmarks,
    abort,
    createRecoveryDrive,
    resetUI,
    setPowerCfgHigh,
    setMonitorTimeout,
    setStandbyTimeout,
    setPCDescription,
    setPCName,
    setPowerCfgBalanced,
    progressUpdate,
    progressRequest,
    pinPrograms,
    formatRecoveryDrive,
    restartPC
}
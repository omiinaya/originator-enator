const ipc = require('electron').ipcMain
const core = require('./core')
const get = require('./get')

var PCRoot = process.env['USERPROFILE'].split('\\')[0]
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
    console.log(file)
    core.pShellExec(file)
}

function runBenchmarks() {
    var file = PCRoot + '\\ORIGINator2.0\\Benchmarks\\Run.ps1'
    console.log(file)
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

function createRecoveryDrive() {
    var corsair = get.RecoveryDrive()
    if (corsair) {
        console.log(corsair)
        core.cmdShellExec('ROBOCOPY ' + scriptsHome + 'Originator2.0\\Software\\USBRecovery\\Image\\ /E /Z /MT ' + corsair)
    } else {
        window.webContents.send('ALERT_REQUEST', 'No drive labeled "CORSAIR" found.');
    }
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

function restartPCAfterBench() {
    core.restartPC
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
    restartPCAfterBench
}
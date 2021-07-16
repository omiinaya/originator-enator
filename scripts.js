const core = require('./core')

var driveRoot = process.cwd().split('\\')[0];
var scriptsHome = driveRoot + '\\scripts\\';
var originatorHome = scriptsHome + 'Originator2.0\\'


function disableOneDrive() {
    core.pShellExec('DISABLE_ONEDRIVE.ps1')
}

function installSoftware() {
    core.pShellExec('INSTALL_SOFTWARE.ps1')
}

function unpinBloat() {
    core.pShellExec('UNPIN_BLOAT.ps1')
}

function setLSImg() {
    core.pShellExec('SET_LOCK_SCREEN.ps1')
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
    core.pShellExec('INITIALIZE_DRIVES.ps1')
}

function beforeCleanUp() {
    core.pShellExec('BEFORE_CLEANUP.ps1')
}

function setEdgeHome() {
    core.pShellExec('SET_EDGE_TO_ORIGIN.ps1')
}

function installEdge() {
    core.pShellExec('INSTALL_EDGE.ps1')
}

function eraseRemnants() {
    core.pShellExec('ERASE_REMNANTS.ps1')
}

function activateWindows() {
    core.pShellExec('\\ORIGINator2.0\\OA3\\Assemble.ps1')
}

function runBenchmarks() {
    core.pShellExec('\\ORIGINator2.0\\Benchmarks\\Run.ps1')
}

function saveScores() {
    core.pShellExec('\\ORIGINator2.0\\Bin\\Source\\SaveScores.ps1')
}

function runNetwork() {
    var file = scriptsHome + 'Network.cmd'
    core.cmdShellExec(file)
}

function checkDrivers() {
    var file = scriptsHome + 'checkDrivers.cmd'
    core.cmdShellExec(file)
}

function runBenchmarks() {
    core.pShellExec('\\Originator2.0\\Benchmarks\\Run.ps1')
}

function createRecoveryDrive() {
    var corsair = core.getRecoveryDrive()
    if (corsair) {
        console.log(corsair)
        core.cmdShellExec('ROBOCOPY ' + originatorHome + '\\Software\\USBRecovery\\Image\\ /E /Z /MT ' + corsair)
    } else {
        console.log('no drive found.')
    }
}

function runHello() {
    core.pShellExec('HELLO_WORLD.ps1')
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
    createRecoveryDrive
}
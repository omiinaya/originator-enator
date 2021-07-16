const core = require('./core')

var scriptsHome = process.cwd().split('\\')[0] + '\\scripts\\';

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


function runHello() {
    core.pShellExec('HELLO_WORLD.ps1')
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
    checkDrivers
}
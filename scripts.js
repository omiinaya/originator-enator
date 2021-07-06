const { exec } = require('child_process')
const core = require('./core')
const request = require('request')
const { createWriteStream } = require("fs")

let scriptsHome = __dirname + '\\assets\\scripts\\';

function disableOneDrive() {
    core.pShellExec('DISABLE_ONEDRIVE.ps1')
}

function installSoftware() {
    core.pShellExec('INSTALL_SOFTWARE.ps1')
}

function unpinBloat() {
    core.pShellExec('UNPIN_BLOAT.ps1')
}

function runSysprep() {
    var file = scriptsHome + 'sysprep.bat'
    exec('start ' + file).toString().trim()
}

function runAfterSysprep() {
    var file = scriptsHome + 'RunAfterSysprep.cmd'
    exec('start ' + file).toString().trim()
}

function runCleanUp() {
    var file = scriptsHome + 'CleanUp.cmd'
    exec('start ' + file).toString().trim()
}

function runClearLogs() {
    var file = scriptsHome + 'clearlogs.bat'
    exec('start ' + file).toString().trim()
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

function downloadEdge() {
    var url = 'https://go.microsoft.com/fwlink/?linkid=2108834&Channel=Stable&language=en';
    var dir = scriptsHome + '\\Originator2.0\\Software\\Edge\\Edge.msi'
    var stream = request(url).pipe(createWriteStream(dir))
    stream.on('finish', function () { 
        console.log('test')
     });
}

function installEdge() {
    core.pShellExec('INSTALL_EDGE.ps1')
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
    downloadEdge,
    installEdge
}
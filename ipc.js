const ipc = require('electron').ipcMain
const core = require('./core')
const get = require('./get')
const set = require('./set')
const scripts = require('./scripts')

ipc.on('TESTING_1', function () {
    core.print(get.MBInfo())
})

ipc.on('TESTING_2', function () {
    core.print(get.User())
})

ipc.on('TESTING_3', function () {
    core.print(get.PCName())
})

ipc.on('TESTING_4', function () {
    set.PCDescription()
})

ipc.on('TESTING_5', function () {
    set.PCName()
})

ipc.on('TESTING_6', function () {
    set.MonitorTimeout()
})

ipc.on('TESTING_7', function () {
    core.print(get.PowerGUID("High"))
})

ipc.on('TESTING_8', function () {
    core.print(get.PowerGUID("Balanced"))
})

ipc.on('TESTING_9', function () {
    set.PowerCfg('High')
})

ipc.on('TESTING_10', function () {
    set.PowerCfg('Balanced')
})

ipc.on('TESTING_11', function () {
    core.pShellExec('helloworld.ps1')
})

ipc.on('TESTING_12', function () {
    set.StandbyTimeout()
})

ipc.on('TESTING_13', function () {
    core.takeOwnership('C:\\Users\\Nfernal\\Desktop\\test\\')
})

ipc.on('TESTING_14', function () {
    core.print(get.CurrentScheme())
})

ipc.on('TESTING_17', function () {
    set.Image()
})

ipc.on('TESTING_18', function () {
    core.print(get.Drives())
})

ipc.on('TESTING_19', function () {
    core.registerPowerPlan('High')
})

ipc.on('TESTING_20', function () {
    core.registerPowerPlan('Ultimate')
})

ipc.on('TESTING_21', function () {
    scripts.unpinBloat()
})

ipc.on('TESTING_22', function () {
    scripts.initializeDrives()
})

ipc.on('TESTING_23', function () {
    scripts.disableOneDrive()
})

ipc.on('TESTING_24', function () {
    scripts.installSoftware()
})

ipc.on('TESTING_25', function () {
    scripts.beforeCleanUp()
})

ipc.on('TESTING_26', function () {
    scripts.setEdgeHome()
})

ipc.on('TESTING_27', function () {
    scripts.runCleanUp()
})

ipc.on('TESTING_28', function () {
    scripts.runClearLogs()
})

ipc.on('TESTING_29', function () {
    scripts.runSysprep()
})

ipc.on('TESTING_30', function () {
    scripts.runAfterSysprep()
})

ipc.on('TESTING_31', function () {
    scripts.installEdge()
})

ipc.on('BIOSVERSION_REQUEST', function () {
    var data = get.BiosVersion()
    window.webContents.send('BIOSVERSION_RESPONSE', data);
})

ipc.on('MEMORYSPEED_REQUEST', function () {
    var data = get.MemorySpeed()
    window.webContents.send('MEMORYSPEED_RESPONSE', data);
})

ipc.on('MEMORYSIZE_REQUEST', function () {
    var data = get.MemorySize()
    window.webContents.send('MEMORYSIZE_RESPONSE', data);
})
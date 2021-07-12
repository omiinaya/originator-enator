const ipc = require('electron').ipcMain
const core = require('./core')
const get = require('./get')
const set = require('./set')
const scripts = require('./scripts')

ipc.on('TESTING_1', function (evt, data) {
    core.print(get.MBInfo())
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('TESTING_2', function (evt, data) {
    core.print(get.User())
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('TESTING_3', function (evt, data) {
    core.print(get.PCName())
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('TESTING_4', function (evt, data) {
    set.PCDescription()
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('TESTING_5', function (evt, data) {
    set.PCName()
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('TESTING_6', function (evt, data) {
    set.MonitorTimeout()
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('TESTING_7', function (evt, data) {
    core.print(get.PowerGUID("High"))
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('TESTING_8', function (evt, data) {
    core.print(get.PowerGUID("Balanced"))
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('TESTING_9', function (evt, data) {
    set.PowerCfg('High')
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('TESTING_10', function (evt, data) {
    set.PowerCfg('Balanced')
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('TESTING_11', function (evt, data) {
    core.pShellExec('helloworld.ps1')
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('TESTING_12', function (evt, data) {
    set.StandbyTimeout()
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('TESTING_13', function (evt, data) {
    core.takeOwnership('C:\\Users\\Nfernal\\Desktop\\test\\')
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('TESTING_14', function (evt, data) {
    core.print(get.CurrentScheme())
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('TESTING_17', function (evt, data) {
    set.Image()
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('TESTING_18', function (evt, data) {
    core.print(get.Drives())
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('TESTING_19', function (evt, data) {
    core.registerPowerPlan('High')
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('TESTING_20', function (evt, data) {
    core.registerPowerPlan('Ultimate')
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('TESTING_21', function (evt, data) {
    scripts.unpinBloat()
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('TESTING_22', function (evt, data) {
    scripts.initializeDrives()
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('TESTING_23', function (evt, data) {
    scripts.disableOneDrive()
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('TESTING_24', function (evt, data) {
    scripts.installSoftware()
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('TESTING_25', function (evt, data) {
    scripts.beforeCleanUp()
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('TESTING_26', function (evt, data) {
    scripts.setEdgeHome()
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('TESTING_27', function (evt, data) {
    scripts.runCleanUp()
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('TESTING_28', function (evt, data) {
    scripts.runClearLogs()
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('TESTING_29', function (evt, data) {
    scripts.runSysprep()
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('TESTING_30', function (evt, data) {
    scripts.runAfterSysprep()
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('TESTING_31', function (evt, data) {
    scripts.installEdge()
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('TESTING_32', function (evt, data) {
    scripts.runSetLS()
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('TESTING_34', function (evt, data) {
    scripts.runHello()
    //window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('TESTING_35', function (evt, data) {
    core.isDone('powershell.exe')
    //window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('BIOSVERSION_REQUEST', function (evt, data) {
    var data = get.BiosVersion()
    window.webContents.send('BIOSVERSION_RESPONSE', data);
})

ipc.on('MEMORYSPEED_REQUEST', function (evt, data) {
    var data = get.MemorySpeed()
    window.webContents.send('MEMORYSPEED_RESPONSE', data);
})

ipc.on('MEMORYSIZE_REQUEST', function (evt, data) {
    var data = get.MemorySize()
    window.webContents.send('MEMORYSIZE_RESPONSE', data);
})

ipc.on('GPUNAME_REQUEST', function (evt, data) {
    var data = get.GPUName()
    window.webContents.send('GPUNAME_RESPONSE', data);
})

ipc.on('OSNAME_REQUEST', function (evt, data) {
    var data = get.OSName()
    window.webContents.send('OSNAME_RESPONSE', data);
})

ipc.on('CPUNAME_REQUEST', function (evt, data) {
    var data = get.CPUName()
    window.webContents.send('CPUNAME_RESPONSE', data);
})
const ipc = require('electron').ipcMain
const scripts = require('./scripts')

ipc.on('initializeDrives', function (evt, data) {
    scripts.initializeDrives()
    window.webContents.send('CHECK_RESPONSE', data)
})

ipc.on('setPowerCfgHigh', function (evt, data) {
    scripts.setPowerCfgHigh()
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('setMonitorTimeout', function (evt, data) {
    scripts.setMonitorTimeout()
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('setStandbyTimeout', function (evt, data) {
    scripts.setStandbyTimeout()
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('beforeCleanUp', function (evt, data) {
    scripts.beforeCleanUp()
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('runCleanUp', function (evt, data) {
    scripts.runCleanUp()
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('runClearLogs', function (evt, data) {
    scripts.runClearLogs()
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('runSysprep', function (evt, data) {
    scripts.runSysprep()
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('runAfterSysprep', function (evt, data) {
    scripts.runAfterSysprep()
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('setPCDescription', function (evt, data) {
    scripts.setPCDescription()
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('setPCName', function (evt, data) {
    scripts.setPCName()
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('setPowerCfgBalanced', function (evt, data) {
    scripts.setPowerCfgBalanced()
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('unpinBloat', function (evt, data) {
    scripts.unpinBloat()
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('disableOneDrive', function (evt, data) {
    scripts.disableOneDrive()
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('installSoftware', function (evt, data) {
    scripts.installSoftware()
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('pinPrograms', function (evt, data) {
    scripts.pinPrograms()
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('setEdgeHome', function (evt, data) {
    scripts.setEdgeHome()
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('setLSImg', function (evt, data) {
    scripts.setLSImg()
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('eraseRemnants', function (evt, data) {
    scripts.eraseRemnants()
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('activateWindows', function (evt, data) {
    scripts.activateWindows()
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('runNetwork', function (evt, data) {
    scripts.runNetwork()
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('saveScores', function (evt, data) {
    scripts.saveScores()
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('checkDrivers', function (evt, data) {
    scripts.checkDrivers()
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('runBenchmarks', function (evt, data) {
    scripts.runBenchmarks()
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('createRecoveryDrive', function (evt, data) {
    scripts.createRecoveryDrive()
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('formatRecoveryDrive', function (evt, data) {
    scripts.formatRecoveryDrive()
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('installEdge', function (evt, data) {
    scripts.installEdge()
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('BIOSVERSION_REQUEST', function (evt, data) {
    window.webContents.send('BIOSVERSION_RESPONSE', data);
})

ipc.on('MEMORYSPEED_REQUEST', function (evt, data) {
    window.webContents.send('MEMORYSPEED_RESPONSE', data);
})

ipc.on('MEMORYSIZE_REQUEST', function (evt, data) {
    window.webContents.send('MEMORYSIZE_RESPONSE', data);
})

ipc.on('GPUNAME_REQUEST', function (evt, data) {
    window.webContents.send('GPUNAME_RESPONSE', data);
})

ipc.on('OSNAME_REQUEST', function (evt, data) {
    window.webContents.send('OSNAME_RESPONSE', data);
})

ipc.on('CPUNAME_REQUEST', function (evt, data) {
    window.webContents.send('CPUNAME_RESPONSE', data);
})

ipc.on('MBNAME_REQUEST', function (evt, data) {
    window.webContents.send('MBNAME_RESPONSE', data);
})

ipc.on('MBSERIAL_REQUEST', function (evt, data) {
    window.webContents.send('MBSERIAL_RESPONSE', data);
})

ipc.on('MBREVISION_REQUEST', function (evt, data) {
    window.webContents.send('MBREVISION_RESPONSE', data);
})

ipc.on('STEPLIST_REQUEST', function (evt, data) {
    window.webContents.send('STEPLIST_RESPONSE', data);
})

ipc.on('PROGRESS_UPDATE', function (evt, data) {
    scripts.progressUpdate(data)
})

ipc.on('PROGRESS_REQUEST', function () {
    scripts.progressRequest()
})
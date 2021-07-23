const ipc = require('electron').ipcMain
const get = require('./get')
const core = require('./core')
const set = require('./set')
const scripts = require('./scripts')
const fs = require('fs')

var scriptsHome = process.cwd().split('\\')[0] + '\\scripts\\';

ipc.on('initializeDrives', function (evt, data) {
    scripts.initializeDrives()
    window.webContents.send('CHECK_RESPONSE', data)
})

ipc.on('setPowerCfgHigh', function (evt, data) {
    set.PowerCfg('High')
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('setMonitorTimeout', function (evt, data) {
    set.MonitorTimeout()
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('setStandbyTimeout', function (evt, data) {
    set.StandbyTimeout()
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

ipc.on('runCleanlogs', function (evt, data) {
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
    set.PCDescription()
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('setPCName', function (evt, data) {
    set.PCName()
    window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('setPowerCfgBalanced', function (evt, data) {
    set.PowerCfg("Balanced")
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
    //clear file
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

ipc.on('installEdge', function (evt, data) {
    scripts.installEdge()
    window.webContents.send('CHECK_RESPONSE', data);
})

/*
ipc.on('TESTING_7', function (evt, data) {
    core.print(get.PowerGUID("High"))
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


ipc.on('TESTING_34', function (evt, data) {
    scripts.runHello()
    //window.webContents.send('CHECK_RESPONSE', data);
})

ipc.on('TESTING_35', function (evt, data) {
    core.isDone('powershell.exe')
    //window.webContents.send('CHECK_RESPONSE', data);
})
*/

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

ipc.on('STEPLIST_REQUEST', function () {
    var json = fs.readFileSync(scriptsHome + '\\steps.json')
    var data = JSON.parse(json);
    window.webContents.send('STEPLIST_RESPONSE', data);
})

ipc.on('PROGRESS_UPDATE', function (evt, data) {
    var mb = get.SerialNumber()
    var json = fs.readFileSync(scriptsHome + '\\bearings.json')
    var bearings = JSON.parse(json);
    console.log('step: ' + data + " mb: " + mb)
    var isFound = core.findBySerial(bearings, mb)
    if (isFound.length <= 0) {
        console.log('not found')
        bearings.push({
            Serial: mb,
            [data]: true
        })
        fs.writeFileSync(scriptsHome + '\\bearings.json', JSON.stringify(bearings));
    } else {
        console.log('found')
        bearings.forEach(bearing => {
            if (bearing.Serial === mb) {
                Object.assign(bearing, { [data]: true })
                fs.writeFileSync(scriptsHome + '\\bearings.json', JSON.stringify(bearings));
            }
        })
    }
})

ipc.on('PROGRESS_REQUEST', function () {
    var json = fs.readFileSync(scriptsHome + '\\bearings.json')
    var bearings = JSON.parse(json);
    bearings.forEach((bearing) => {
        for (const key in bearing) {
            if (key !== 'Serial') {
                window.webContents.send('CHECK_RESPONSE2', key);
            }
        }
    })
})
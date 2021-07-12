const { execSync } = require('child_process')
const elevated = require('@mh-cbon/aghfabsowecwn').exec;
const get = require('./get')

function PCDescription() {
    elevated('net config server /srvcomment:"%USERNAME%' + 'PC"')
    window.webContents.send('SHELL_END', 'setPCDescription');
}

function PCName() {
    elevated(`WMIC computersystem where caption='%computername%' call rename name='%USERNAME%` + `-PC'`)
    window.webContents.send('SHELL_END', 'setPCName');
}

function MonitorTimeout() {
    execSync('powercfg /change monitor-timeout-ac 0') //0 = never
    execSync('powercfg /change monitor-timeout-dc 0')
    window.webContents.send('SHELL_END', 'MonitorTimeout');
}

function StandbyTimeout() {
    execSync('powercfg -change -standby-timeout-ac 0')
    execSync('powercfg -change -standby-timeout-dc 0')
    window.webContents.send('SHELL_END', 'setStandbyTimeout');
}

function PowerCfg(a) {
    if (!get.PowerGUID(a)) {
        core.registerPowerPlan(a)
        execSync('powercfg /setactive ' + get.PowerGUID(a))
    } else {
        execSync('powercfg /setactive ' + get.PowerGUID(a))
    }
    window.webContents.send('SHELL_END', 'setPowerCfg');
}

module.exports = {
    PCDescription,
    PCName,
    MonitorTimeout,
    StandbyTimeout,
    PowerCfg
}
const { execSync } = require('child_process')
const elevated = require('@mh-cbon/aghfabsowecwn').exec;

function PCDescription() {
    elevated('net config server /srvcomment:"%USERNAME%' + 'PC"')
}

function PCName() {
    elevated(`WMIC computersystem where caption='%computername%' call rename name='%USERNAME%` + `-PC'`)
}

function MonitorTimeout() {
    execSync('powercfg /change monitor-timeout-ac 0') //0 = never
    execSync('powercfg /change monitor-timeout-dc 0')
}

function StandbyTimeout() {
    execSync('powercfg -change -standby-timeout-ac 0')
    execSync('powercfg -change -standby-timeout-dc 0')
}

function PowerCfg(a) {
    if (!get.PowerGUID(a)) {
        core.registerPowerPlan(a)
        execSync('powercfg /setactive ' + get.PowerGUID(a))
    } else {
        execSync('powercfg /setactive ' + get.PowerGUID(a))
    }
}

module.exports = {
    PCDescription,
    PCName,
    MonitorTimeout,
    StandbyTimeout,
    PowerCfg
}
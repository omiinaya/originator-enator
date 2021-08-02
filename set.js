const { execSync } = require('child_process')
const { getPowerGUID } = require('./get')
const sdk = require('cue-sdk')
const core = require('./core')

function setPCDescription() {
    execSync('net config server /srvcomment:"%USERNAME%' + 'PC"')
    window.webContents.send('SHELL_END', 'setPCDescription');
}

function setPCName() {
    execSync(`WMIC computersystem where caption='%computername%' call rename name='%USERNAME%` + `-PC'`)
    window.webContents.send('SHELL_END', 'setPCName');
}

function setMonitorTimeout() {
    execSync('powercfg /change monitor-timeout-ac 0') //0 = never
    execSync('powercfg /change monitor-timeout-dc 0')
    window.webContents.send('SHELL_END', 'setMonitorTimeout');
}

function setStandbyTimeout() {
    execSync('powercfg -change -standby-timeout-ac 0')
    execSync('powercfg -change -standby-timeout-dc 0')
    window.webContents.send('SHELL_END', 'setStandbyTimeout');
}

function setPowerCfg(a) {
    if (!getPowerGUID(a)) {
        core.registerPowerPlan(a)
        execSync('powercfg /setactive ' + getPowerGUID(a))
        window.webContents.send('SHELL_END', 'setPowerCfg');
    } else {
        execSync('powercfg /setactive ' + getPowerGUID(a))
        window.webContents.send('SHELL_END', 'setPowerCfg');
    }
}

function setPowerCfgHigh() {
    setPowerCfg('High')
}

function setPowerCfgBalanced() {
    setPowerCfg('Balanced')
}

function setPulseEffect(allLeds, x) {
    const cnt = allLeds.length
    let val = ~~((1 - (x - 1) * (x - 1)) * 255)
    for (let di = 0; di < cnt; ++di) {
      const device_leds = allLeds[di]
      device_leds.forEach(led => {
        led.r = 0
        led.g = val
        led.b = 0
      })
  
      sdk.CorsairSetLedsColorsBufferByDeviceIndex(di, device_leds)
    }
    sdk.CorsairSetLedsColorsFlushBuffer()
  }

module.exports = {
    setPCDescription,
    setPCName,
    setMonitorTimeout,
    setStandbyTimeout,
    setPowerCfg,
    setPowerCfgHigh,
    setPowerCfgBalanced,
    setPulseEffect
}
const { execSync } = require('child_process')
const delay = ms => new Promise(res => setTimeout(res, ms));
const core = require('./core')
const get = require('./get')

function PCDescription() {
    execSync('net config server /srvcomment:"%USERNAME%' + 'PC"')
}

function PCName() {
    execSync(`WMIC computersystem where caption='%computername%' call rename name='%USERNAME%` + `-PC'`)
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

async function Image() {
    var imgDir1 = 'C:\\ProgramData\\Microsoft\\Windows\\SystemData\\'
    var imgDir2 = imgDir1 + 'S-1-5-18\\ReadOnly\\LockScreen_Z\\'
    var imgDir3 = imgDir2 + get.ImageName(imgDir2)
    var originImage = __dirname + '\\assets\\images\\origin-red.jpg'
    var originCopy = 'origin-red.jpg'
    var imgDir4 = imgDir2 + originCopy
    /*
    takeOwnership(imgDir1)
    print('Successfully took ownership of the first directory.')
    await delay(2000)
    takeOwnership(imgDir2)
    print('Successfully took ownership of the second directory.')
    await delay(2000)
    takeOwnership2(imgDir3)
    print('Successfully took ownership of the actual image.')
    await delay(2000)
    */
    const originalName = get.ImageName(imgDir2)
    core.copyFile(originImage, imgDir2 + 'origin-red.jpg')
    await delay(2000)
    core.renameFile(imgDir3, 'OLD_' + get.ImageName(imgDir2))
    await delay(2000)
    core.print(originalName)
    core.print(imgDir4)
    core.renameFile(imgDir4, originalName)
}

//LockScreen___1920_1080_notdimmed
//C:\ProgramData\Microsoft\Windows\SystemData
//C:\ProgramData\Microsoft\Windows\SystemData\S-1-5-18\ReadOnly\LockScreen_Z
//directory where windows stores lockscreen image
//takeown /f <foldername> /r /d y
//reg=HKEY_CURRENT_USER\SOFTWARE\Microsoft\Windows\CurrentVersion\ContentDeliveryManager\RotatingLockScreenEnalbed

module.exports = {
    PCDescription,
    PCName,
    MonitorTimeout,
    StandbyTimeout,
    PowerCfg,
    Image
}
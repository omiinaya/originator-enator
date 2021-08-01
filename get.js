const { execSync } = require('child_process')
const fs = require('fs')

function isEmpty(a) {
    return a.indexOf(' ') > 0
}

function getMBName() {
    return execSync('wmic baseboard get product').toString().replace("Product", "").trim()
}

function getMBSerial() {
    return execSync('wmic baseboard get serialnumber').toString().replace("SerialNumber", "").trim()
}

function getMBRevision() {
    var x = execSync('wmic baseboard get version').toString().replace("Version", "").trim()
    if (x.includes('REV:')) {
        y = x.replace('REV:', '')
        return y
    } else {
        return x
    }
}

function getUser() {
    return execSync('echo %USERNAME%').toString().trim()
}

function getPCName() {
    return execSync('echo %computername%').toString().trim()
}

function getPowerGUID(a) {
    var raw = execSync('powercfg /list').toString().trim()
    var bloated = raw.split('\n')
    var list = bloated.splice(2, bloated.length - 1)
    var guid;
    list.forEach(line => {
        if (line.includes(a)) {
            guid = line.substring(
                line.lastIndexOf(":") + 1,
                line.lastIndexOf("(")
            ).trim()
        }
    })
    return guid
}

function getImageName(a) {
    var x = execSync('dir ' + a).toString().trim()
    var y = x.split('\n')
    var z = y.filter(name => name.includes('LockScreen') && name.includes('.jpg'))
    var name = z[0].substring(z[0].lastIndexOf(' '), z[0].lastIndexOf('g') + 1).trim()
    return name
}

function getCurrentScheme() {
    var output = execSync('powercfg /getactivescheme').toString().trim()
    var scheme = output.substring(
        output.lastIndexOf(":") + 1,
        output.lastIndexOf("(")
    ).trim()
    return scheme
}

function getBiosVersion() {
    return execSync('wmic bios get smbiosbiosversion').toString().replace('SMBIOSBIOSVersion', '').trim()
}

function getMemorySpeed() {
    var output = execSync('wmic memorychip get Configuredclockspeed').toString().replace('ConfiguredClockSpeed', '').trim()
    var speed = output.split(' ')[0] + " MHz"
    return speed
}

function getMemorySize() {
    var output = execSync('wmic computersystem get TotalPhysicalMemory').toString().replace('TotalPhysicalMemory', '').trim()
    var gb = parseInt(output) / 1000000000
    var size = Math.round(gb)
    return size
}

function getGPUName() {
    var x = execSync('wmic path win32_VideoController get name').toString().replace('Name', '')
    var y = x.split('\n').filter(str => isEmpty(str))
    if (y.length > 1) {
        return y[1].trim()
    } else {
        return x.trim()
    }
}

function getOSName() {
    return execSync('wmic os get Caption').toString().replace('Caption', '').trim()
}

function getCPUName() {
    return execSync('wmic cpu get name').toString().replace('Name', '').trim()
}

function getSerialNumber() {
    return execSync('wmic baseboard get serialnumber').toString().replace('SerialNumber', '').trim()
}

function getDrives() {
    var output = execSync('wmic logicaldisk get name, size, volumename, description').toString().split('\n')
    output.shift()
    var drives = output.filter(lines => isEmpty(lines))
    return drives
}

function getRecoveryDrive() {
    var drives = Drives()
    var drive = drives.filter(drive => drive.includes('CORSAIR'))[0]
    if (drive) {
        var x = drive.split(' ')
        var y = x.filter(el => el !== '')
        var z = y[2]
        return z
    } else {
        return
    }
}

function getSteps() {
    var json = fs.readFileSync(scriptsHome + '\\steps.json')
    return JSON.parse(json)
}

module.exports = {
    getMBName,
    getMBSerial,
    getMBRevision,
    getUser,
    getPCName,
    getPowerGUID,
    getImageName,
    getCurrentScheme,
    getDrives,
    getBiosVersion,
    getMemorySpeed,
    getMemorySize,
    getGPUName,
    getOSName,
    getCPUName,
    getSerialNumber,
    getRecoveryDrive,
    getSteps
}
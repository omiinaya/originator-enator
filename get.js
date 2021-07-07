const { execSync } = require('child_process')

function MBInfo() {
    var x = execSync('wmic baseboard get product').toString().replace("Product", "").trim()
    var y = x.lastIndexOf(' ')
    var z = x.substring(0, y + 1)
    return z
}

function User() {
    return execSync('echo %USERNAME%').toString().trim()
}

function PCName() {
    return execSync('echo %computername%').toString().trim()
}

function PowerGUID(a) {
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

function ImageName(a) {
    var x = execSync('dir ' + a).toString().trim()
    var y = x.split('\n')
    var z = y.filter(name => name.includes('LockScreen') && name.includes('.jpg'))
    var name = z[0].substring(z[0].lastIndexOf(' '), z[0].lastIndexOf('g') + 1).trim()
    return name
}

function CurrentScheme() {
    var output = execSync('powercfg /getactivescheme').toString().trim()
    var scheme = output.substring(
        output.lastIndexOf(":") + 1,
        output.lastIndexOf("(")
    ).trim()
    return scheme
}

function Drives() {
    var output = execSync('wmic logicaldisk get name, size, volumename, description').toString()
    var drives = output.split('\n').splice(1, output.length - 1)
    return drives
}

function BiosVersion() {
    return execSync('wmic bios get smbiosbiosversion').toString().replace('SMBIOSBIOSVersion', '').trim()
}

function MemorySpeed() {
    var output = execSync('wmic memorychip get speed').toString().replace('Speed', '').trim()
    var speed = output.split(' ')[0] + " MHz"
    return speed
}

function MemorySize() {
    //needs rounding
    var output = execSync('wmic computersystem get TotalPhysicalMemory').toString().replace('TotalPhysicalMemory', '').trim()
    var gb = parseInt(output)/1000000000
    var size = Math.round(gb) + " GB"
    return size
}

module.exports = {
    MBInfo,
    User,
    PCName,
    PowerGUID,
    ImageName,
    CurrentScheme,
    Drives,
    BiosVersion,
    MemorySpeed,
    MemorySize
}
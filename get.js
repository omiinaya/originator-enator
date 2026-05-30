const { execSync } = require('child_process');
const fs = require('fs');

let PCProfile = process.env['USERPROFILE'];
let PCRoot = PCProfile.split('\\')[0];
let PCDesktop = process.env['USERPROFILE'] + '\\Desktop\\';
let USBRoot = process.cwd().split('\\')[0];
let ScriptsHome = USBRoot + '\\scripts\\';
let WindowsDir = PCRoot + '\\Windows\\';

function isEmpty(a) {
    return a.indexOf(' ') > 0;
}

function getMBName() {
    return execSync("wmic baseboard get product").toString().replace("Product", "").trim();  // nosem: hardcoded command
}

function getMBSerial() {
    return execSync('wmic baseboard get serialnumber').toString().replace("SerialNumber", "").trim();
}

function getMBRevision() {
    let x = execSync('wmic baseboard get version').toString().replace("Version", "").trim();
    if (x.includes('REV:')) {
        let y = x.replace('REV:', '');
        return y;
    } else {
        return x;
    }
}

function getUser() {
    return execSync('echo %USERNAME%').toString().trim();
}

function getPCName() {
    return execSync('echo %computername%').toString().trim();
}

function getPowerGUID(a) {
    let raw = execSync('powercfg /list').toString().trim();
    let bloated = raw.split('\n');
    let list = bloated.splice(2, bloated.length - 1);
    let guid;
    list.forEach(line => {
        if (line.includes(a)) {
            guid = line.substring(
                line.lastIndexOf(":") + 1,
                line.lastIndexOf("(")
            ).trim();
        }
    });
    return guid;
}

function getImageName(a) {
    let x = execSync('dir ' + a).toString().trim();  // nosem
    let y = x.split('\n');
    let z = y.filter(name => name.includes('LockScreen') && name.includes('.jpg'));
    let name = z[0].substring(z[0].lastIndexOf(' '), z[0].lastIndexOf('g') + 1).trim();
    return name;
}

function getCurrentScheme() {
    let output = execSync('powercfg /getactivescheme').toString().trim();
    let scheme = output.substring(
        output.lastIndexOf(":") + 1,
        output.lastIndexOf("(")
    ).trim();
    return scheme;
}

function getBiosVersion() {
    return execSync('wmic bios get smbiosbiosversion').toString().replace('SMBIOSBIOSVersion', '').trim();
}

function getMemorySpeed() {
    let output = execSync('wmic memorychip get Configuredclockspeed').toString().replace('ConfiguredClockSpeed', '').trim();
    let speed = output.split(' ')[0] + " MHz";
    return speed;
}

function getMemorySize() {
    let output = execSync('wmic computersystem get TotalPhysicalMemory').toString().replace('TotalPhysicalMemory', '').trim();
    let gb = parseInt(output) / 1000000000;
    let size = Math.round(gb);
    return size;
}

function getGPUName() {
    let x = execSync('wmic path win32_VideoController get name').toString().replace('Name', '');
    let y = x.split('\n').filter(str => isEmpty(str));
    if (y.length > 1) {
        return y[1].trim();
    } else {
        return x.trim();
    }
}

function getOSName() {
    return execSync('wmic os get Caption').toString().replace('Caption', '').trim();
}

function getCPUName() {
    return execSync('wmic cpu get name').toString().replace('Name', '').trim();
}

function getSerialNumber() {
    return execSync('wmic baseboard get serialnumber').toString().replace('SerialNumber', '').trim();
}

function getDrives() {
    let output = execSync('wmic logicaldisk get name, size, volumename, description').toString().split('\n');
    output.shift();
    let drives = output.filter(lines => isEmpty(lines));
    return drives;
}

function getRecoveryDrive() {
    let drives = getDrives();
    let drive = drives.filter(drive => drive.includes('CORSAIR'))[0];
    if (drive) {
        let x = drive.split(' ');
        let y = x.filter(el => el !== '');
        let z = y[2];
        return z;
    } else {
        return;
    }
}

function getSteps() {
    let json = fs.readFileSync(ScriptsHome + '\\steps.json');
    return JSON.parse(json);
}

function getSO() {
    let content;

    try {
        content = fs.readFileSync(WindowsDir + 'Import-Workorder.txt', 'utf16le');
    }

    catch (err) {
        window.webContents.send('ALERT_REQUEST', 'No SO found.');
    }

    return content;
}

function getSoftware() {
    if (getSO()) {
        let lines = getSO().split(/\r?\n/);
        let software = lines.filter(line => line.includes('SFT') && !line.includes('WIN10'));
        return software;
    }
}

function getBrowsers() {
    if (getSO()) {
        let lines = getSO().split(/\r?\n/);
        let list = lines.filter(line => line.includes('BWSR'));
        const browsers = [];
        list.forEach((item) => {
            let x = item.replaceAll('BWSR-', '');
            let y = x.split(' ')[0];
            browsers.push(y);
        });
        return browsers;
    }
}

function getItemsToPin() {
    let parsed = [];
    if (getBrowsers()) {
        getBrowsers().forEach((browser) => {
            console.log(browser);
            if (browser === 'CHROME') {
                parsed.push('Google Chrome.lnk');
            }
            if (browser === 'FIREFOX') {
                parsed.push('Firefox.lnk');
            }
            //do the same for other browsers
        });
        return parsed;
    }
}

function getCurrentStage() {
    let data = JSON.parse(fs.readFileSync(ScriptsHome + '\\steps.json'));
    let stages; //find unique stages and add to array
    console.log(data);
    //return bearings.filter(element => element.Serial === serial)
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
    getSteps,
    getItemsToPin,
    getSO,
    getSoftware,
    getBrowsers,
    getCurrentStage
};
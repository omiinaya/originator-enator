const electron = require('electron')
const ipc = electron.ipcRenderer

ipc.on('LOG_REQUEST', (evt, data) => {
    console.log(data)
});

ipc.on('SHELL_END', () => {
    executeQueue()
});

ipc.on('BIOSVERSION_RESPONSE', (evt, data) => {
    console.log(data)
    var el = document.getElementById('BIOSVersion')
    el.innerHTML = "Bios Version: " + data
});

ipc.on('MEMORYSPEED_RESPONSE', (evt, data) => {
    console.log(data)
    var el = document.getElementById('MemorySpeed')
    el.innerHTML = "Memory Speed: " + data
});

ipc.on('MEMORYSIZE_RESPONSE', (evt, data) => {
    console.log(data)
    var el = document.getElementById('MemorySize')
    el.innerHTML = "Memory Size: " + nearestPower(data, 2) + ".0 GB"
});

ipc.on('GPUNAME_RESPONSE', (evt, data) => {
    console.log(data)
    var el = document.getElementById('GPUName')
    el.innerHTML = "GPU: " + data
});

ipc.on('OSNAME_RESPONSE', (evt, data) => {
    console.log(data)
    var el = document.getElementById('OSName')
    el.innerHTML = "OS: " + data
});

ipc.on('CPUNAME_RESPONSE', (evt, data) => {
    console.log(data)
    var el = document.getElementById('CPUName')
    el.innerHTML = "CPU: " + data
});

ipc.on('CHECK_RESPONSE', (evt, data) => {
    console.log(data)
    var el = document.getElementById("check-" + data)
    el.style.display = 'inline';
});
/*
ipc.on('CHECK_RESPONSE', (evt, data) => {
    console.log(data)
    var el = document.getElementById("check-" + data)
    el.checked = true;
});
*/
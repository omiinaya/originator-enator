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

ipc.on('STEPLIST_RESPONSE', (evt, data) => {
    for (var i = 0; i < data.length; i++) {
        var ul = document.getElementById('stage-'+data[i].Stage+'-list')
        var li = document.createElement('li');
        var current = parseInt(i) + 1
        li.innerHTML = `
        <input type="checkbox" id="box-`+ current +`" class="stage-`+ data[i].Stage +`" onchange="toggleStep(`+ current +`)"/>
        <button class="button" id="button-`+ current +`" onClick="start('`+data[i].Function+`', `+ current +`)">`+data[i].Name+`</button>
        <svg class="bi bi-check" id="check-`+ current +`">
          <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
        </svg>
        `;
        ul.appendChild(li)
    }
});

ipc.on('CLEARQUEUE_REQUEST', () => {
    stepList = []
    console.log('Queue has been cleared.')
})

ipc.on('ALERT_REQUEST', (evt, data) => {
    alert(data)
})
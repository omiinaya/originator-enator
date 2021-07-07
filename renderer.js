const electron = require('electron')
const ipc = electron.ipcRenderer

//on DOM load
document.addEventListener("DOMContentLoaded", function (event) {
  biosVersionRequest()
  memorySpeedRequest()
  memorySizeRequest()
});

function test(a) {
  ipc.send("TESTING_" + a)
}

ipc.on('LOG_REQUEST', (evt, data) => {
  console.log(data)
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
  el.innerHTML = "Memory Size: " + data
});

function biosVersionRequest() {
  ipc.send("BIOSVERSION_REQUEST")
}

function memorySpeedRequest() {
  ipc.send("MEMORYSPEED_REQUEST")
}

function memorySizeRequest() {
  ipc.send("MEMORYSIZE_REQUEST")
}
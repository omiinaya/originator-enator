const electron = require('electron')
const ipc = electron.ipcRenderer

//on DOM load
document.addEventListener("DOMContentLoaded", function (event) {
  //
});

function test(a) {
  ipc.send("TESTING_"+a)
}

ipc.on('LOG_REQUEST', (evt, data) => {
  console.log(data)
});
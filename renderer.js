//on DOM load
document.addEventListener("DOMContentLoaded", function (event) {
  biosVersionRequest()
  memorySpeedRequest()
  memorySizeRequest()
  GPUNameRequest()
  OSNameRequest()
  CPUNameRequest()
});

function test(a) {
  ipc.send("TESTING_" + a, a)
}

function biosVersionRequest() {
  ipc.send("BIOSVERSION_REQUEST")
}

function memorySpeedRequest() {
  ipc.send("MEMORYSPEED_REQUEST")
}

function memorySizeRequest() {
  ipc.send("MEMORYSIZE_REQUEST")
}

function GPUNameRequest() {
  ipc.send("GPUNAME_REQUEST")
}

function OSNameRequest() {
  ipc.send("OSNAME_REQUEST")
}

function CPUNameRequest() {
  console.log('test')
  ipc.send("CPUNAME_REQUEST")
}
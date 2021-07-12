var stepList = [];

//on DOM load
document.addEventListener("DOMContentLoaded", function (event) {
  biosVersionRequest()
  memorySpeedRequest()
  memorySizeRequest()
  GPUNameRequest()
  OSNameRequest()
  CPUNameRequest()
  //test2()
});

function test(a) {
  ipc.send("TESTING_" + a, a)
  stepList.shift()
}

function toggleStep(a) {
  var el = document.getElementById('box-' + a)
  if (el.checked === true) {
    stepList.push(a)
    console.log(stepList)
  } else {
    stepList.splice(stepList.indexOf(a, stepList.length - 1), 1)
    console.log(stepList)
  }
}

function stageCheck(a) {
  var stage = document.getElementById(a)
  var el = document.getElementsByClassName(a)
  for (var i = 0; i < el.length; i++) {
    var id = el[i].id.split('-')
    var step = id[id.length - 1]
    if (stage.checked === true) {
      stepList.push(step)
      el[i].checked = true;
      console.log(stepList)
    } else {
      stepList.splice(stepList.indexOf(step, stepList.length - 1), 1)
      el[i].checked = false;
      console.log(stepList)
    }
  }
}

function executeQueue() {
  console.log(stepList)
  if (stepList.length > 0) {
    document.getElementById("box-" + stepList[0]).checked = false;
    test(stepList[0])
  }
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
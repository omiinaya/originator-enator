const fs = require('fs')

var stepList = []

//var PCRoot = process.env['USERPROFILE'].split('\\')[0]
var USBRoot = process.cwd().split('\\')[0]
var scriptsHome = USBRoot + '\\scripts\\';

//on DOM load
document.addEventListener("DOMContentLoaded", function (event) {
  biosVersionRequest()
  memorySpeedRequest()
  memorySizeRequest()
  GPUNameRequest()
  OSNameRequest()
  CPUNameRequest()
  StepListRequest()
  ProgressRequest()
});

function start(func, num) {
  ipc.send(func, num)
  stepList.shift()
}

function toggleStep(a) {
  var el = document.getElementById('box-' + a)
  if (el.checked === true) {
    stepList.push(a)
    console.log(stepList)
  } else {
    stepList.splice(stepList.indexOf(a), 1)
    console.log(stepList)
  }
}

function stageCheck(a) {
  var stage = document.getElementById(a)
  var stageId = a.split('-')[1]
  var step = document.getElementsByClassName("stage-" + stageId)
  for (var i = 0; i < step.length; i++) {
    var id = step[i].id.split('-')
    var num = parseInt(id[id.length - 1])
    if (stage.checked == false) {
      stepList.splice(stepList.indexOf(num, stepList.length - 1), 1)
      let uniqueChars = [...new Set(stepList)];
      stepList = uniqueChars
      step[i].checked = false
    } else {
      stepList.push(num)
      let uniqueChars = [...new Set(stepList)];
      stepList = uniqueChars
      step[i].checked = true
    }
  }
  console.log(stepList)
}

function executeQueue() {
  console.log(stepList)
  if (stepList.length > 0) {
    var el = document.getElementById("button-" + stepList[0]).getAttribute('onclick')
    var func = el.substring(el.indexOf("'") + 1, el.lastIndexOf("'"))
    start(func, stepList[0])
  }
}

function resetAll() {
  resetTitles()
  resetCheckboxes()
  resetCheckmarks()
  resetJSON()
}

function resetCheckboxes() {
  stageList = [
    document.getElementsByClassName('stage-1'),
    document.getElementsByClassName('stage-2'),
    document.getElementsByClassName('stage-3'),
    document.getElementsByClassName('stage-4')
  ]
  stageList.forEach((stage) => {
    for (step of stage) {
      console.log(step)
      step.checked = false
    }
  })
}

function resetCheckmarks() {
  markList = document.getElementsByClassName('bi')
  for (mark of markList) {
    console.log(mark)
    mark.style.display = 'none'
  }
}

function resetTitles() {
  titleList = document.getElementsByClassName('title')
  for (title of titleList) {
    console.log(title)
    title.style.checked = false
  }
}
function resetJSON() {
  //var json = fs.readFileSync(scriptsHome + '\\bearings.json')
  var bearings = []
  //for (var key in bearings) {
  //  delete bearings[key];
 // }
  fs.writeFileSync(scriptsHome + '\\bearings.json', JSON.stringify(bearings));
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
  ipc.send("CPUNAME_REQUEST")
}

function StepListRequest() {
  ipc.send("STEPLIST_REQUEST")
}

function ProgressRequest() {
  ipc.send("PROGRESS_REQUEST")
}
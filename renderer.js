const electron = require('electron')
const ipc = electron.ipcRenderer

var stepList = []

var USBRoot = process.cwd().split('\\')[0]
var scriptsHome = USBRoot + '\\scripts\\';
//var PCProfile = process.env['USERPROFILE']
//var PCRoot = PCProfile.split('\\')[0]
//var PCDesktop = process.env['USERPROFILE'] + '\\Desktop\\'

//on DOM load
document.addEventListener("DOMContentLoaded", function (event) {
  ipc.send("BIOSVERSION_REQUEST", getBiosVersion())
  ipc.send("MEMORYSPEED_REQUEST", getMemorySpeed())
  ipc.send("MEMORYSIZE_REQUEST", getMemorySize())
  ipc.send("GPUNAME_REQUEST", getGPUName())
  ipc.send("OSNAME_REQUEST", getOSName())
  ipc.send("CPUNAME_REQUEST", getCPUName())
  ipc.send("MBNAME_REQUEST", getMBName())
  ipc.send("STEPLIST_REQUEST", getSteps())
  ipc.send("MBSERIAL_REQUEST", getMBSerial())
  ipc.send("MBREVISION_REQUEST", getMBRevision())
  ipc.send("PROGRESS_REQUEST")
});

function start(func, num) {
  ipc.send(func, num)
  stepList.shift()
}

function nearestPower(num, power) {
  //power = 2 for power of 2
  return Math.pow(power, Math.round(Math.log(num) / Math.log(power)))
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
    document.getElementsByClassName('stage-4'),
    document.getElementsByClassName('stage-5')
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
  var bearings = []
  fs.writeFileSync(scriptsHome + '\\bearings.json', JSON.stringify(bearings))
}

function pauseQueue() {
  var el = document.getElementById('pause-button')
  if (el.innerText === 'Pause') {
    el.innerText = 'Resume'
  } else {
    el.innerText = 'Pause'
  }
  ipc.send("PAUSE_REQUEST")
}

function resetPC(a) {
  ipc.send('RESET_REQUEST', a)
  ipc.send("PROGRESS_REQUEST")
}

function test() {
  ipc.send('TEST_FUNCTION')
}
const electron = require('electron')
const ipc = electron.ipcRenderer
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
  MBNameRequest()
  MBSerialRequest()
  MBRevisionRequest()
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
  var bearings = []
  fs.writeFileSync(scriptsHome + '\\bearings.json', JSON.stringify(bearings));
}

function biosVersionRequest() {
  var data = BiosVersion()
  ipc.send("BIOSVERSION_REQUEST", data)
}

function memorySpeedRequest() {
  var data = MemorySpeed()
  ipc.send("MEMORYSPEED_REQUEST", data)
}

function memorySizeRequest() {
  var data = MemorySize()
  ipc.send("MEMORYSIZE_REQUEST", data)
}

function GPUNameRequest() {
  var data = GPUName()
  ipc.send("GPUNAME_REQUEST", data)
}

function OSNameRequest() {
  var data = OSName()
  ipc.send("OSNAME_REQUEST", data)
}

function CPUNameRequest() {
  var data = CPUName()
  ipc.send("CPUNAME_REQUEST", data)
}

function MBNameRequest() {
  var data = MBName()
  console.log(data)
  ipc.send("MBNAME_REQUEST", data)
}

function MBSerialRequest() {
  var data = MBSerial()
  console.log(data)
  ipc.send("MBSERIAL_REQUEST", data)
}

function MBRevisionRequest() {
  var data = MBRevision()
  console.log(data)
  ipc.send("MBREVISION_REQUEST", data)
}

function StepListRequest() {
  var json = fs.readFileSync(scriptsHome + '\\steps.json')
  var data = JSON.parse(json);
  ipc.send("STEPLIST_REQUEST", data)
}

function ProgressRequest() {
  ipc.send("PROGRESS_REQUEST")
}

ipc.on('LOG_REQUEST', (evt, data) => {
  console.log(data)
});

ipc.on('SHELL_END', () => {
  executeQueue()
});

ipc.on('BIOSVERSION_RESPONSE', (evt, data) => {
  var el = document.getElementById('BIOSVersion')
  el.innerHTML = "Bios Version: " + data
});

ipc.on('MEMORYSPEED_RESPONSE', (evt, data) => {
  var el = document.getElementById('MemorySpeed')
  el.innerHTML = "Memory Speed: " + data
});

ipc.on('MEMORYSIZE_RESPONSE', (evt, data) => {
  var el = document.getElementById('MemorySize')
  el.innerHTML = "Memory Size: " + nearestPower(data, 2) + ".0 GB"
});

ipc.on('GPUNAME_RESPONSE', (evt, data) => {
  var el = document.getElementById('GPUName')
  el.innerHTML = "GPU: " + data
});

ipc.on('OSNAME_RESPONSE', (evt, data) => {
  var el = document.getElementById('OSName')
  el.innerHTML = "OS: " + data
});

ipc.on('CPUNAME_RESPONSE', (evt, data) => {
  var el = document.getElementById('CPUName')
  el.innerHTML = "CPU: " + data
});

ipc.on('MBNAME_RESPONSE', (evt, data) => {
  var el = document.getElementById('MBName')
  el.innerHTML = "MB: " + data
});

ipc.on('MBSERIAL_RESPONSE', (evt, data) => {
  var el = document.getElementById('MBSerial')
  el.innerHTML = "Serial: " + data
});

ipc.on('MBREVISION_RESPONSE', (evt, data) => {
  var el = document.getElementById('MBRevision')
  el.innerHTML = "Revision: " + data
});

ipc.on('CHECK_RESPONSE', (evt, data) => {
  var el = document.getElementById("check-" + data)
  el.style.display = 'inline'
  ipc.send('PROGRESS_UPDATE', data)
});

ipc.on('CHECK_RESPONSE2', (evt, data) => {
  var el = document.getElementById("check-" + data)
  el.style.display = 'inline'
});

ipc.on('STEPLIST_RESPONSE', (evt, data) => {
  for (var i = 0; i < data.length; i++) {
    var ul = document.getElementById('stage-' + data[i].Stage + '-list')
    var li = document.createElement('li');
    var current = parseInt(i) + 1
    li.innerHTML = `
      <input type="checkbox" id="box-`+ current + `" class="stage-` + data[i].Stage + `" onchange="toggleStep(` + current + `)"/>
      <button class="button" id="button-`+ current + `" onClick="start('` + data[i].Function + `', ` + current + `)">` + data[i].Name + `</button>
      <svg class="bi bi-check" id="check-`+ current + `">
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
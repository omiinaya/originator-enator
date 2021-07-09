require('electron-reload')(__dirname, { ignored: /db|[\/\\]\./, argv: [] });
require('@electron/remote/main').initialize()
const { app, BrowserWindow } = require('electron');
const path = require('path');

global.window;

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    show: false,
    width: 800,
    height: 750,
    minWidth: 800,
    minHeight: 750,
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.loadFile(path.join(__dirname, './assets/html/index.html'));

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  global.window = mainWindow
};

app.on('ready', () => {
  createWindow()
  isDone()
});

//
var scripts = []
function populateScripts() {
  //fill scritps array with script names to later be executed
}

//continue executing function until condition is true
var x = 0
//pass name of script as a and keep track of completion with boolean
function isDone(a) {
  console.log(x)
  //b being an element of the array holding the script names
  timer = setTimeout(function() {
    isDone(/*b*/)
  }, 1000)
  if (x > 5) {
    clearTimeout(timer)
    //a = true //a being a boolean predefined as false that determines whether a script is done executing or not
    console.log('done')
    //remove script name from scripts array then execute next
  } else {
    x++;
  }
}

//check if script is still running by checking if powershell is running

require('./ipcM.js')
require('./get.js')
require('./set.js')
require('./core.js')
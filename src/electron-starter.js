const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindows () {
  // Get width and height of primary screen
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize
  // Create the browser window.
  mainWindow = new BrowserWindow({ width, height })

  // and load the index.html of the app.
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, '/../build/index.html'),
      protocol: 'file:',
      slashes: true
    })
  mainWindow.loadURL(startUrl)

  // Open the DevTools as displays object is dumped into console.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  // Create secondary window
  createSecondaryWindow()
}

function createSecondaryWindow () {
  var electronScreen = electron.screen
  // Get all connected monitors
  var displays = electronScreen.getAllDisplays()
  var externalDisplay = null
  for (var i in displays) {
    if (displays[i].bounds.x != 0 || displays[i].bounds.y != 0) {
      // Return first external display found
      externalDisplay = displays[i]
      break
    }
  }

  // Create secondary window on external screen if found
  if (externalDisplay) {
    console.log(
      'An external screen has been found, loading URL on this screen...'
    )
    mainWindow = new BrowserWindow({
      x: externalDisplay.bounds.x + 50,
      y: externalDisplay.bounds.y + 50,
      webPreferences: {
        nodeIntegration: false,
        plugins: true
      }
    })
  } else {
    console.log(
      'No external screen has been found, loading URL on the primary screen instead...'
    )
    // If no external screen has been found, load it on the primary
    // Get width and height of primary screen
    const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize
    // Create the browser window.
    mainWindow = new BrowserWindow({
      width,
      height,
      webPreferences: {
        nodeIntegration: false,
        plugins: true
      }
    })
  }

  // Load an example site
  mainWindow.loadURL('https://google.com')
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindows)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindows()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron');
const path = require('path');
const osControl = require('./lib/os-control');
const log = require('./lib/log').getLogger('main');

function createWindow () {
  log.info('createWindow.0');
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile('index.html');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
  log.info('createWindow.1')

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    log.info('whenReady.activate.0');
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0){
      log.info('getAllWindows.1.0');
      createWindow();
      log.info('getAllWindows.1.1');
    }

    log.info('whenReady.activate.1');
  })
}).then(osControl.fn).then(()=>{
  log.info('whenReady.then.1');
  osControl.run();
  log.info('whenReady.then.2');
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

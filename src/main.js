// Modules to control application life and create native browser window
const { app, BrowserWindow } = require("electron");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let launchInfoString;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      webSecurity: false,
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile(`${app.getAppPath()}/src/index.html`);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on("closed", function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  mainWindow.webContents.on('did-finish-load', () => {
    if (launchInfoString) {
      mainWindow.webContents.send('launch_info', launchInfoString);
    }
  });

  app.registerForRemoteNotifications();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", (event, launch_info) => {
  if (launch_info != null && Object.keys(launch_info).length > 0) {
    launchInfoString = JSON.stringify(launch_info);
  }
  createWindow();
});

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function() {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});

app.on('will-finish-launching', () => {
  if (process.platform === 'darwin') {
    const apnsHelper = require("bindings")('apns_helper.node');
    if (apnsHelper) {
      const initResult = apnsHelper.initNotificationCenterDelegate();
      console.log('apns_helper: ' + initResult);
    }
  }
});

app.on("registered-for-remote-notifications", (event, token) => {
  console.log("Received APNS token: ", token);
});

app.on(
  "failed-to-register-for-remote-notifications",
  (event, error) => {
    console.log("Failed to register for APNS: ", error);
  }
);

app.on("received-remote-notification", (event, user_info) => {
  console.log("Received remote notification: ", user_info);
});

// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const {ipcRenderer} = require('electron');

ipcRenderer.on('launch_info', (event, launch_info_string) => {
  const notificationInfo = document.getElementById('notification-info');
  const header = document.createElement("h2");
  header.innerHTML = "Launched app from notification:";
  notificationInfo.appendChild(header)
  const launchInfoString = document.createTextNode(launch_info_string);
  notificationInfo.appendChild(launchInfoString);
});

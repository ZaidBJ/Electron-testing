console.log("preload");

const ipc = require('electron').ipcRenderer;

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.remote.BrowserWindow;
window.addEventListener("keypress",function(){
ipc.send('chng_tab');
});


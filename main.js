const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
//const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const ipc = electron.ipcMain;
const dialog = require('electron').dialog;

let win;

function createWindow() {

  win = new BrowserWindow({ width: 800, height: 600 })

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  let contents = win.webContents
  console.log(contents)

  win.on('closed', () => {
    win = null
  });
  win.webContents.openDevTools();
}

var opn_1;
var opn_2;

 global.share = {obj:''};

var count=0;

ipc.on('async-message', function (event, arg) {
  console.log("rev");
  console.log(global.share.obj)
if(count==0)
  opn_1=arg;
else
  opn_2=arg;
count++;
})


ipc.on('chng_tab',function(event,arg)
{ console.log("fggf");
  global.share.obj.loadURL('https://github.com');
})
app.on('ready', createWindow);


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

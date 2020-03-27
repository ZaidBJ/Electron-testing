const ipc = require('electron').ipcRenderer;
const asyncBtn = document.getElementById('asyncBtn');
const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.remote.BrowserWindow;
var count=0;
asyncBtn.addEventListener('click', function(){
  
  let win = new BrowserWindow({  webPreferences: {
  	 nodeIntegration: false,
       preload: `${__dirname}/preload.js`,
    },
 width: 800, height: 600 })
if(count==0)
 { 
 	win.loadURL('https://github.com');

    win.on('closed', () => {
    win = null
  });
     electron.remote.getGlobal('share').obj=win;
     count++;
}
else{
 win.loadURL('https://google.com');

    win.on('closed', () => {
    win = null
  });
count++;
 win.webContents.openDevTools();

 electron.remote.getGlobal('share').obj=win;
;    ipc.send('async-message',{win:win});
    console.log('async msg 2')
  }
    
});

ipc.on('async-message-reply', function (event, arg) {
  const message = `Message reply: ${arg}`
  console.log(message);
});




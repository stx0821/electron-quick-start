const electron = require('electron')
var globalShortcut = electron.globalShortcut;
var dialog = electron.dialog;
var ipcMain = electron.ipcMain;

// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({icon:`icon.ico`,title:`我的Node.js APP`,
	  resizable:false,thickFrame:false})

var i = 1;
//   setInterval(()=>{mainWindow.setPosition(i++,i++)},10)
  globalShortcut.register('alt+x', function() {
	
  })
	ipcMain.on('asynchronous-message', function(event, arg) {
		console.log(arg);  // prints "ping"
		event.sender.send('asynchronous-reply', 'pong');
		mainWindow.setThumbarButtons([{icon:`icon.ico`,click:()=>{}},{icon:`icon.ico`,click:()=>{}},{icon:`icon.ico`,click:()=>{}}])
  		mainWindow.setProgressBar(0.5,{mode:`error`});
	});

	ipcMain.on('synchronous-message', function(event, arg) {
		console.log(arg);  // prints "ping"
		event.returnValue = 'pong';
	});

	var appIcon=new electron.Tray(`icon.ico`);
	var contextMenu = electron.Menu.buildFromTemplate([
		{ label: 'Item1', type: 'radio' },
		{ label: 'Item2', type: 'radio' },
		{ label: 'Item3', type: 'radio', checked: true },
		{ label: 'Item4', type: 'radio' }
	]);
	appIcon.setToolTip('This is my application.');
	appIcon.setContextMenu(contextMenu);


  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })


//   dialog.showErrorBox(`续命啦~`, `马上续命`)
	/*console.log(dialog.showMessageBox({ 
			type:`warning`,
			title:`续命啦`,
			message:`马上续命`,
			// detail:`马上续命`,
			buttons:[`献上1s`,`献上2s`],
			icon:`x.jpg`,
			properties: [ 'openFile', 'openDirectory', 'multiSelections' ]
		},()=>{
			dialog.showMessageBox({ 
				type:`info`,
				title:`续命成功`,
				message:`已成功转移1s`,
			})
	}));*/
}



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

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
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

/*
var app = require('app');  // 控制应用生命周期的模块。
var BrowserWindow = require('browser-window');  // 创建原生浏览器窗口的模块

// 保持一个对于 window 对象的全局引用，不然，当 JavaScript 被 GC，
// window 会被自动地关闭
var mainWindow = null;

// 当所有窗口被关闭了，退出。
app.on('window-all-closed', function() {
  // 在 OS X 上，通常用户在明确地按下 Cmd + Q 之前
  // 应用会保持活动状态
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// 当 Electron 完成了初始化并且准备创建浏览器窗口的时候
// 这个方法就被调用
app.on('ready', function() {
  // 创建浏览器窗口。
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // 加载应用的 index.html
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // 打开开发工具
  mainWindow.openDevTools();

  // 当 window 被关闭，这个事件会被发出
  mainWindow.on('closed', function() {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，
    // 通常会把多个 window 对象存放在一个数组里面，
    // 但这次不是。
    mainWindow = null;
  });
});*/
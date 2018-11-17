import { app, BrowserWindow, screen, ipcMain, BrowserWindowConstructorOptions } from 'electron';
import * as path from 'path';
import * as url from 'url';

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

let win;
let args = process.argv.slice(1);
let serve = args.some(val => val === '--serve');

function createWindow() {

  let size = screen.getPrimaryDisplay().workAreaSize;

  let browserOptions: BrowserWindowConstructorOptions = {
    x: size.width * 0.1,
    y: size.height * 0.05,
    width: size.width * 0.8,
    height: size.height * 0.9,
  }

  win = new BrowserWindow(browserOptions);
  win.maximize();

  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

}

try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

}
catch (e) {
  throw e;
}

ipcMain.on('full-screen', (event, arg) => {
  win.setFullScreen(arg)
})

ipcMain.on('progress', (event, args) => {
  win.setProgressBar(args)
})
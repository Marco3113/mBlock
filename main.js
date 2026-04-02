const { app, BrowserWindow, session } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    title: 'mBlock IDE',
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true,
    },
  });

  // Allow USB serial port access (needed for mBlock device connections)
  session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
    const allowed = ['serial', 'usb', 'hid', 'media', 'notifications', 'clipboard-read'];
    callback(allowed.includes(permission));
  });

  mainWindow.loadURL('https://ide.mblock.cc/');

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    mainWindow.loadURL(url);
    return { action: 'deny' };
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Remove default menu bar
  mainWindow.setMenuBarVisibility(false);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) createWindow();
});

const { app, BrowserWindow, Menu, screen } = require('electron');
const path = require('path');

let mainWindow;

// Prevent multiple instances
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    // Focus existing window if another instance is launched
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  function createWindow() {
    Menu.setApplicationMenu(null);

    const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize;

    mainWindow = new BrowserWindow({
      width: 950,
      height: 1200,
      title: "hunter2",
      x: Math.floor(screenWidth / 2 - 950 / 2 - 150),
      y: Math.floor((screenHeight - 1200) / 2),
      icon: path.join(__dirname, process.platform === 'win32' ? 'icon.ico' : 'icon.png'),
      frame: true,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      }
    });

    mainWindow.setMenuBarVisibility(false);
    mainWindow.loadFile('index.html');
  }

  app.whenReady().then(createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });
}

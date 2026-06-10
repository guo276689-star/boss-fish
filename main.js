const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');

const GAME_SIZE = [420, 260];
const MINI_SIZE = [36, 36];
let mainWindow = null;
let miniWindow = null;
let miniBiting = false;
let dragState = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 420,
    height: 260,
    useContentSize: true,
    resizable: false,
    autoHideMenuBar: true,
    title: '老板鱼来了',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.setMenuBarVisibility(false);
  setWindowContentSize(mainWindow, ...GAME_SIZE);
  mainWindow.loadFile('index.html');

  mainWindow.on('closed', () => {
    mainWindow = null;

    if (miniWindow && !miniWindow.isDestroyed()) {
      miniWindow.close();
    }
  });
}

function createMiniWindow() {
  miniWindow = new BrowserWindow({
    width: 36,
    height: 36,
    useContentSize: true,
    resizable: false,
    frame: false,
    transparent: true,
    show: false,
    hasShadow: false,
    skipTaskbar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  setWindowContentSize(miniWindow, ...MINI_SIZE);
  miniWindow.loadFile('mini.html');

  miniWindow.on('closed', () => {
    miniWindow = null;
  });
}

function setWindowContentSize(window, width, height) {
  window.setContentSize(width, height);

  const [contentWidth, contentHeight] = window.getContentSize();

  if (contentWidth !== width || contentHeight !== height) {
    window.setContentSize(
      width - (contentWidth - width),
      height - (contentHeight - height)
    );
  }
}

app.whenReady().then(() => {
  ipcMain.handle('window:enter-mini', (event, position) => {
    if (!isMainWindowSender(event) || !miniWindow) {
      return;
    }

    if (isValidPosition(position)) {
      miniWindow.setPosition(position.x, position.y);
    } else {
      const bounds = mainWindow.getBounds();
      miniWindow.setPosition(
        bounds.x + bounds.width - MINI_SIZE[0],
        bounds.y
      );
    }

    miniWindow.show();
    miniWindow.webContents.send('mini:set-biting', miniBiting);
    mainWindow.hide();
  });

  ipcMain.handle('window:restore-game', (event) => {
    if (!isMiniWindowSender(event) || !mainWindow || !miniWindow) {
      return;
    }

    setWindowContentSize(mainWindow, ...GAME_SIZE);
    dragState = null;
    miniWindow.hide();
    mainWindow.show();
    mainWindow.focus();
    mainWindow.webContents.send('window:mode-changed', 'game');
  });

  ipcMain.on('mini:set-biting', (event, isBiting) => {
    if (!isMainWindowSender(event)) {
      return;
    }

    miniBiting = Boolean(isBiting);

    if (miniWindow) {
      miniWindow.webContents.send('mini:set-biting', miniBiting);
    }
  });

  ipcMain.handle('mini:start-drag', (event, pointer) => {
    if (!isMiniWindowSender(event) || !isValidPointer(pointer)) {
      return;
    }

    const [windowX, windowY] = miniWindow.getPosition();
    dragState = {
      pointerX: pointer.x,
      pointerY: pointer.y,
      windowX,
      windowY
    };
  });

  ipcMain.on('mini:move-drag', (event, pointer) => {
    if (
      !isMiniWindowSender(event) ||
      !dragState ||
      !isValidPointer(pointer)
    ) {
      return;
    }

    miniWindow.setPosition(
      Math.round(dragState.windowX + pointer.x - dragState.pointerX),
      Math.round(dragState.windowY + pointer.y - dragState.pointerY)
    );
  });

  ipcMain.handle('mini:end-drag', (event) => {
    if (!isMiniWindowSender(event) || !dragState) {
      return;
    }

    dragState = null;
    const [x, y] = miniWindow.getPosition();
    mainWindow.webContents.send('mini:position-changed', { x, y });
  });

  createWindow();
  createMiniWindow();
});

function isMainWindowSender(event) {
  return mainWindow && event.sender === mainWindow.webContents;
}

function isMiniWindowSender(event) {
  return miniWindow && event.sender === miniWindow.webContents;
}

function isValidPosition(position) {
  return position &&
    Number.isInteger(position.x) &&
    Number.isInteger(position.y);
}

function isValidPointer(pointer) {
  return pointer &&
    Number.isFinite(pointer.x) &&
    Number.isFinite(pointer.y);
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
    createMiniWindow();
  }
});

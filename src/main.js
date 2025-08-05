const { app, BrowserWindow, globalShortcut } = require('electron')
const path = require('node:path')

const { CleanKey } = require('./shortcut-script.js');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 570,
    height: 270,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
    
  })

  win.setMenu(null);

  win.loadFile('src/index.html')
}


app.whenReady().then(() => {
  createWindow()

  const processKey = new CleanKey();

  globalShortcut.register('CommandOrControl+Alt+X', async () => {
    try {
      await processKey.execCleanKey();
      console.log('Chave processada com sucesso!');
    } catch (error) {
      console.error('Erro ao processar chave:', error);
    }
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

 
app.on('window-all-closed', () => {
  globalShortcut.unregisterAll();
  if (process.platform !== 'darwin') app.quit()
})
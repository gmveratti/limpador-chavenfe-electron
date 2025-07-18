const { app, BrowserWindow } = require('electron')
const path = require('node:path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 500,
    height: 200,
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

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});


 
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
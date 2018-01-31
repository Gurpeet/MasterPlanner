'use strict';

const { app, BrowserWindow } = require('electron');
let win;
//require('electron-reload')(__dirname);


function createWindow() {
    // Create browser window
    win = new BrowserWindow({
        backgroundColor: '#ffffff'
        //icon: `file://${__dirname}/dist/assets/logo.png`
    });

    win.loadURL(`file://${__dirname}/index.html`);

    // To hide menu toolbar
    win.setMenu(null);
    
    // To open dev tools
    //win.webContents.openDevTools();

    win.maximize();

    // Event when window is closed
    win.on('closed', function () {
        win = null;
    });
};

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    // macOS does not quit app on close, so  explicitly do that
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    // macOS specific close process
    if (win === null) {
        createWindow();
    }
});

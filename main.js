const {app, BrowserWindow, ipcMain, dialog, nativeTheme} = require('electron');
const path = require("path");
const fs = require("fs");

const createWindow = () => {
    const browserWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            worldSafeExecuteJavaScript: true,
            preload: path.join(__dirname, './preload.js')
        }
    });

    nativeTheme.themeSource = "dark";

    browserWindow.loadFile('./dist/index.html');

    ipcMain.on('create', (event) => {
        dialog.showSaveDialog(browserWindow, {title: 'Create new file' })
            .then(result => {
                fs.writeFileSync(result.filePath, '{}');
                const data = fs.readFileSync(result.filePath).toString();
                event.sender.send('open', {
                    filePath: result.filePath,
                    data: data
                });

                console.log('File created!', result.filePath);
            });
    });

    ipcMain.on('save', (event, msg, data) => {
        if (data && data.path && data.json) {
            fs.writeFileSync(data.path, data.json);
            console.log('File saved!', data.path);
        }
    });

    ipcMain.on('open', (event) => {
        dialog.showOpenDialog({title: 'Open note file'})
            .then(result => {
                const data = fs.readFileSync(result.filePaths[0]).toString();
                event.sender.send('open', {
                    filePath: result.filePaths[0],
                    data: data
                });

                console.log('File opened!', result.filePaths[0]);
            })
    });

    ipcMain.on('load', (event, msg, filePath) => {
        const data = fs.readFileSync(filePath).toString();
        event.sender.send('open', {
            filePath: filePath,
            data: data
        });

        console.log('File loaded', filePath);
    });
};

app.whenReady()
    .then(() => createWindow());

const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electron", {
    send(channel, message, data) {
        ipcRenderer.send(channel, message, data);
    },
    listen(channel, listener) {
        ipcRenderer.on(channel, listener);
    }
});

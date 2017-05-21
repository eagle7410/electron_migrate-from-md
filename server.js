const electron = require('electron');
const ipcRenderer = electron.ipcMain;
const dialog = electron.dialog;
const send = require('./libs/send');
const migration = require('./libs/migration');
const listen = (action, handel) => {
	ipcRenderer.on(action, (event, arg) => {
		handel(event.sender,  action + '-response', arg);
	});
};

module.exports = {
	run : (mainWindow) => {
		listen('POST-migration', (res, action, data) => {
			migration.create(data, (e, attach) => e ? send.err(res, action, e) : send.ok(res, action, {noUsed : attach}));
		});
		listen('GET-path', (res, action) => {
			let folder = dialog.showOpenDialog(mainWindow, {properties: ['openFile', 'openDirectory']});
			send.ok(res, action, {folder : !Array.isArray(folder) ? '' : folder.shift()});
		});
	}
};

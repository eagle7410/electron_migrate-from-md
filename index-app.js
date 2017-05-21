/**
 * Created by igor on 21.05.17.
 */

const electron      = require('electron');
const app           = electron.app;
const BrowserWindow = electron.BrowserWindow;
const server        = require('./server');

app.on('ready', () => {
	let mainWindow = new BrowserWindow({
		width: 800,
		height : 800,
		icon: __dirname + '/database-migration.ico'
	});

	server.run(mainWindow);

	mainWindow.maximize();
	mainWindow.loadURL('file://' + __dirname + '/views/index.html');
	mainWindow.on('closed', () => {
		mainWindow = null;
	});

});

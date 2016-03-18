'use strict';

const electron = require('electron');
//modulo para controlar el tiempo de vida de la app
const app = electron.app;
//modulo para crear una ventana nativa del navegador
const BrowserWindow = electron.BrowserWindow;

//mantener una referencia global del objeto windows 
//para evitar que sea cerrado automatcamente cuando 
//javascript realice su garbage collected
let mainWindow;

function createWindow() {
    //crear la ventana del navegador
    mainWindow = new BrowserWindow({width: 800, height: 600});
    
    //se hace la carga del archivo index.html de la app
    mainWindow.loadURL('file://'+__dirname + '/index.html');
    
    //abre las herramientas de desarrollo
    mainWindow.webContents.openDevTools();
    
    //evento para cuando la ventana es cerrada
    mainWindow.on('closed',function(){
        //des referenciamos el objeto windows, se almacena usualmente
        //en un array si la app soporta multi ventanas
        //en este caso corresponde eliminar el elemento
        mainWindow = null;
    });    
}

//este metodo es llamado cuando electron ha terminado la
//inicializacion y esta listo para crear la ventana del navegador
app.on('ready',createWindow);

//salir cuando la ventana es cerrada
app.on('window-all-closed',function(){
    //En osx es comun que las aplicaciones se queden activas
    //mientras el usuario no cierre la app con cmd + que
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    //En osx es comun re crear la ventana in la app cuando se 
    //da clic en el icono del dock y no hay otras ventanas abiertas
    if (mainWindow === null) {
        createWindow();
    }
});
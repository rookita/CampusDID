// 引入nodejs模块
const { app, BrowserWindow } = require('electron');
const path = require('path');

// 创建窗口函数
function createWindow() {
    win = new BrowserWindow({ // 设置窗口option
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false, // 注意如果没有该选项，在renderer.js 中 require is not defined
            enableRemoteModule: true
        }
    });
    win.loadFile('index.html');// 窗口加载本地html
    win.webContents.openDevTools();   // 打开开发者工具调试选项
}

// 启动flask server，通过python-shell 调用python脚本（开发调试阶段）
function startServer_PY() {
    var { PythonShell } = require('python-shell');

    PythonShell.run('CampusID/back_end/app/app.py', options, function (err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution
        console.log('response: ', results);
    });
}

// 启动flask server，通过子进程执行已经将python项目打包好的exe文件（打包阶段）
function startServer_EXE() {
    let script = path.join(__dirname, '../', 'back_end', 'app.exe')
    pyProc = require('child_process').execFile(script)
    if (pyProc != null) {
        console.log('flask server start success')
    }
}

// 停止flask server 函数
function stopServer() {
    pyProc.kill()
    console.log('kill flask server  success')
    pyProc = null
}

// 初始化函数
function initApp() {
    startServer_EXE();
    createWindow();
}


// electron ready 事件触发
app.on('ready', initApp);

// electron 窗口关闭事件触发
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
    stopServer()
});

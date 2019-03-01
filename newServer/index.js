var express = require('express');
var app = express();

// 静态文件
app.use(express.static('public'));

// 网页端输出
// app.get('/', (req, res) => res.send('Hello World'));
app.get('/index.html', (req, res) => {
    res.sendFile(__dirname + '/' + 'index.html');
});

app.get('/process_get', (req, res) => {
    // 输出JSON格式
    let response = {
        'Name': req.query.name,
        'Age': req.query.age
    };
    console.log(response);
    res.send(JSON.stringify(response));
});

// server端输出，监听的是后端端口
let server = app.listen(8088, '127.0.0.1', () => {
    let host = server.address().address;
    let port = server.address().port;
    console.log(server.address());
    console.log('应用实例的访问地址为 http://%s:%s', host, port);
});
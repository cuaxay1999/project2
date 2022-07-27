const app = require('./app');
const http = require('http');
const PORT = 9000;

var server = http.createServer(app);

app.post('/chien', function (req, res) {
    console.log(req.body);
});
server.listen(PORT, () => {
    console.log('Server Running');
});

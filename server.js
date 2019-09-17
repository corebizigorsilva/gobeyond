var connect = require('connect'),
    serveStatic = require('serve-static');

var app = connect();

app.use(serveStatic("./"));

app.listen(5000, () => {
    console.log("Servidor rodando em localhost:5000");
});
const Scriptloader = require('./scriptloader2');
const express = require('express');
const path = require("path");

const favicon = require('serve-favicon')

let scriptloader = new Scriptloader();

let api = express();

const port = 5500;

api.set('base', __dirname);

api.use(favicon(path.join(__dirname, 'assets', 'favicon.png')));

api.get('/',(req, res) => {
    
    res.sendFile(__dirname + "/index.html");

});

api.get('/s/:scriptname' , (req, res) => {
    req.params.scriptname += ".sh";
    res.send(scriptloader.findScript(req.params.scriptname));

    res.status(200);
    res.end();
});

api.get("*", (req, res) => {
    res.sendFile(__dirname + req.path);
})

api.listen(port, () => {
    console.log(`> Listening at ${ port }`);
})
const Scriptloader = require('./scriptloader2');
const express = require('express');
const path = require("path");

const favicon = require('serve-favicon')

let scriptloader = new Scriptloader();

let api = express();

const port = 5500;

api.use(favicon(path.join(__dirname, 'assets', 'favicon.png')));

api.get('/',(req, res) => {
    
    res.sendFile(__dirname + "/index.html");

});

api.get('/s/:scriptname' , (req, res) => {

    let query = req.params.scriptname += ".sh";
    myResponse = scriptloader.getScript(query).toString();
        
    res.send(myResponse);

    res.status(200);
    res.end();
});


api.get('/list', (req, res) => {
    res.send(scriptloader.showMap());
    res.status(200);
    res.end();
})


api.get('/scriptstash.sh', (req, res) => {
    res.sendFile(__dirname + "/scriptstash.sh");
})

api.get("*", (req, res) => {
    res.sendFile(__dirname + req.path);
})

api.listen(port, () => {
    console.log(`> Listening at ${ port }`);
})
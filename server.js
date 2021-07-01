const Scriptloader = require('./scriptloader2');
const express = require('express');
const path = require("path");

const favicon = require('serve-favicon')

let scriptloader = new Scriptloader();

let api = express();

const PORT = process.env.PORT || 3000;

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


api.get('/scriptsta.sh', (req, res) => {
    res.sendFile(__dirname + "/scriptsta.sh");
})

api.get("*", (req, res) => {
    res.sendFile(__dirname + req.path);
})

api.listen(PORT, () => {
    console.log(`> Listening at ${ PORT }`);
})
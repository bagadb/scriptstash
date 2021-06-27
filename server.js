const Scriptloader = require('./scriptloader');
const express = require('express');

let scriptloader = new Scriptloader();
scriptloader.loadScripts();

let api = express();

const port = 5500;

api.get('/:scriptname' , (req, res) => {
    console.log(req.params.scriptname);
    res.send(scriptloader.findScript("intro.sh").toString())
    res.status(200);
    res.end();
})

api.listen(port, () => {
    console.log(`> Listening at ${ port }`);
})
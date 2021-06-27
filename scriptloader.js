/*
* TODO Path error handling, error handling 
* TODO Folder Sorting
* 
*
*
*/

const fs = require('fs');
const { isUndefined } = require('util');

class Scriptloader {
    
    constructor(scriptsPath = "./scripts/"){

        this.scriptsPath = scriptsPath;
        
        let stashOfScripts = fs.readdirSync(this.scriptsPath) ;

        this.scriptMap = new Map();
        
        for(let script of stashOfScripts){
            this.scriptMap.set(script,"not loaded");
        }
        
    }

    loadScripts(){
        for( let currentKey of this.scriptMap.keys() ){
            let fileData = fs.readFileSync(`${ this.scriptsPath }${ currentKey }`);
            this.scriptMap.set(currentKey, fileData)
        }
    }

    findScript(name){
        return this.scriptMap.get(name);
    }

    listScripts(){
        for(let currentKey of this.scriptMap.keys() ){
            process.stdout.write(`${currentKey}\t`)
        }
        console.log();
    }
    
}

module.exports = Scriptloader;
const fs = require('fs');
const path = require('path');

class Scriptloader {
    
    #scriptsMap = new Map();
    #scriptNames = new Array();
    
    constructor(scriptsPath = __dirname + "/scripts"){
        
        this.scriptsPath = scriptsPath;
        
        this.#scriptsMap = this.#scanScripts(this.scriptsPath);
    }

    #scanScripts(folderPath){
        let newMap = new Map(); 

        let currentFolder = folderPath;

        let currentFolderData = fs.readdirSync(currentFolder);

        for(let item of currentFolderData){
            if(item.substring(item.length - 3) === '.sh'){
                newMap.set(item,"empty");
                this.#scriptNames.push(item);
            }else{
                newMap.set(item,this.#scanScripts(currentFolder + '/' + item));
            }
        }

        return newMap;
    }

    findScript(name){

    }

    showMap(){
        console.log(this.#scriptsMap);
    }

    listScripts(){
        console.log(this.#scriptNames);
    }
    
}

a = new Scriptloader();
a.listScripts();

module.exports = Scriptloader;
const e = require('express');
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
                let currentPath = (currentFolder + "/" + item);
                newMap.set(item,fs.readFileSync(currentPath));
                this.#scriptNames.push(item);
            }else{
                newMap.set(item,this.#scanScripts(currentFolder + '/' + item));
            }
        }

        return newMap;
    }

    #searchScript(name, currentMap){
        let result = false;

        for(let [key,value] of currentMap.entries()){
            if (value instanceof Map){
                result = this.#searchScript(name,value);
            }
            if( key == name ){
                result = currentMap.get(key);
                return result;
            }
        }

        return result;

    };

    getScript(name){

        let myScriptData = this.#searchScript(name,this.#scriptsMap);
        return myScriptData;
    }


    #mapStringer(myMap){
        let stringMap = "";

        for( let key of myMap.keys()){
            
            if(myMap.get(key) instanceof Map){
                stringMap += ( " {" + key + ":-" + this.#mapStringer(myMap.get(key)) + "}");
            }else{
                stringMap += ( " [" + key + "] ");
            }
        }
        return stringMap;
    }

    showMap(){
        let stringedMap = "";
        
        stringedMap = this.#mapStringer(this.#scriptsMap);
        
        return stringedMap;
    }

}

module.exports = Scriptloader;
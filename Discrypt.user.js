// ==UserScript==
// @name         Discrypt
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Message encyption for Discord in browser.
// @author       Deniied
// @match        https://*.discord.com/*
// @require      https://cdn.jsdelivr.net/npm/simple-crypto-js@2.5.0/dist/SimpleCrypto.min.js
// @grant        none
// ==/UserScript==

'use strict';

var messageContentClass = "messageContent-2t3eCI"
var editorClass = "editor-H2NA06"

var simpleCrypto = new SimpleCrypto("key")

window.newMSG = function() {
    var msg = prompt("New message");
    var enc = simpleCrypto.encrypt(msg);
    alert("DISCRYPT_ENC " + enc)
}

document.addEventListener('keydown', (event) => {
    var name = event.key;
    if(name == "ArrowDown"){
        window.newMSG()
    }
}, false);

function startLoop(){
    if(document.getElementsByClassName(messageContentClass).length !== 0){
        Array.from(document.getElementsByClassName(messageContentClass)).forEach(function(e){
            if(e.textContent.startsWith("DISCRYPT_ENC ")) {
                try {
                    console.log(e.textContent)
                    var encdata = e.textContent.substring(13);
                    e.textContent = simpleCrypto.decrypt(encdata);
                } catch(err) {
                    e.textContent = "DISCRYPT ERROR: COULD NOT DECRYPT MESSAGE"
                }
            }
        })
    }
    setTimeout(startLoop, 250);
}
startLoop()

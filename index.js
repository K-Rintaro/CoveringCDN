const ping = require('ping');
const chalk = require('chalk');
const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;


fs.readFile('./test_public/index.html', 'utf-8', (err, data) => {
    if(data) {
        const dom = new JSDOM(data)
        console.log(dom.window.document.querySelector("script").src);
    }else{
        console.log(err);
    }
});
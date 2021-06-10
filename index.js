const ping = require('ping');
const chalk = require('chalk');
const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const url = require('url');

const kakunouko = []
const test = ["www.rintaro.tech/aaa"]

fs.readFile('./test_public/index.html', 'utf-8', (err, data) => {
    if (data){
        console.log(chalk.greenBright("[CDNCovering] Running now..."))
        const dom = new JSDOM(data)
        const jsnum = dom.window.document.querySelectorAll('script').length
        if (!jsnum == 0){
            for(let i=0; jsnum > i; i++){
                var maindish = dom.window.document.querySelectorAll('script')[i].src;
                if (maindish.startsWith('htt')){
                    var kakunou = url.parse(maindish).hostname;
                    kakunouko.push(kakunou)
                    console.log(chalk.green("CDN found: ") + chalk.white(maindish))
                    kakunouko.forEach(function(host){
                        ping.sys.probe(host, function(isAlive){
                            var msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
                            if (msg.includes("alive")){
                                console.log(chalk.blueBright("✔︎" + msg))
                            }else if(msg.includes("dead")){
                                console.log(chalk.redBright("△" + msg))
                            }
                        });
                    });
                }
            }
        }
    }
    if (err){
        console.log(chalk.red("[CDNCovering] Error: ") + chalk.yellow(err))
    }
})



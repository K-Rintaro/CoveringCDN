const ping = require('ping');
const chalk = require('chalk');
const client = require('cheerio-httpcli');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const url = require('url');

const CDNCheckingRemote = function(uri, command){
    const kakunouko = []
    const kakunoukosub = []
    
    client.fetch(uri, function(err, $, res, body){
        if (body.includes('<!DOCTYPE html>')){
            console.log(chalk.greenBright("[CDNCovering] Running now..."))
            const dom = new JSDOM(body)
            const jsnum = dom.window.document.querySelectorAll('script').length
            const linknum = dom.window.document.querySelectorAll('link').length
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
                                    exec(command, (err, stdout, stderr) => {
                                        if (err) {
                                          console.log(`stderr: ${stderr}`)
                                          return
                                        }
                                        console.log(`stdout: ${stdout}`)
                                      }
                                    )
                                }
                            });
                        });
                    }
                }
            }
            if (!linknum == 0){
                for(let i=0; linknum > i; i++){
                    var subdish = dom.window.document.querySelectorAll('link')[i].href;
                    if (subdish.startsWith('htt')){
                        var linkkakunou = url.parse(subdish).hostname;
                        kakunoukosub.push(linkkakunou)
                        console.log(chalk.green("CDN found: ") + chalk.white(subdish))
                        kakunoukosub.forEach(function(host){
                            ping.sys.probe(host, function(isAlive){
                                var msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
                                if (msg.includes("alive")){
                                    console.log(chalk.blueBright("✔︎" + msg))
                                }else if(msg.includes("dead")){
                                    console.log(chalk.redBright("△" + msg))
                                    exec(command, (err, stdout, stderr) => {
                                        if (err) {
                                          console.log(`stderr: ${stderr}`)
                                          return
                                        }
                                        console.log(`stdout: ${stdout}`)
                                      }
                                    )
                                }
                            });
                        });
                    }
                }
            }
        }else{
            console.log(chalk.red("[CDNCovering] Error: ") + chalk.yellow(err))
        }
    })
    
}
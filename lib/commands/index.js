var program = require('commander');
var run = require('./run');

program
  .version('0.0.1')
  .usage('<command> [options]')
  
program
  .command('run')
  .option('-s, --serverDir <serverDir>', 'steedos server dir')
  .option('-p, --port <port>', 'server port, default to 3000')
  .option('-r, --rootUrl <rootUrl>', 'server root url, default to http://127.0.0.1:3000')
  .option('-m, --mongoUrl <mongoUrl>', 'mongodb url, default to mongodb://127.0.0.1/steedos')
  // .option('-d, --debug', 'enable debug')
  // .option('-p, --profile', 'enable profile')
  .action(function (cmd) {
    run.exec(cmd)
  })

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}

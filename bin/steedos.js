console.log('Welcome to Steedos CLI');

const program = require('commander');

 program
  .command('create <type> [name] [otherParams...]')
  .alias('c')
  .description('Generates new code')
  .action(function (type, name, otherParams) {
    console.log('type', type);
    console.log('name', name);
    console.log('other', otherParams);
    // 在这里执行具体的操作
  });

program.parse(process.argv);

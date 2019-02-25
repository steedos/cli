__steedos_bootstrap__ =  {}

const {Command, flags} = require('@oclif/command')

class RunCommand extends Command {
  async run() {
    const {flags} = this.parse(RunCommand)
    const serverDir = flags.serverDir 
    process.env.PORT = flags.port || 3000
    process.env.ROOT_URL = flags.rootUrl || "http://127.0.0.1:" + process.env.PORT
    process.env.MONGO_URL = flags.mongoUrl || "mongodb://127.0.0.1/steedos"
    
    __steedos_bootstrap__ = {
        projectDir: process.cwd(),
        serverDir: flags.serverDir,
        rootUrl: process.env.ROOT_URL,
        mongoUrl: process.env.MONGO_URL,
        verbose: false
    }
  
    //process.chdir(__steedos_bootstrap__.serverDir);

    require('../server/boot.js');
  }
}

RunCommand.description = `Run steedos server
...
Extra documentation goes here
`

RunCommand.flags = {
    serverDir: flags.string({char: 's', description: 'Steedos Server Dir', required: true}),
    port: flags.string({char: 'p', description: 'Steedos Server PORT', env: "PORT"}),
    rootUrl: flags.string({char: 'r', description: 'Steedos Server rootUrl', env: "ROOT_URL"}),
    mongoUrl: flags.string({char: 'm', description: 'MongoDB Server UrL', env: "MONGO_URL"}),
}

module.exports = RunCommand

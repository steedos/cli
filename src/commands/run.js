const {Command, flags} = require('@oclif/command')
path = require("path")
fs = require("fs")

__steedos_bootstrap__ =  {}

class RunCommand extends Command {
  async run() {
    const {flags} = this.parse(RunCommand)
    const serverDir = path.join(flags.serverDir, "bundle", "programs", "server");
    if (!fs.existsSync(serverDir))
    {
      this.log(`serverDir not found: ${serverDir}`);
      return
    }  
    this.log(`Starting steedos server: ${serverDir}`);

    process.env.PORT = flags.port || "3000"
    process.env.ROOT_URL = flags.rootUrl || "http://127.0.0.1:" + process.env.PORT
    process.env.MONGO_URL = flags.mongoUrl || "mongodb://127.0.0.1/steedos"
    
    __steedos_bootstrap__ = {
        projectDir: process.cwd(),
        serverDir: serverDir,
        rootUrl: process.env.ROOT_URL,
        mongoUrl: process.env.MONGO_URL,
        verbose: flags.verbose
    }
  
    //process.chdir(__steedos_bootstrap__.serverDir);

    require('@steedos/meteor-bundle-runner');
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
    verbose: flags.boolean({char: 'v', description: 'Show loggins', hidden: true})
}

module.exports = RunCommand

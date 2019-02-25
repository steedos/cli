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

    process.env.PORT = flags.port
    process.env.ROOT_URL = flags.rootUrl
    process.env.MONGO_URL = flags.mongoUrl

    this.log(`Starting steedos server: ${process.env.ROOT_URL}`);
    
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
    port: flags.string({char: 'p', description: 'Steedos Server PORT', default:"3000", env: "PORT"}),
    rootUrl: flags.string({char: 'r', description: 'Steedos Server rootUrl', default:"http://127.0.0.1:3000", env: "ROOT_URL"}),
    mongoUrl: flags.string({char: 'm', description: 'MongoDB Server UrL', default:"mongodb://127.0.0.1/steedos", env: "MONGO_URL"}),
    verbose: flags.boolean({char: 'v', description: 'Show loggins', hidden: true})
}

module.exports = RunCommand

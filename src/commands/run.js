const {Command, flags} = require('@oclif/command')
path = require("path")
fs = require("fs")
os = require("os")
const yaml = require('js-yaml');

settingsFileName = 'settings.yml'

__steedos_bootstrap__ =  {}

class RunCommand extends Command {
  async run() {
    const {flags} = this.parse(RunCommand)
    var serverDir = flags.serverDir;       
    var projectDir = process.cwd();   
    process.env.NODE_OPTIONS="";
    var npmRoot = require('child_process').execSync('npm root -g').toString().trim()
    if (!serverDir) {
      try {
        serverDir = path.join(npmRoot, "steedos-server", "bundle", "programs", "server")
      } catch (err) {
        console.error(`Install steedos server globally first with: npm install -g steedos-server`)
        process.exit(1)
      }
    } else {
      serverDir = path.join(serverDir, "bundle", "programs", "server");
    }
    if (!fs.existsSync(serverDir))
    {
      this.log(`serverDir not found: ${serverDir}`);
      return;
    }  
    
    var rootUrl = flags.rootUrl;      
    if (!rootUrl) 
      rootUrl = "http://" + os.hostname() + ":" + flags.port

    var settingsPath = path.join(projectDir, settingsFileName)
    var settings;
    if(fs.existsSync(settingsPath)){
      try {
        settings = yaml.safeLoad(fs.readFileSync(settingsPath, 'utf8'));
      } catch (error) {
        this.log(`Invalid settings.yml`, error)
      }
    }
    if(settings){
      process.env.METEOR_SETTINGS = JSON.stringify(settings)
    }

    process.env.PORT = flags.port
    process.env.ROOT_URL = rootUrl
    process.env.MONGO_URL = flags.mongoUrl

    this.log("*******************************************************************");
    this.log("*")
    this.log(`*  Starting Steedos Server ...`);
    this.log("*")
    this.log(`*  PORT: ${process.env.PORT}`);
    this.log(`*  ROOT_URL: ${process.env.ROOT_URL}`);
    this.log(`*  MONGO_URL: ${process.env.MONGO_URL}`);
    this.log(`*  PROJECT_DIR: ${projectDir}`);
    this.log(`*  SERVER_DIR: ${serverDir}`);
    this.log("*")
    this.log("*******************************************************************");
    
    
    __steedos_bootstrap__ = {
        projectDir: projectDir,
        serverDir: serverDir,
        globalNpmDir: path.join(npmRoot, "steedos-server", "node_modules"), 
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
    serverDir: flags.string({char: 's', description: 'Steedos Server Dir'}),
    port: flags.string({char: 'p', description: 'Steedos Server PORT', default:"3000", env: "PORT"}),
    rootUrl: flags.string({char: 'r', description: 'Steedos Server rootUrl', env: "ROOT_URL"}),
    mongoUrl: flags.string({char: 'm', description: 'MongoDB Server UrL', default:"mongodb://127.0.0.1/steedos", env: "MONGO_URL"}),
    verbose: flags.boolean({char: 'v', description: 'Show loggins', hidden: true})
}

module.exports = RunCommand

__steedos_bootstrap__ =  {}
exports.exec = function (cmd) {
    if (!cmd.serverDir) {
        process.stderr.write(
          'Command run need option: serverDir.\n');
        process.exit(1);
    }
    if (!process.env.PORT) {
        if (cmd.port) {
            process.env.PORT = cmd.port
        } else {
            process.env.PORT = "3000"
        }
    }

    if (!process.env.ROOT_URL) {
        if (cmd.rootUrl) {
            process.env.ROOT_URL = cmd.rootUrl
        } else {
            process.env.ROOT_URL = "http://127.0.0.1:" + process.env.PORT
        }
    }

    if (!process.env.MONGO_URL) {
        if (cmd.mongoUrl) {
            process.env.MONGO_URL = cmd.mongoUrl
        } else {
            process.env.MONGO_URL = "mongodb://127.0.0.1/steedos"
        }
    }

    __steedos_bootstrap__ = {
        projectDir: process.cwd(),
        serverDir: cmd.serverDir,
        rootUrl: cmd.rootUrl,
        mongoUrl: cmd.mongoUrl,
        verbose: cmd.verbose
    }
  
    //process.chdir(__steedos_bootstrap__.serverDir);

    require('../server/boot.js');
};
  
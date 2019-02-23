# Steedos
Develop and run your enterprise apps in miniutes

### install from npm
```
npm i steedos -g
```

### install from src
```
git clone https://github/steedos/cli
cd cli
npm i -g
```

### build creator bundle
```
meteor build --directory C:\srv\creator-build
```

### run bundle
```
steedos run -s C:\srv\creator-build\bundle\programs\server
```

### develop app
- create project folder
- write main.js
- steedos run will load main.js on bootstrap
```
steedos run -s C:\srv\creator-build\bundle\programs\server
```

### help
```
steedos run --help
```

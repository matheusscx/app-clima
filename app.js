
const argv = require('./yargs/yargsCfg').argv;
const clima = require('./clima/clima');

clima.getInformacion(argv.direccion)
    .then(resp => console.log(resp))
    .catch(err => console.log(err));
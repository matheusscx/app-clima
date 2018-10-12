const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        demand: true,
        desc: 'Dirección de la ciudad a consultar'
    }
}).help()
    .argv;

    module.exports = {
        argv
    }
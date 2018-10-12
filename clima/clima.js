
const axios = require('axios');


const getCoordenadas = async direccion => {
    let direccionURL = encodeURI(direccion);
    let resp = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${direccionURL}&key=AIzaSyA-HXVa2jtkGfKtIJwisxgC46RaWqC1xuI`);
    if (resp.data.status === 'ZERO_RESULTS') {
        throw new Error(`No se es encontraron resultados para la direccion: ${direccionURL}`);
    } else {
        let { lat, lng } = resp.data.results[0].geometry.location;
        let formattedAddress = resp.data.results[0].formatted_address;
        return {
            Direccion: formattedAddress,
            lat,
            lng
        };
    };
}

const getClima = async (lat, lng) => {
    let clima = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=454578b84558cd27686ca310a62a9ecb`);
    let formattedClima = clima.data.main;
    return formattedClima;
}

const getInformacion = async (address) => {

    try {
        let { Direccion, lat, lng } = await getCoordenadas(address);
        let { temp, humidity } = await getClima(lat, lng);
        return {
            Direccion,
            Latitud: lat,
            Longitud: lng,
            Temperatura: temp,
            Humedad: humidity
        };
    } catch (error) {
        return `No se puedo obtener el clima de la direccion ${address}`;
    }


}

module.exports = {
    getInformacion
};
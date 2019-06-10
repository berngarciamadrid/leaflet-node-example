const leaflet = L.map('map-template').setView(
    [42.2766826,
    -8.7392906],
    18
);

const socket = io();

const url1 = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png'; 
const url2 = 'http://a.tile.stamen.com/toner/{z}/{x}/{y}.png';
const url3 = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png';


L.tileLayer(url1).addTo(leaflet);
// L.tileLayer('http://a.tile.stamen.com/toner/{z}/{x}/{y}.png').addTo(leaflet);
// L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png').addTo(leaflet);

leaflet.locate({enableHighAccuracy: true});


leaflet.on('locationfound', evento => {
    console.log(evento);
    const coords = [evento.latlng.lat, evento.latlng.lng];
    const marcador = L.marker(coords);
    marcador.bindPopup('Estás aquí');
    leaflet.addLayer(marcador);
    socket.emit('coordenadasUsuario', evento.latlng );
})

socket.on('newUserCoordinates', (coords) => {
    console.log('New User is connected');
    const otro = L.marker([coords.lat + 1, coords.lng + 1]);
    otro.bindPopup('Y tu estás aquí');
    leaflet.addLayer(otro);

})

// const marker = L.marker([42.2766826,-8.7392906]);
// marker.bindPopup('Bienvenido');
// leaflet.addLayer(marker);
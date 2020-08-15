const issMap = L.map('issmap').setView([0, 0], 2);
// Adding custom icon
const issIcon = L.icon({
    iconUrl: 'ISS.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16]
});
//Adding marker to the map
const marker = L.marker([0, 0], {icon: issIcon}).addTo(issMap);
const attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors';
const tileUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(issMap);

const api_url = "https://api.wheretheiss.at/v1/satellites/25544";
let first = true;

async function getIss(){
    const response = await fetch(api_url);
    const data = await response.json()
    const { latitude, longitude } = data;
    document.getElementById('lat').textContent = latitude;
    document.getElementById('lon').textContent = longitude;
    if(first){
        issMap.setView([latitude, longitude], 3);
        first = false;
    }
    issMap.panTo([latitude, longitude]);
    marker.setLatLng([latitude, longitude]);
}
getIss();

setInterval(getIss, 5000);

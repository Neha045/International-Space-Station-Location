particlesJS("particles-js", {
    "particles": {
      "number": {
        "value": 200, // Number of particles
        "density": {
          "enable": true,
          "value_area": 789 // Density is bigger with smaller number
        }
      },
      "color": { // Color only for nodes
        "value": ["#fff", "#600277" ]  // You can add one more more colors
      },
      "opacity": { // Node opacity
        "value": 0.5, 
        "random": false,
        "anim": { // Node opacity animation, with speed and min opacity
          "enable": false,
          "speed": 1,
          "opacity_min": 0,
          "sync": false
        }
      },
      "size": { // Node size
        "value": 1,
        "random": true,
        "anim": { // Node size animation, with speed and min size
          "enable": true,
          "speed": 8,
          "size_min": 0,
          "sync": false
        }
      },
      "line_linked": { // Lines between nodes
        "enable": true,
        "distance": 100, // Distance between node when line will be added
        "color": "#8940ff",
        "opacity": 0.3,
        "width": 2
      },
      "move": { // Node movementm with speed, directions..
        "enable": true,
        "speed": 1.8,
        "direction": "none",
        "random": true,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      },
    }
  });
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
    document.getElementById('lat').textContent = latitude.toFixed(2);
    document.getElementById('lon').textContent = longitude.toFixed(2);
    if(first){
        issMap.setView([latitude, longitude], 3);
        first = false;
    }
    issMap.panTo([latitude, longitude]);
    marker.setLatLng([latitude, longitude]);
}
getIss();

setInterval(getIss, 5000);

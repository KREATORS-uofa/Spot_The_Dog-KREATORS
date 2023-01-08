// geocoding needed to get coordinates from user put address
// run $ npm install --save react-native-geocoding
import Geocoder from "react-native-geocoding";

// TO GET COORD FROM ADDRESS
Geocoder.init("AIzaSyA1NA3CVqNv99ndEVYiLLhG7eBDzGaNKKs"); // initialize with Taekwan's Google Map API key
Geocoder.from("University of Alberta") // put address as string here
  .then((json) => {
    var location = json.results[0].geometry.location;
  })
  .catch((error) => console.warn(error));
//

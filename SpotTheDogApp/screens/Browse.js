import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Octicons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { authentication } from "../firebase/firebase-config";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// documentation for map: https://github.com/react-native-maps/react-native-maps
import MapView from "react-native-maps"; // run in terminal <npx expo install react-native-maps>
import { Marker, Callout } from "react-native-maps";
// also run <npm install react-native-maps --save>
// also run <react-native link>
import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../firebase/firebase-config";
import Geocoder from "react-native-geocoding";

const Browse = () => {
  const [coord, setCoord] = useState([]);
  const [dogs, setDogs] = useState([]);

  const GetData = async () => {
    const dogCol = collection(db, "reporter");
    const dogSnapshot = await getDocs(dogCol);
    const dogList = dogSnapshot.docs.map((doc) => doc.data());
    setDogs(dogList);
  };

  const [map, setMap] = useState(false);
  useEffect(() => {
    GetData();
    dogs.map((item) => {
      Geocoder.init("AIzaSyA1NA3CVqNv99ndEVYiLLhG7eBDzGaNKKs"); // initialize with Taekwan's Google Map API key
      Geocoder.from(item.address) // put address as string here
        .then((json) => {
          var location = json.results[0].geometry.location;
          setCoord((prev) => [
            ...prev,
            { latitude: location.lat, longitude: location.lng },
          ]);
        })
        .catch((error) => console.warn(error));
    });
  }, [map]);

  const listButtonPressed = () => {
    setMap((current) => !current);
  };

  // list component----------------------------------------------

  const BrowseList = () => {
    // const renderItem = ({ item }) => <Item address={item.address} />;
    const displayAddress = ({ item }) => (
      <View style={styles.item}>
        <View style={styles.imageContainer}>
          <Image style={styles.dogImage} source={{ uri: item.image }} />
        </View>
        <Text style={styles.name}>{item.address}</Text>
      </View>
    );

    const headerComponent = () => {
      return <Text style={styles.listHeadline}>Reported Dogs</Text>;
    };

    const itemSeparator = () => {
      return <View style={styles.separator} />;
    };

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          ListHeaderComponent={headerComponent}
          ListHeaderComponentStyle={styles.listHeader}
          style={styles.content}
          data={dogs}
          renderItem={displayAddress}
          ItemSeparatorComponent={itemSeparator}
          ListEmptyComponent={<Text>Come back later for more dogs!</Text>}
        />
        <View
          style={{
            position: "absolute",
            zIndex: 1,
            right: 20,
            bottom: 20,
          }}
        >
          <TouchableOpacity onPress={listButtonPressed}>
            <View style={styles.buttonMap}>
              <MaterialCommunityIcons
                name="map-marker-radius"
                size={38}
                color="#F7F7F7"
              />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };

  // list component end ----------------------------------------

  // map component----------------------------------------------

  const BrowseMap = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={styles.text}>Browsing!</Text>

        {/* map component */}
        <MapView
          // initial view
          initialRegion={{
            latitude: 53.5461,
            longitude: -113.4937,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          // to render map on screen
          style={styles.map}
        >
          {/* to place markers on map */}
          {dogs.map((item, index) => (
            <Marker
              key={index}
              title={item.address}
              coordinate={coord[index]}
              description={item.comment}
            >
              {/* call out once press marker */}
              <Callout tooltip>
                <View>
                  <View style={styles.bubble}>
                    <Text style={styles.name}>{item.title}</Text>
                    <Text>{item.description}</Text>
                    <Image
                      style={styles.image}
                      source={{
                        uri: item.image,
                      }}
                    />
                  </View>
                  <View style={styles.arrowBorder} />
                  <View style={styles.arrow} />
                </View>
              </Callout>
            </Marker>
          ))}
          {/* button to switch between map and list */}
        </MapView>
        <TouchableOpacity
          style={{
            position: "absolute",
            zIndex: 1,
            right: 20,
            bottom: 20,
          }}
          onPress={listButtonPressed}
        >
          <View style={styles.buttonList}>
            <Ionicons name="reorder-three-outline" size={50} color="#F7F7F7" />
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  // map component end -------------------------------------------
  return map ? <BrowseMap /> : <BrowseList />;
};

const styles = StyleSheet.create({
  arrow: {
    // change style!
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#fff",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -32,
  },
  arrowBorder: {
    // change style!
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#007a87",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -0.5,
  },

  bubble: {
    // change style!
    flexDirection: "column",
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 6,
    borderColor: "#ccc",
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
  content: {
    flex: 1,
    backgroundColor: "yellow",
  },
  image: {
    flex: 1,
    opacity: 0.4,
    alignContent: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  text: {
    alignSelf: "center",
    color: "red",
    fontSize: 30,
  },
  // map component
  map: {
    width: "100%",
    height: "100%",
  },
  // map component
  name: {
    // change style!
    fontSize: 12,
    marginBottom: 5,
  },
  image: {
    // change style!
    width: 120,
    height: 80,
  },
  buttonList: {
    backgroundColor: "#6D9886",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 40,
    padding: 5,
  },
  buttonMap: {
    backgroundColor: "#6D9886",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 40,
    padding: 12,
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#CCC",
  },
  listHeader: {
    height: 75,
    alignItems: "center",
    justifyContent: "center",
  },
  listHeadline: {
    color: "#333",
    fontSize: 21,
    fontWeight: "bold",
  },
  item: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
  },
  imageContainer: {
    backgroundColor: "#D9D9D9",
    borderRadius: 100,
    height: 150,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  dogImage: {
    height: 150,
    width: 150,
  },
});

export default Browse;

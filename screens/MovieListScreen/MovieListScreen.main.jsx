import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View, FlatList, TouchableOpacity } from "react-native";
import { SearchBar } from "react-native-elements";
import { MovieCell } from "./components/MovieCell";
import { styles } from "./MovieListScreen.styles";
import { getAllActors } from "../../constants/Constants"; // Import the function here
const ALL_ACTORS = getAllActors(); // Get the list of all actors

// We can use JSON files by simply requiring them.
const TABLE_DATA = require("../../assets/movies.json");

// Input: navigation & route params, which we receive through React Navigation
// Output: a screen containing the list of movies
export default function MovieListScreen({ navigation, route }) {
  const [search, setSearch] = useState("");
  const [actors, setActors] = useState([]);

  // TODO: Fill out the methods below.
  const selectedMovie = (movieItem) => {
    navigation.navigate("MovieDetail", { movieItem });
  };
  

  const selectedFilterButton = () => {
    navigation.navigate("MovieFilter", { selectedActors: actors });
  };
  

  useEffect(() => {
    // TODO: Add a "Filter" button to the right bar button.
    // It should lead to the MovieFilterScreen, and pass the "actors" state
    // variable as a parameter.
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={selectedFilterButton}>
          {/* <Text style={{ marginRight: 10 }}>Filter</Text> */}
        </TouchableOpacity>
      ),
    });
  }, [actors]);

  useEffect(() => {
    /* TODO: Receive the updated list of actors from the filter screen here.
        You can use the 'route.params' object to get the data passed back from
        the MovieFilterScreen.
    */
    if (route.params && route.params.selectedActors) {
      setActors(route.params.selectedActors);
    }
  }, [route.params]);

  // Renders a row of the FlatList.
  const renderItem = ({ item }) => {
    // Define search criteria
    const meetsSearchCriteria =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.genres.some((genre) =>
        genre.toLowerCase().includes(search.toLowerCase())
      );

    // Define filter criteria
    const meetsActorsCriteria =
      actors.length === 0 || actors.some((actor) => item.actors.includes(actor));

    // Check if the movie meets both search and filter criteria
    if (meetsSearchCriteria && meetsActorsCriteria) {
      return (
        <MovieCell
          movieItem={item}
          onPress={() => selectedMovie(item)}
        />
      );
    } else {
      // If the item doesn't meet search/filter criteria, return null.
      return null;
    }
  };

  // Our final view consists of a search bar and flat list, wrapped in
  // a SafeAreaView and ScrollView to support iOS and enable scrolling.
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* TODO: Add a SearchBar */}
        <SearchBar
          placeholder="Search movies..."
          onChangeText={(text) => setSearch(text)}
          value={search}
        />
        
        {/* TODO: Add a FlatList */}
        <FlatList
          data={TABLE_DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

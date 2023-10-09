import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  View,
  TouchableOpacity,
  Text,
} from "react-native";

import { styles } from "./MovieFilterScreen.styles";

// Input: navigation & route params, which we receive through React Navigation
// Output: a Movie Filter Screen component, which displays a list of actors to filter on.
export default function MovieFilterScreen({ navigation, route }) {
  const [actors, setActors] = useState([]);
  const ALL_ACTORS = getAllActors(); // Assuming this function returns all available actors.

  useEffect(() => {
    // TODO: Receive actors passed by MovieListScreen here, and update
    // our local state using setActors.
    if (route.params && route.params.selectedActors) {
      setActors(route.params.selectedActors);
    }
  }, [route.params]);

  // Handle the "Done" button press to navigate back to MovieListScreen with selected actors.
  const handleDonePress = () => {
    // TODO: Pass back the selected actors to MovieListScreen using navigation params.
    navigation.navigate("MovieList", { selectedActors: actors });
  };

  // When we tap an actor cell, toggle the selection.
  const didTapActorCell = (actor) => {
    let newActors = [...actors];
    if (actors.includes(actor)) {
      newActors = newActors.filter((selectedActor) => selectedActor !== actor);
    } else {
      newActors.push(actor);
    }
    setActors(newActors);
  };

  const renderSelectItem = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => didTapActorCell(item)}
      >
        <View style={styles.filtercell}>
          <Text style={{ fontFamily: "Avenir", fontSize: 15 }}>
            {actors.includes(item) ? "✓ " + item : " " + item}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={{ fontFamily: "Avenir", fontSize: 22, margin: 20 }}>
          {"Filter by Actor"}
        </Text>
        <FlatList
          data={ALL_ACTORS}
          renderItem={renderSelectItem}
          keyExtractor={(item) => item}
        />
        {/* Add a "Done" button to apply the filter and navigate back to MovieListScreen */}
        <TouchableOpacity
          onPress={handleDonePress}
          style={styles.doneButton}
        >
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

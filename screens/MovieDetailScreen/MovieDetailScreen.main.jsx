import React from "react";
import { SafeAreaView, Text, Image, ScrollView } from "react-native";
import { styles } from "./MovieDetailScreen.styles";

export default function MovieDetailScreen({ route }) {
  // TODO: Receive the movieItem by destructuring route params.
  const { movieItem } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        {/* Display the movie poster image */}
        <Image
          source={{ uri: movieItem.poster_url }} // Assuming there's a 'poster_url' property in your movie data
          style={styles.posterImage}
        />

        {/* Display movie details */}
        <Text style={styles.title}>{movieItem.title}</Text>
        <Text style={styles.releaseDate}>{`Release Date: ${movieItem.release_date}`}</Text>
        <Text style={styles.genres}>{`Genres: ${movieItem.genres.join(", ")}`}</Text>
        <Text style={styles.actors}>{`Actors: ${movieItem.actors.join(", ")}`}</Text>
        <Text style={styles.plot}>{`Plot: ${movieItem.plot}`}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { styles } from "../MovieListScreen.styles";

export const MovieCell = ({ movieItem, onPress }) => {
  // Extract movie data from the movieItem prop
  const { title, poster_url, release_date, genres, actors } = movieItem;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.movieCellContainer}>
        <Image source={{ uri: poster_url }} style={styles.moviePoster} />
        <View style={styles.movieInfo}>
          <Text style={styles.movieTitle}>{title}</Text>
          <Text style={styles.releaseDate}>{`Release Date: ${release_date}`}</Text>
          <Text style={styles.genres}>{`Genres: ${genres.join(", ")}`}</Text>
          <Text style={styles.actors}>{`Actors: ${actors.join(", ")}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

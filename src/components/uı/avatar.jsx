//import liraries
import {UserSquare} from 'iconsax-react-native';
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Colors from '../../theme/colors';

// create a component
const Avatar = ({photo}) => {
  return (
    <View style={styles.container}>
      {photo ? (
        <Image
          style={styles.image}
          source={{
            uri: photo,
          }}
        />
      ) : (
        <UserSquare size="60" color={Colors.GRAY} variant="Bulk" />
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {},
  image: {
    width: 70,
    height: 70,
    borderRadius: 70,
  },
});

//make this component available to the app
export default Avatar;

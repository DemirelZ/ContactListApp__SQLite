//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../../theme/colors';
import {Add} from 'iconsax-react-native';
// create a component
const FlatActionButton = props => {
  return (
    <TouchableOpacity {...props} style={styles.container}>
      <Add size={50} color={Colors.WHITE} />
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.GREEN,
    width: 80,
    height: 80,
    borderRadius: 100,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

//make this component available to the app
export default FlatActionButton;

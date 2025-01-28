//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Linking,
  TouchableOpacity,
} from 'react-native';
import Colors from '../theme/colors';
import Avatar from './uı/avatar';
import {Call, Edit} from 'iconsax-react-native';
import {compareUserName} from '../utils/functions';
import {useNavigation} from '@react-navigation/native';
import {USERUPDATE} from '../utils/routes';

// create a component
const UserCard = ({item, getUsers}) => {
  const navigation = useNavigation();
  const callPhone = () => {
    const url = `tel:${item.phone}`;
    Linking.canOpenURL(url).then(supported => {
      if (supported) return Linking.openURL(url);
      else alert('Desteklenmeyen Telefon numarası');
    });
  };
  return (
    <Pressable style={styles.container}>
      <View style={styles.imageContainer}>
        <Avatar photo={item.photo} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>
          {compareUserName(item.name, item.surname)}
        </Text>
        <Text style={styles.phone}>{item.phone}</Text>
      </View>

      <View style={styles.callContainer}>
        <TouchableOpacity onPress={callPhone}>
          <Call size={30} color={Colors.GREEN} variant="Bold" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(USERUPDATE, {user: item, getUsers: getUsers})
          }>
          <Edit size={30} color={Colors.BLUE} />
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 5,
    marginVertical: 10,
    borderBottomWidth: 0.3,
    borderColor: Colors.GRAY,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
  },
  infoContainer: {
    padding: 10,
    flex: 3,
  },
  imageContainer: {
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  phone: {
    color: Colors.GRAY,
    fontSize: 18,
  },
  callContainer: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

//make this component available to the app
export default UserCard;

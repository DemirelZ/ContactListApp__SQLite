import React, {useState} from 'react';
import {View, ScrollView, Alert, StyleSheet} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import {screenStyle} from '../styles/screenStyle';
import CustomInput from '../components/uı/customInput';
import CustomButton from '../components/uı/cusstomButton';
import {useNavigation} from '@react-navigation/native';
import Colors from '../theme/colors';

const db = SQLite.openDatabase({
  name: 'userDB',
  createFromLocation: '~user.db',
});
const UserUpdate = ({route}) => {
  const navigation = useNavigation();
  const {user} = route.params;

  const [name, setName] = useState(user.name);
  const [surName, setSurName] = useState(user.surname);
  const [phone, setPhone] = useState(user.phone);
  const [age, setAge] = useState(user.age);
  const [photo, setPhoto] = useState(user.photo);

  const updateUser = () => {
    db.transaction(txn => {
      txn.executeSql(
        'UPDATE users SET surname = ?, name = ?, phone = ?, age = ?, photo = ? WHERE id = ?',
        [surName, name, phone, age, photo, user.id],
        (sqlTxn, res) => {
          console.log(`${surName} için güncelleme başarılı`);
          Alert.alert(
            'İşlem başarılı',
            `${name} ${surName} kşisi başarılı bir şekilde güncellendi.`,
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => navigation.goBack()},
            ],
          );
        },
      );
    });
  };

  const deleteUser = userID => {
    return new Promise((resolve, reject) => {
      db.transaction(txn => {
        txn.executeSql(
          'DELETE FROM users WHERE id = ?',
          [user.id],

          Alert.alert(
            'Uyarı!',
            `${name} ${surName} kişisi silinecektir. Onaylıyor musunuuz?`,
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: (_, result) => {
                  resolve(result), navigation.goBack();
                },
              },
            ],
          ),

          (_, error) => {
            reject(error);
          },
        );
      });
    });
  };

  return (
    <View style={screenStyle.container}>
      <ScrollView>
        <CustomInput
          onChangeText={text => setName(text)}
          placeholder="Name"
          title="Name"
          value={name}
        />
        <CustomInput
          onChangeText={text => setSurName(text)}
          placeholder="Surname"
          title="Surname"
          value={surName}
        />
        <CustomInput
          onChangeText={text => setPhone(text)}
          placeholder="Phone"
          title="Phone"
          value={phone}
        />
        <CustomInput
          onChangeText={text => setAge(text)}
          placeholder="Age"
          title="Age"
          value={age}
        />
        <CustomButton
          bgColor={Colors.BLUE}
          onPress={() => updateUser()}
          title={'UPDATE USER'}
        />
        <CustomButton
          bgColor={Colors.BLACK}
          onPress={() => deleteUser(user.id)}
          title={'DELETE USER'}
        />
      </ScrollView>
    </View>
  );
};

export default UserUpdate;

const styles = StyleSheet.create({});

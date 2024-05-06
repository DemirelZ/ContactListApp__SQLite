//import liraries
import React, {useState} from 'react';
import {View, ScrollView, Alert} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import {screenStyle} from '../styles/screenStyle';
import CustomInput from '../components/uı/customInput';
import CustomButton from '../components/uı/cusstomButton';
import Colors from '../theme/colors';

const db = SQLite.openDatabase({
  name: 'userDB',
  createFromLocation: '~user.db',
});

// create a component
const UserAdd = ({navigation}) => {
  const [name, setName] = useState('');
  const [surName, setSurName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [photo, setPhoto] = useState('');

  const saveUser = () => {
    if (!name || !surName || !phone) {
      Alert.alert(
        'Uyarı',
        `Lütfen isim, soyisim ve telefon alanlarını boş bırakmayınız`,
        [
          {
            text: 'OK',
            style: 'cancel',
          },
        ],
      );
      return;
    }

    db.transaction(txn => {
      txn.executeSql(
        'INSERT INTO users (surname, name, phone, age, photo) VALUES (?,?,?,?,?)',
        [surName, name, phone, age, photo],
        (sqlTxn, res) => {
          console.log(`${surName} ekleme başarılı`);
          Alert.alert(
            'İşlem başarılı',
            `${name} ${surName} kşisi başarılı bir şekilde eklendi`,
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
          bgColor={Colors.GREEN}
          onPress={() => saveUser()}
          title={'SAVE'}
        />
      </ScrollView>
    </View>
  );
};
export default UserAdd;

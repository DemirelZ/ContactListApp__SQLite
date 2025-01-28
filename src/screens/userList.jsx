//import liraries
import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, FlatList, RefreshControl} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import {screenStyle} from '../styles/screenStyle';
import FlatActionButton from '../components/uı/FlatActionButton';

import UserCard from '../components/userCard';
import {USERADD} from '../utils/routes';

const db = SQLite.openDatabase({
  name: 'userDB',
});

const UserList = ({navigation}) => {
  const [users, setUsers] = useState([]);
  const createTable = () => {
    return new Promise((resolve, reject) => {
      db.transaction(txn => {
        txn.executeSql(
          'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT,surname VARCHAR(30),name VARCHAR(30),phone VARCHAR(30),age VARCHAR(30),photo VARCHAR(30))',
          [],
          () => resolve(),
          (_, error) => reject(error),
        );
      });
    });
  };

  const getUsers = () => {
    db.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM users ORDER BY id DESC',
        [],
        (sqlTxn, res) => {
          let length = res.rows.length;
          let result = [];
          if (length > 0) {
            for (let i = 0; i < length; i++) {
              let item = res.rows.item(i);
              result.push(item);
            }
            setUsers(result);
          }
        },
        error => {
          console.log('Kullanıcılar hata ', error.message);
        },
      );
    });
  };

  useEffect(() => {
    createTable();
    getUsers();
  }, []);
  return (
    <SafeAreaView style={screenStyle.safeAreaContainer}>
      <View style={screenStyle.container}>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={getUsers} />
          }
          data={users}
          renderItem={({item}) => <UserCard item={item} getUsers={getUsers} />}
        />
        <FlatActionButton
          onPress={() => navigation.navigate(USERADD, {getUsers})}
        />
      </View>
    </SafeAreaView>
  );
};

export default UserList;

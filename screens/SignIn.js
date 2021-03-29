import {View, Text, StyleSheet , Button, TextInput} from 'react-native';
import React from 'react';
import { NavigationHelpersContext } from '@react-navigation/core';
import { useEffect, useState } from 'react';
import 'firebase/firestore';
//import '@react-native-firebase/database';
import * as firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDZn1_zRPQn8ruAxCy9uzEW4HkO2lNUhqg",
    authDomain: "cafe-ad181.firebaseapp.com",
    projectId: "cafe-ad181",
    storageBucket: "cafe-ad181.appspot.com",
    messagingSenderId: "618253331013",
    appId: "1:618253331013:web:53d03552151146f54dd12c",
    measurementId: "G-3D8N4QY9F6"
  };

export const SignIn = ({navigation}) => {
    return(
    <View style = {styles.container}>
        <Button title = 'SignIn Form' onPress = {()=> navigation.push('SignInAccount', {name : 'Sign In Form'})} />
        <Button title = 'Create Account Form' onPress={()=> navigation.push('CreateAccount',{name: 'Create Account Form'})}>
        </Button>
    </View>
    );
}

export const SignInAccount = ({route}) => {
    return(
    <View style = {styles.container}>
        <Text>{route.params.name}</Text>
    </View>
    );
}

export const CreateAccount = ({navigation}) => {
    return(
    <View>
        <Button title = 'Create Account' onPress={()=> {navigation.push('CreateAccount'),{name: 'Create Account'}}}>
        </Button>
    </View>
    );
}

export const SearchTags = ({navigation}) => {
    return (
        <View style = {styles.container}>
            <Button title = 'Search By List' onPress={() => {navigation.push('SearchList'),{name : 'Search By List'}}}></Button>
            <Button title = 'Search By Genre' onPress={() => {navigation.push('SearchGenre'),{name : 'Search By Genre'}}} />
        </View>
    )
}

export const SearchList = ({route}) => {   
if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
}
    const db = firebase.firestore();
    const [count,setcount] = useState();
    const generateData = db.collection('cafeteria').get();
    const [firebaseDatas,getFirebaseDatas] = useState([]);
    const [newData,setNewData] = useState("");
    const [newData1,setNewData1] = useState("");
    useEffect(() => {
        db.collection('cafeteria').get().then((snapshot) => {
            //console.log(snapshot.val());
            snapshot.docs.forEach((doc) => {
                const data = doc.data()
                //console.log(data);
                //setcount(count+1);
                //console.log(count);
                //const items = Object.values(data)
                getFirebaseDatas([data]);
                //console.log(items);

            })
        })
        console.log(db.collection('cafeteria').get());
     },[]);
    const handleAddFirebase = () => {
         db.collection('cafeteria').add({
             name: newData,
             description: newData1
         }).then(() => {
             setNewData("");
             setNewData1("");

         });
         console.log(firebaseDatas);

     }
     return(
            <View style = {styles.container}>
                <TextInput value = {newData} onChangeText={setNewData} style = {styles.input} placeholder = 'Name'/>
                <TextInput value = {newData1} onChangeText={setNewData1} style = {styles.input} placeholder = 'Description'/>
                <Button title="Submit"  onPress={handleAddFirebase}/>
                {/* <ItemComponent items={firebaseDatas} /> */}
                <Text>{console.log(firebaseDatas)}</Text>
                {firebaseDatas.map((firebaseData) => {
                    <View style={styles.container}>
                    <Button title={firebaseData.name}>{firebaseData.name}</Button>
                    <TextInput value = {firebaseData.name} style = {styles.input} />
                    </View>
                })
                }
            </View>
    );
}

export const SearchGenre = ({route}) => {
    <View style = {styles.container}>
        <Text>{route.params.name}</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    // button: {
    //   paddingHorizontal: 20,
    //   paddingVertical: 10,
    //   marginVertical: 10,
    //   borderRadius: 5
    // }
    input: {
        height :40,margin:12,borderWidth:1,
    }
  });
import React, {useState, useRef} from 'react'
import { View, Text, SafeAreaView, StyleSheet, FlatList } from 'react-native'
import { Input } from 'react-native-elements';
import List from '../List';

export default function Search() {
    //TODO: fix corrector

    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [search, setSearch] = useState('');


    //tv shows data
    function getData(query){
      let id = 'e9340061974538238c2dc83f40be9ca2201a2f3cc2e0c1f916e1f75c36416300';
      let url = `https://api.trakt.tv/search/show?query=${query}`;
  
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "trakt-api-key": id,
          'trakt-api-version': '2'
        }
      })
      .then((resp)=>{
        if (!resp.ok) throw new Error(resp.statusText);
          return resp.json();
      })
      .then((data) => {
        let results = data.map((item, index) => {
          return {...item.show, key: index + 10}
        });
        setShows(results);
        setIsRefreshing(false);
        setLoading(false);
        setError("")
      })
      .catch((error) => {
        console.error;
        setIsRefreshing(false);
        setLoading(true);
        setError(err.message);
        setShows([])
      });
      }

    return (
        <SafeAreaView style={styles.safeArea} edges={['right', 'bottom', 'left']}>
        <Text style={styles.header}>Find a TV Show</Text>
        <Input style={styles.input} placeholder="Enter a TV Show name" onChangeText={(value)=>setSearch(value)} 
        onSubmitEditing={()=> getData(search)}/>
            <FlatList 
            data={shows}
            numColumns={3}
            columnWrapperStyle={{flex:1, justifyContent:"space-around"}}
            renderItem={(item)=>( <List shows={item} />)}
            // refreshing={isRefreshing}
            // onRefresh={()=>{
            //   setIsRefreshing(true);
            // }}
            keyExtractor={item => item.key}
          />
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    safeArea:{
      flex: 1,  
      resizeMode: 'center', 
      backgroundColor:'#202124',
      justifyContent: 'flex-start',
  
    },
    header:{
      fontSize: 20,
      color:"#fff",
      textAlign:'left',
      marginLeft:15,
      paddingTop: 15
    },
    briefInfo:{
      flexWrap:"wrap",
      flexDirection:"row",
    },
    loading:{
      color:"#000",
      textAlign:"center",
      fontSize:18,
      marginTop:50
    },
    input:{
        color: 'white'
    },
    fadingContainer: {
        padding: 20,
      },
  })
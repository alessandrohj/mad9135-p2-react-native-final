import React, {useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, FlatList, StatusBar, StyleSheet, Image, Dimensions, Pressable } from 'react-native'
import { style } from 'dom-helpers';
import { Icon } from 'react-native-elements'

const width =  Dimensions.get('window').width;

export default function Trending() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false);
  //tv shows data
  function getData(){
    let id = 'e9340061974538238c2dc83f40be9ca2201a2f3cc2e0c1f916e1f75c36416300';
    let url = 'https://api.trakt.tv/shows/trending';

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
      console.log(results)
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

  useEffect(()=>{
    getData();
  }, [])

  return (
    <SafeAreaView style={styles.safeArea} edges={['right', 'bottom', 'left']}>
      <Text style={styles.header}>Trending movies</Text>
      <FlatList 
        data={shows}
        numColumns={3}
        columnWrapperStyle={{flex:1, justifyContent:"space-around"}}
        renderItem={(item)=>( <Shows shows={item} />)}
        refreshing={isRefreshing}
        onRefresh={()=>{
          setIsRefreshing(true);
          getData();
        }}
        ListEmptyComponent={<Text> Loading ...</Text>}
        keyExtractor={item => item.key}
      />
    </SafeAreaView>
  );
}


function Shows({shows}){
//data coming from "shows"
// title = shows.item['title']
// year = shows.item['year']
// ids =  shows.item['ids'] (imdb / slug / tmdb / trakt)

//images / fetching data from TMDB
//tmdb = a1b2f514b71b98f4fdeabd6fae26bd24
//IMG_URL: 'https://image.tmdb.org/t/p/'
//img = APP.IMG_URL + 'w500' + obj.poster_path;

  const [img, setImg] = useState('');
  let path;
  function getDetails(id){
      let api_key = 'a1b2f514b71b98f4fdeabd6fae26bd24';
      let url = `https://api.themoviedb.org/3/tv/${id}?api_key=${api_key}`;
      fetch(url)
        .then((resp)=>{
          if (!resp.ok) throw new Error(resp.statusText);
            return resp.json();
        })
        .then((data) => {
          //console.log(data.backdrop_path)
          return setImg(data.poster_path)
        })
        .catch(console.error);
      }
  getDetails(shows.item['ids'].tmdb);

  let imgURL = `https://image.tmdb.org/t/p/w500${img}`;

  return (
    <View style={styles.card}>
      <Pressable  
        style={styles.likeBtn}
        onPress={(ev)=>{
        console.log(`you pressed ${shows.item['ids'].tmdb}` )
      }}>
      <Icon name='heart' type='evilicon' color='pink' iconProps={{size:30}}/>
      </Pressable>
      <Image style={styles.image} source={{uri: imgURL}} />
      <Text style={styles.title}> {shows.item['title']}</Text> 
      <Text style={styles.released_year}> {shows.item['year']}</Text>
    </View>
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
  card:{
    alignSelf:"flex-start",
    flexShrink: 1,
    width:(width/3)-20,
  },
  image: {
    width:(width/3)-20,
    height:(width/2)-20,
    borderRadius:7,
    marginTop:20
  },
  title:{
    fontSize:13,
    color:"#fff"
  },
  likeBtn:{
    position:"absolute",
    right: 3, 
    top: 25, 
    zIndex: 10 ,
  },
  briefInfo:{
    flexWrap:"wrap",
    flexDirection:"row",
  },
  released_year:{
    fontSize:11,
    color:"gray"
  },
  loading:{
    color:"#000",
    textAlign:"center",
    fontSize:18,
    marginTop:50
  },
})
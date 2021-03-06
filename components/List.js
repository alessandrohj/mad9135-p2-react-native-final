import React, {useContext, useEffect, useState} from 'react'
import { View, Text, StyleSheet, Dimensions, Pressable, ActivityIndicator } from 'react-native'
import { Icon, Image } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import GlobalContext from './utils/globalContext.utils.'

const width =  Dimensions.get('window').width;
export default function List({shows}) {
  const navigation = useNavigation();
  const {favorites, removeData, addStorageData, faveData, setFaveData} = useContext(GlobalContext);
  const [img, setImg] = useState('');
  
  function checkFavorite(id){
    if (favorites.includes(id)) {
      return true
    } else {
      return false
    }
  }

  function getImage(id){
    let api_key = 'a1b2f514b71b98f4fdeabd6fae26bd24';
    let url = `https://api.themoviedb.org/3/tv/${id}?api_key=${api_key}`;
    fetch(url)
      .then((resp)=>{
        if (!resp.ok) throw new Error(resp.statusText);
          return resp.json();
      })
      .then((data) => {
        if(!data.poster_path || data.poster_path == null) {
          return setImg('via.placeholder.com/500');
        } else{
          setImg(`image.tmdb.org/t/p/w500/${data.poster_path}`)
        }
      })
      .catch(error => console.error);
  }

  function saveFave(id){
    if(favorites.includes(id)){
      removeData(id);
      removeFaveData(id);
    } else {
      addStorageData(id);
      addFaveData();
    }
  }
  
  function addFaveData(){
    setFaveData((old)=> [shows.item, ...old])
  }
  
  function removeFaveData(id){
    let newData = faveData.filter(item => item['ids'].trakt != id);
    setFaveData(newData);
  }

  let imgURL = `https://${img}`;

  useEffect(() => {
    if (shows.item['ids'].tmdb){
      getImage(shows.item['ids'].tmdb);
    } else {
      setImg('via.placeholder.com/500x500?text=No+Image');
    }
  }, [shows])
    
  return (
    <View style={styles.card}>
      <Pressable  
        style={styles.likeBtn}
        onPress={(ev)=>{
          saveFave(shows.item['ids'].trakt);
      }}>
        <Icon name={ checkFavorite(shows.item['ids'].trakt) ? 'heart' : 'hearto'} type='antdesign' color={checkFavorite(shows.item['ids'].trakt) ? 'red' : 'pink'} iconProps={{size:23}}/>
      </Pressable>
      <Pressable
        onPress={()=>{
          navigation.navigate('Details', {id: shows.item['ids'].trakt})
      }}>
        <Image PlaceholderContent={<ActivityIndicator size="large" color="black" />} style={styles.image} source={{uri: imgURL}} />
      </Pressable>
      <View style={styles.info}>
        <Text style={styles.title}>{shows.item['title']}</Text> 
        <Text style={styles.released_year}>{shows.item['year']}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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
  info:{
    textAlign:"left"
  },
  title:{
    fontSize:13,
    color:"#fff",
    marginTop:5,
  },
  likeBtn:{
    position:"absolute",
    right: 3, 
    top: 25, 
    zIndex: 10 ,
  },
  released_year:{
    fontSize:11,
    color:"gray",
    marginTop:2
  },
})

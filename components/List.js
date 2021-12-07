import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, FlatList, StatusBar, StyleSheet, Image, Dimensions, Pressable } from 'react-native'
import { style } from 'dom-helpers';
import { Icon } from 'react-native-elements'
import { getData } from './utils/storage.utils';

const width =  Dimensions.get('window').width;

//TODO: placeholder image for images not found

export default function List({shows}) {
 
    const [img, setImg] = useState('');

    function getImage(id){
        let api_key = 'a1b2f514b71b98f4fdeabd6fae26bd24';
        let url = `https://api.themoviedb.org/3/tv/${id}?api_key=${api_key}`;
        fetch(url)
          .then((resp)=>{
            if (!resp.ok) throw new Error(resp.statusText);
              return resp.json();
          })
          .then((data) => {
           return setImg(data.poster_path)
          })
          .catch(console.error);
        }

        getImage(shows.item['ids'].tmdb);
    
        function saveFave(id){
          console.log(id);
        }
    let imgURL = `https://image.tmdb.org/t/p/w500${img}`;
    
    return (
        <View style={styles.card}>
          <Pressable  
            style={styles.likeBtn}
            onPress={(ev)=>{
              navigator.navigate
            console.log(`you pressed ${shows.item['ids'].tmdb}` )
          }}
          onLongPress={(ev)=> saveFave(shows.item['ids'].tmdb)}
          >
          <Icon name='heart' type='evilicon' color='pink' iconProps={{size:30}}/>
          </Pressable>
          <Image style={styles.image} source={{uri: imgURL}} />
          <Text style={styles.title}> {shows.item['title']}</Text> 
          <Text style={styles.released_year}> {shows.item['year']}</Text>
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
  released_year:{
    fontSize:11,
    color:"gray"
  },
})

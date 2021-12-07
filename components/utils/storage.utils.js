import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('myFaves', jsonValue)
      console.log('saved');
    } catch (error) {
        console.log(error)
    }
  }


  export const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('myFaves');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(error) {
     console.log(error)
    }
  }
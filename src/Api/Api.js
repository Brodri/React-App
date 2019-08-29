import axios from 'axios';
import AsyncStorage from 'react-native';


const Api = async (gitUser, test) => {
  axios.get('https://api.github.com/users/' + gitUser +'/repos').then(res => {
    return res.data
  });
};

export default Api;

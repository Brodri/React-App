import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#333',
    flex:1
  },
  logout: {
    color: '#c51f2f',
    fontSize: 28,
    marginLeft: 8,
  },
  sectionLinfo: {
    borderColor: 'white',
    borderBottomWidth: 1,
    marginTop: 12,
    paddingBottom: 8,
  },
  info: {
    color: 'white',
    marginLeft: 8,
    fontSize:16
  },
  sectionRepositories: {
    marginTop: 8,
    marginLeft: 8,
    marginRight: 8,
    flex:1
  },
  repositories: {
    paddingTop: 14,
    paddingBottom: 14,
    borderColor: '#c51f2f',
    borderBottomWidth: 1,
  },
  repositoriesTitle: {
    color: 'white',
    fontSize: 22,
    paddingBottom:8
  },
  repositoriesDescription: {
    color: 'white',
    fontSize: 20,
    paddingBottom:8
  },
  repositoriesOthers: {
    color: 'white',
    fontSize: 18,
    paddingBottom:8
  },
  title:{
    fontSize:20,
    color:'#fff',
    fontWeight:'bold',
  },
  titleInfo:{
    fontSize:16,
    color:'#fff',
    fontWeight:'bold',
  },
  input:{
    borderColor:'black',
    borderBottomWidth:1,
    marginBottom:8,
    marginTop:9,
    marginLeft:8,
    marginRight:8,
    color:'black',
  },
  search:{
      backgroundColor:'#4d4d4d',
      color: 'white',
  }
});

export default styles;

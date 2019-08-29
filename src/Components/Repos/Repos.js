import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  AsyncStorage,
  FlatList
} from 'react-native';
import FormLogin from '../../Utils/FormUtils';
import axios from 'axios';
import _ from 'lodash' 
import styles from './style';

class Repos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FirstName: '',
      LastName: '',
      identificationCard: '',
      dateOfBirth: new Date(),
      email: '',
      gitUser: '',
      repositories: [],
      page: 1,
      filteredData: [],
      inSearchMode:false,
      repositoriesTotal:[]
    };
    this.onEndReachedCalledDuringMomentum = true;
  }

  componentDidMount() {
    this.getData();
  }

  searchFilter = text => {
    const data = _.filter(this.state.repositoriesTotal, item => {
      const nameData = `${item.name.toUpperCase()}}`
      const textData = text.toUpperCase()
      return (nameData.indexOf(textData) > -1)
    })
    this.setState({
      filteredData: data
    })
    if(text.length>=3){
        this.setState({
            inSearchMode: true
          })
    }else{
        this.setState({
            inSearchMode: false
          })
    }
  }

  makeRemoteRequest = async () => {
    axios
      .get(
        'https://api.github.com/users/' + this.state.gitUser + '/repos?page='+this.state.page+'&per_page=5',
      )
      .then(res => {
        this.setState({
            repositories:[...this.state.repositories,...res.data],
        })
      });
  };


  LoadMore=()=>{
      this.setState({
          page:this.state.page + 1
      },()=>{
          this.makeRemoteRequest();
      }
      )
  }

  getData = async () => {
    let data = await AsyncStorage.getItem('dataUser');
    let parsed = JSON.parse(data);
    this.setState({
      FirstName: parsed.FirstName,
      LastName: parsed.LastName,
      identificationCard: parsed.identificationCard,
      dateOfBirth: parsed.dateOfBirth,
      email: parsed.email,
      gitUser: parsed.gitUser,
    });
    let dataGit = await AsyncStorage.getItem('dataGit');
    let git = JSON.parse(dataGit);
    this.setState({
      repositories: git,
    });

    axios
      .get(
        'https://api.github.com/users/' + this.state.gitUser + '/repos',
      )
      .then(res => {
        this.setState({
            repositoriesTotal:[...res.data],
        })
      });
  };

  filter=()=>{

  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <SafeAreaView style={styles.body}>
        <View>
          <Text style={styles.logout} onPress={() => Logout(navigate)}>
            Salir
          </Text>
          <View style={styles.sectionLinfo}>
            <Text style={styles.info}>
              {'Name:  ' + this.state.FirstName} {this.state.LastName}
            </Text>
            <Text style={styles.info}>{'Email: ' + this.state.email}</Text>
            <Text style={styles.info}>
              {'IC:  ' + this.state.identificationCard}
            </Text>
            <Text style={styles.info}>
              {'Git User:  ' + this.state.gitUser}
            </Text>
            <FormLogin
              name='Search Repository'
              style={[styles.input, styles.search]}
              onChangeText={this.searchFilter}></FormLogin>
          </View>
        </View>
        <ScrollView onMomentumScrollEnd={() => this.LoadMore()}>
          <FlatList
            style={styles.sectionRepositories}
            data={this.state.inSearchMode ? this.state.filteredData : this.state.repositories}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <View style={styles.repositories}>
                <Text style={styles.title}>Name:</Text>
                <Text style={styles.repositoriesTitle}>{item.name}</Text>
                <Text style={styles.title}>Description:</Text>
                <Text style={styles.repositoriesDescription}>
                  {item.description}
                </Text>
                <Text style={styles.title}>Lenguage:</Text>
                <Text style={styles.repositoriesOthers}>{item.language}</Text>
                <Text style={styles.title}>Branch:</Text>
                <Text style={styles.repositoriesOthers}>
                  {item.default_branch}
                </Text>
                <Text style={styles.title}>Url:</Text>
                <Text style={styles.repositoriesOthers}>{item.url}</Text>
              </View>
            )}
            keyExtractor={item => item.name}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

Logout = navigate => {
  AsyncStorage.clear();
  navigate('Login');
};

export default Repos;

import React, {Component} from 'react';
import {SafeAreaView, ScrollView, View, Image, AsyncStorage } from 'react-native';
import {Item, Button, Text, DatePicker} from 'native-base';
import FormLogin from '../../Utils/FormUtils';
import Api from '../../Api/Api';
import axios from 'axios';
import styles from './style';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FirstName: '',
      LastName: '',
      identificationCard: '',
      dateOfBirth: new Date(),
      email: '',
      gitUser: '',
    };
  }

  componentDidMount= async() =>{
    let data = await AsyncStorage.getItem('dataUser');
    const {navigate} = this.props.navigation;
    data && navigate('Repos')
  }
  setDate(newDate) {
    this.setState({dateOfBirth: newDate});
  }
  render() {
    const {navigate} = this.props.navigation;
    return (
      <ScrollView style={styles.body}>
        <SafeAreaView>
          <Image
            source={require('../../images/logo.jpg')}
            style={styles.imageLogo}
          />
          <View>
            <FormLogin
              name={'Name'}
              style={styles.input}
              onChangeText={FirstName =>
                this.setState({FirstName})
              }></FormLogin>
            <FormLogin
              name={'Last Name'}
              style={styles.input}
              onChangeText={LastName => this.setState({LastName})}></FormLogin>
            <FormLogin
              name="Identification Card"
              style={styles.input}
              onChangeText={identificationCard =>
                this.setState({identificationCard})
              }></FormLogin>
            <View style={styles.input}>
              <DatePicker
                defaultDate={new Date(2019, 4, 4)}
                locale={'en'}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={'fade'}
                androidMode={'default'}
                placeHolderText="Select date"
                textStyle={{color: 'black'}}
                placeHolderTextStyle={{color: 'black'}}
                onDateChange={this.setDate.bind(this)}
                disabled={false}
              />
            </View>
            <FormLogin
              name="Email"
              style={styles.input}
              onChangeText={email => this.setState({email})}></FormLogin>
            <FormLogin
              name="Github User"
              style={styles.input}
              onChangeText={gitUser => this.setState({gitUser})}></FormLogin>
          </View>
          <View>
            <Item style={styles.centerContent}>
              <Button
                rounded
                style={styles.colorButton}
                onPress={() => sendData(this.state, navigate)}>
                <Text>Sign In</Text>
              </Button>
            </Item>
            <Item style={styles.centerContent}></Item>
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}
const sendData = async (
  {FirstName, LastName, identificationCard, dateOfBirth, email, gitUser},
  navigate,
) => {
  let dataTosave = {
    FirstName,
    LastName,
    identificationCard,
    dateOfBirth,
    email,
    gitUser,
  };
  (FirstName && LastName && identificationCard && dateOfBirth && email && gitUser) &&
    (axios.get('https://api.github.com/users/' + gitUser +'/repos?page=1&per_page=5').then(res => {
    AsyncStorage.setItem('dataGit', JSON.stringify(res.data))
    AsyncStorage.setItem('dataUser', JSON.stringify(dataTosave))
    navigate('Repos')
  })
    );
};

export default Login;

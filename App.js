import Login from './src/Components/Login/Login';
import Repos from './src/Components/Repos/Repos';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';

const MainNavigator = createSwitchNavigator({
  Login: {screen: Login},
  Repos: {screen: Repos,},
});

const App = createAppContainer(MainNavigator);

export default App
import React from 'react';
import { StyleSheet, Text, View, AdSupportIOS, TextInput, Button, Switch, FlatList } from 'react-native';
import { TabNavigator } from 'react-navigation';

class MainScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'On Going',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <ToDoList
          tasks={this.props.screenProps.tasks}
          addToDoItem={this.props.screenProps.addToDoItem}
          finishTask={this.props.screenProps.finishTask}
        />
      </View>
    );
  }
}

class ProfileScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Finished',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <ToDoList
          tasks={this.props.screenProps.tasks}
          addToDoItem={this.props.screenProps.addToDoItem}
          finishTask={this.props.screenProps.finishTask}
          filter={(item) => {
            return item.isFinished === true;
          }}
        />
      </View>
    );
  }
}

// https://reactnavigation.org/docs/intro/
const App = TabNavigator({
  Main: { screen: MainScreen },
  Profile: { screen: ProfileScreen },
});


class ToDoListApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        {
          "task": "PIVITOL",
          "isFinished": false,
          "guid": "6e667609-3a3b-4bd8-80a4-f2900a5fb9da"
        },
        {
          "task": "ZAYA",
          "isFinished": true,
          "guid": "8ea908ca-27f6-40a7-bbd4-3a2f8ffd8da4"
        },
        {
          "task": "NETBOOK",
          "isFinished": false,
          "guid": "8120b151-08dd-4674-8581-c7cfa664fdf6"
        }
      ], text: ""
    };
  }

  addToDoItem = (text) => {
    this.setState(prevState => {
      prevState.tasks.push({
        "task": text,
        "isFinished": false,
        "guid": new Date().getTime(),
      });
      return prevState;
    });
  }

  finishTask = (guid) => {
    this.setState(prevState => {
      let task = prevState.tasks.find(task => task.guid === guid);
      task.isFinished = !task.isFinished;
      return prevState;
    });
  }

  render() {
    const params = {
      tasks: this.state.tasks,
      addToDoItem: this.addToDoItem,
      finishTask: this.finishTask,
    }
    return (
      // <ToDoList tasks={this.state.tasks} />
      <App screenProps={params} />
    );
  }
}

class ToDoList extends React.Component {
  constructor(props) {
    super(props);
  }

  _keyExtractor = (itemaa) => itemaa.guid;

  _onPressItem = (guid) => {
    this.props.finishTask(guid);
  }

  _reanderItem = ({ item }) => (
    <ToDoItem
      task={item}
      addToDoItem={this.addToDoItem}
      onPressItem={this._onPressItem}
    />
  );


  render() {
    const tasks = undefined === this.props.filter ? this.props.tasks : this.props.tasks.filter(item => this.props.filter(item));
    return (
      <View>
        <TodoGenerator addToDoItem={this.props.addToDoItem} />
        <FlatList
          data={tasks}
          extraData={this.props}
          keyExtractor={this._keyExtractor}
          renderItem={this._reanderItem}
        />
      </View>
    )
  }
}

class TodoGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  addToDoItem = (e) => {
    this.props.addToDoItem(this.state.text);
  }

  render() {
    return (
      <View>
        <TextInput style={{ height: 40, padding: 10 }} placeholder="Input todo task"
          autoCorrect={false}
          onChangeText={(text) => this.setState({ text })}
          onBlur={this.addToDoItem}
        />
      </View>
    )
  }
}

class ToDoItem extends React.Component {
  _onPress = () => {
    this.props.onPressItem(this.props.task.guid);
  }

  render() {
    let task = this.props.task;
    return (
      <View>
        <Switch value={task.isFinished}></Switch>
        <Text onPress={this._onPress}>{task.task}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default ToDoListApp;
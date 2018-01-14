import React from 'react';
import { StyleSheet, Text, View, AdSupportIOS, TextInput, Button, Switch } from 'react-native';

export default class App extends React.Component {
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

  render() {
    return (
      <ToDoList tasks={this.state.tasks} />
    );
  }
}

class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Tasks: this.props.tasks, text: '' };
  }

  addToDoItem = (text) => {
    this.setState(prevState => { prevState.Tasks.push({ "task": text, "isFinished": false, "guid": new Date().getTime()}); return prevState; });
  }

  render() {
    return (
      <View style={styles.container}>
        <TodoGenerator addToDoItem={this.addToDoItem} />
        {this.state.Tasks.map((t) => {
          return (
            <ToDoItem task={t} key={t.guid} />
          )
        })}
      </View>
    )
  }
}

class TodoGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  handlePress = (e) => {
    this.props.addToDoItem(this.state.text);
  }

  render() {
    return (
      <View>
        <TextInput placeholder="Input todo task" onChangeText={(text) => this.setState({ text })} />
        <Text>{this.state.text}</Text>
        <Button onPress={this.handlePress} title="add" />
      </View>
    )
  }
}

class ToDoItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let task = this.props.task;
    return (
      <View>
        <Switch value={task.isFinished}></Switch>
        <Text>{task.task}</Text>
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

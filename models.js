import Realm from 'realm';

class Todo extends Realm.Object {}
Todo.schema = {
    name: 'Todo',
    primaryKey: 'guid',
    properties: {
        isFinished: {type: 'bool', default: false},
        task: 'string',
        guid: 'string',
    },
};

class TodoList extends Realm.Object {}
TodoList.schema = {
    name: 'TodoList',
    properties: {
        name: 'string',
        items: {type: 'list', objectType: 'Todo'},
    },
};

export default new Realm({schema: [Todo, TodoList]});
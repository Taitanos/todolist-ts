import {TasksStatus} from '../App';
import {addTasksAC, changeTaskStatusAC, removeTasksAC, tasksReducer, updateTaskTitleAC} from './tasks-reducer';
import {addTodoListAC, removeTodolistAC} from './todolist-reducer';

test('correct task should be delete from correct array', () => {
    const startState: TasksStatus = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: 'Bread', isDone: false},
            {id: '2', title: 'Milk', isDone: true},
            {id: '3', title: 'Tea', isDone: false},
        ],
    }

    const endState = tasksReducer(startState, removeTasksAC('todolistId2', '2'))

    expect(endState).toEqual({
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: 'Bread', isDone: false},
            {id: '3', title: 'Tea', isDone: false},
        ],
    })
})

test('correct task should be added from correct array', () => {
    const startState: TasksStatus = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: 'Bread', isDone: false},
            {id: '2', title: 'Milk', isDone: true},
            {id: '3', title: 'Tea', isDone: false},
        ],
    }

    const endState = tasksReducer(startState, addTasksAC('todolistId2', 'Juice'))

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('Juice')
    expect(endState['todolistId1'][0].isDone).toBe(false)
})

test('status of specified task should be changed', () => {
    const startState: TasksStatus = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: 'Bread', isDone: false},
            {id: '2', title: 'Milk', isDone: true},
            {id: '3', title: 'Tea', isDone: false},
        ],
    }

    const endState = tasksReducer(startState, changeTaskStatusAC('todolistId2', '2', false))

    expect(endState['todolistId1'][1].isDone).toBe(true)
    expect(endState['todolistId2'][1].isDone).toBe(false)
})

test('title of specified task should be changed', () => {
    const startState: TasksStatus = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: 'Bread', isDone: false},
            {id: '2', title: 'Milk', isDone: true},
            {id: '3', title: 'Tea', isDone: false},
        ],
    }

    const endState = tasksReducer(startState, updateTaskTitleAC('todolistId2', '2', 'Beer'))

    expect(endState['todolistId1'][1].title).toBe('JS')
    expect(endState['todolistId2'][1].title).toBe('Beer')
})

test('new array should be added when new todolist is added', () => {
    const startState: TasksStatus = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: 'Bread', isDone: false},
            {id: '2', title: 'Milk', isDone: true},
            {id: '3', title: 'Tea', isDone: false},
        ],
    }

    const endState = tasksReducer(startState, addTodoListAC('new todolist'))

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error ('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolist should be deleted', ()=> {
    const startState: TasksStatus = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: 'Bread', isDone: false},
            {id: '2', title: 'Milk', isDone: true},
            {id: '3', title: 'Tea', isDone: false},
        ],
    }

    const action = removeTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})
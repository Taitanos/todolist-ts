import { TasksStatus, TodoLists } from "../App"
import {addTodoListAC, todolistsReducer} from './todolist-reducer';
import {tasksReducer} from './tasks-reducer';

test('ids should be equals', () => {
    const startTaskState: TasksStatus = {}
    const startTodoListState: TodoLists[] = []

    const action = addTodoListAC('new todolist')

    const endStateTaskState = tasksReducer(startTaskState, action)
    const endStateTodoListState = todolistsReducer(startTodoListState, action)

    const keys = Object.keys(endStateTaskState)
    const idFromTasks = keys[0]
    const idFromTodoList = endStateTodoListState[0].id

    expect(idFromTasks).toBe(action.payload.todoListId)
    expect(idFromTodoList).toBe(action.payload.todoListId)
})
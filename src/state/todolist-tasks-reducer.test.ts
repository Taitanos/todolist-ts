import { TasksStatusType, TodoListsType } from "../App"
import {addTodoListAC, todoListsReducer} from './todolist-reducer';
import {tasksReducer} from './tasks-reducer';

test('ids should be equals', () => {
    const startTaskState: TasksStatusType = {}
    const startTodoListState: TodoListsType[] = []

    const action = addTodoListAC('new todolist')

    const endStateTaskState = tasksReducer(startTaskState, action)
    const endStateTodoListState = todoListsReducer(startTodoListState, action)

    const keys = Object.keys(endStateTaskState)
    const idFromTasks = keys[0]
    const idFromTodoList = endStateTodoListState[0].id

    expect(idFromTasks).toBe(action.payload.todoListId)
    expect(idFromTodoList).toBe(action.payload.todoListId)
})
import { TasksStatus } from "../App"
import {v1} from 'uuid';
import {AddTodoList, RemoveTodolist} from './todolist-reducer';

type TasksReducer = RemoveTasks | AddTasks | ChangeTaskStatus | UpdateTaskTitle | AddTodoList | RemoveTodolist

type RemoveTasks = ReturnType<typeof removeTasksAC>
type AddTasks = ReturnType<typeof addTasksAC>
type ChangeTaskStatus = ReturnType<typeof changeTaskStatusAC>
type UpdateTaskTitle = ReturnType<typeof updateTaskTitleAC>


export const tasksReducer = (state: TasksStatus, action: TasksReducer) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].filter(t => t.id !== action.payload.tasksId)
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.payload.todoListId]: [{id: v1(), title: action.payload.title, isDone: false}, ...state[action.payload.todoListId]]
             }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId]
                    .map(t => t.id === action.payload.taskId ? {...t, isDone: action.payload.isDone} : t)
            }
        case 'UPDATE-TASK-TITLE':
            return {
                ...state,
                [action.payload.todoListsId]: state[action.payload.todoListsId]
                    .map(t => t.id === action.payload.taskId ? {...t, title: action.payload.title} : t)
            }
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.payload.todoListId]: []
            }
        case 'REMOVE-TODOLIST':
            let copyState = {...state}
            delete copyState[action.payload.id]
            return copyState
        default:
            return state
    }
}

export const removeTasksAC = (todoListId: string, tasksId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {todoListId, tasksId}
    } as const
}

export const addTasksAC = (todoListId: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {todoListId, title}
    } as const
}

export const changeTaskStatusAC = (todoListId: string, taskId: string, isDone: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {todoListId, taskId, isDone}
    } as const
}

export const updateTaskTitleAC = (todoListsId: string, taskId: string, title: string) => {
    return {
        type: 'UPDATE-TASK-TITLE',
        payload: {todoListsId, taskId, title}
    } as const
}
import {FilterValues, TodoListsType} from '../App';
import {v1} from 'uuid';

type TodolistReducerActionType = RemoveTodolistActionType | AddTodoListActionType | UpdateTodoListTitleActionType | ChangeFilterActionType

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodoListActionType = ReturnType<typeof addTodoListAC>
export type UpdateTodoListTitleActionType = ReturnType<typeof updateTodoListTitleAC>
export type ChangeFilterActionType = ReturnType<typeof changeFilterAC>

export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {id}
    } as const
}

export const addTodoListAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {title, todoListId: v1()}
    } as const
}

export const updateTodoListTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {id, title}
    } as const
}

export const changeFilterAC = (id: string, filter: FilterValues) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {id, filter}
    } as const
}

const initialState: TodoListsType[] = []

export const todoListsReducer = (state: TodoListsType[] = initialState, action: TodolistReducerActionType): TodoListsType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.payload.id)
        case 'ADD-TODOLIST':
            const newTodo: TodoListsType = {id: action.payload.todoListId, title: action.payload.title, filter: 'all'}
            return [...state, newTodo]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)
        default:
            return state
    }
}
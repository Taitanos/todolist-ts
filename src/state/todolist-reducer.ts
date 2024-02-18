import {FilterValues, TodoLists} from '../App';
import {v1} from 'uuid';

type TodolistReducer = RemoveTodolist | AddTodoList | UpdateTodoListTitle | ChangeFilter

export type RemoveTodolist = ReturnType<typeof removeTodolistAC>
export type AddTodoList = ReturnType<typeof addTodoListAC>
export type UpdateTodoListTitle = ReturnType<typeof updateTodoListTitleAC>
export type ChangeFilter = ReturnType<typeof changeFilterAC>

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

export const todolistsReducer = (state: TodoLists[], action: TodolistReducer): TodoLists[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.payload.id)
        case 'ADD-TODOLIST':
            const newTodo: TodoLists = {id: action.payload.todoListId, title: action.payload.title, filter: 'all'}
            return [...state, newTodo]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)
        default:
            return state
    }
}
import React from 'react';
import './App.css';
import Todolist, {TaskType} from './Todolist';
import AddItemForm from './AddItemForm';
import ButtonAppBar from './ButtonAppBar';
import {Container, Grid, Paper} from '@mui/material';
import {addTodoListAC, changeFilterAC, removeTodolistAC, updateTodoListTitleAC} from './state/todolist-reducer';
import {addTasksAC, changeTaskStatusAC, removeTasksAC, updateTaskTitleAC} from './state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import TodolistWithRedux from './TodolistWithRedux';


export type FilterValues = 'all' | 'active' | 'completed'

export type TodoListsType = {
    id: string,
    title: string,
    filter: FilterValues
}

export type TasksStatusType = {
    [key: string]: TaskType[]
}

function AppWithRedux() {

    let todoLists = useSelector<AppRootStateType, TodoListsType[]>(state => state.todoLists)

    let tasks = useSelector<AppRootStateType, TasksStatusType>(state => state.tasks)

    const dispatch = useDispatch()

    // Функции для тудулиста
    const addTodoList = (title: string) => {
        dispatch(addTodoListAC(title))
    }

/*    const changeFilter = (todoListId: string, newFilterValue: FilterValues) => {
        dispatch(changeFilterAC(todoListId, newFilterValue))
    }

    const removeTodolist = (todoListId: string) => {
        dispatch(removeTodolistAC(todoListId))
    }

    const updateTodoListTitle = (todoListsId: string, title: string) => {
        dispatch(updateTodoListTitleAC(todoListsId, title))
    }


    // Функции для заданий
    const addTask = (todoListId: string, title: string) => {
        dispatch(addTasksAC(todoListId, title))
    }

    const removeTask = (todoListId: string, taskId: string) => {
        dispatch(removeTasksAC(todoListId, taskId))
    }

    const changeTaskStatus = (todoListId: string, taskID: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todoListId, taskID, isDone))
    }

    const updateTaskTitle = (todoListsId: string, taskId: string, title: string) => {
        dispatch(updateTaskTitleAC(todoListsId, taskId, title))
    }*/

    const stylePaper = {
        border: '2px solid gray',
        backgroundColor: 'aquamarine',
        borderRadius: '5px',
        padding: '25px',
        margin: '15px',
        height: 'max-content',
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container>
                <Grid container style={{margin: '20px'}}>
                    <AddItemForm onClick={addTodoList}/>
                </Grid>
                <Grid container>
                    {todoLists.map((tl) => {
                        return (
                            <Paper style={stylePaper} elevation={3}>
                                <TodolistWithRedux todoList={tl}/>
                            </Paper>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    )
}

export default AppWithRedux;
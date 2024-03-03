import React, {useReducer} from 'react';
import './App.css';
import Todolist, {TaskType} from './Todolist';
import AddItemForm from './AddItemForm';
import ButtonAppBar from './ButtonAppBar';
import {Container, Grid, Paper} from '@mui/material';
import {addTodoListAC, changeFilterAC, removeTodolistAC, todoListsReducer, updateTodoListTitleAC} from './state/todolist-reducer';
import {addTasksAC, changeTaskStatusAC, removeTasksAC, tasksReducer, updateTaskTitleAC} from './state/tasks-reducer';

export type FilterValues = 'all' | 'active' | 'completed'

export type TodoListsType = {
    id: string,
    title: string,
    filter: FilterValues
}

export type TasksStatusType = {
    [key: string]: TaskType[]
}

function AppWithReducer() {

    let todoListId1 = crypto.randomUUID()
    let todoListId2 = crypto.randomUUID()

    const [todoLists, dispatchToTodoLists] = useReducer(todoListsReducer, [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListId1]: [
            {id: crypto.randomUUID(), title: 'HTML&CSS', isDone: true,},
            {id: crypto.randomUUID(), title: 'JS/TS', isDone: true,},
            {id: crypto.randomUUID(), title: 'React', isDone: false},
            {id: crypto.randomUUID(), title: 'Redux', isDone: false},
        ],
        [todoListId2]: [
            {id: crypto.randomUUID(), title: 'Milk', isDone: true},
            {id: crypto.randomUUID(), title: 'React Book', isDone: true},
        ]
    })

    // Функции для тудулиста
    const addTodoList = (title: string) => {
        let action = addTodoListAC(title)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }

    const changeFilter = (todoListId: string, newFilterValue: FilterValues) => {
        dispatchToTodoLists(changeFilterAC(todoListId, newFilterValue))
    }

    const removeTodolist = (todoListId: string) => {
        let action = removeTodolistAC(todoListId)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }

    const updateTodoListTitle = (todoListsId: string, title: string) => {
        dispatchToTodoLists(updateTodoListTitleAC(todoListsId, title))
    }


    // Функции для заданий
    const addTask = (todoListId: string, title: string) => {
        dispatchToTasks(addTasksAC(todoListId, title))
    }

    const removeTask = (todoListId: string, taskId: string) => {
        dispatchToTasks(removeTasksAC(todoListId, taskId))
    }

    const changeTaskStatus = (todoListId: string, taskID: string, isDone: boolean) => {
        dispatchToTasks(changeTaskStatusAC(todoListId, taskID, isDone))
    }

    const updateTaskTitle = (todoListsId: string, taskId: string, title: string) => {
        dispatchToTasks(updateTaskTitleAC(todoListsId, taskId, title))
    }

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

                        let tasksForTodoList = tasks[tl.id]

                        if (tl.filter === 'active') {
                            tasksForTodoList = tasks[tl.id].filter(t => !t.isDone);
                        }
                        if (tl.filter === 'completed') {
                            tasksForTodoList = tasks[tl.id].filter(t => t.isDone);
                        }

                        return (
                            <Paper style={stylePaper} elevation={3}>
                                <Todolist
                                    key={tl.id}
                                    todoListId={tl.id}
                                    tasks={tasksForTodoList}
                                    title={tl.title}
                                    filter={tl.filter}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeTaskStatus}
                                    updateTask={updateTaskTitle}
                                    removeTodolist={removeTodolist}
                                    updateTodoList={updateTodoListTitle}
                                />
                            </Paper>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    )
}

export default AppWithReducer;
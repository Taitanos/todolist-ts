import React, {useState} from 'react';
import './App.css';
import Todolist, {Task} from './Todolist';
import AddItemForm from './AddItemForm';
import ButtonAppBar from './ButtonAppBar';
import {Container, Grid, Paper} from '@mui/material';

export type FilterValues = 'all' | 'active' | 'completed'

export type TodoLists = {
    id: string,
    title: string,
    filter: FilterValues
}

export type TasksStatus = {
    [key: string]: Task[]
}

function App() {

    let todoListId1 = crypto.randomUUID()
    let todoListId2 = crypto.randomUUID()

    const [todoLists, setTodoLists] = useState<TodoLists[]>(   [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksStatus>({
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
        const newTodoId = crypto.randomUUID()
        const newTodo: TodoLists = {id: newTodoId, title, filter: 'all'}
        setTodoLists([...todoLists, newTodo])
        setTasks({...tasks, [newTodoId]: []})
    }

    const changeFilter = (todoListId: string, newFilterValue: FilterValues) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: newFilterValue} : tl))
    }

    const removeTodolist = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
    }

    const updateTodoListTitle = (todoListsId: string, title: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListsId ? {...tl, title} : tl))
    }


    // Функции для заданий
    const addTask = (todoListId: string, title: string) => {
        setTasks({...tasks, [todoListId]: [...tasks[todoListId], {id: crypto.randomUUID(), title, isDone: false}]})
    }

    const removeTask = (todoListId: string, taskId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)})
    }

    const changeTaskStatus = (todoListId: string, taskID: string, isDone: boolean) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskID ? {...t, isDone} : t)})
    }

    const updateTaskTitle = (todoListsId: string, taskId: string, title: string) => {
        setTasks({...tasks, [todoListsId]: tasks[todoListsId].map(t => t.id === taskId ? {...t, title} : t)})
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

export default App;
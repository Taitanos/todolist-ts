import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from './Todolist';

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodoListsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

type TasksStatusType = {
    [key: string]: TaskType[]
}

function App() {

    let todoListId1 = crypto.randomUUID()
    let todoListId2 = crypto.randomUUID()

    // Состояния

    const [todoLists, setTodoLists] = useState<TodoListsType[]>([
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksStatusType>({
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
    //   const [filter, setFilter] = useState<FilterValuesType>('all')

    // Функции для тудулиста
    const removeTodolist = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
    }


    // Функции для заданий
    const removeTask = (todoListId: string, taskId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)})
    }

    const addTask = (todoListId: string, title: string) => {
        setTasks({...tasks, [todoListId]: [...tasks[todoListId], {id: crypto.randomUUID(), title, isDone: false}]})
    }

    const changeFilter = (todoListId: string, newFilterValue: FilterValuesType) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: newFilterValue} : tl))
    }

    const changeTaskStatus = (todoListId: string, taskID: string, isDone: boolean) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(tl => tl.id === taskID ? {...tl, isDone} : tl)})
    }

    /*
        const changeFilter = (newFilterValue: FilterValuesType) => {
        setFilter(newFilterValue)
    }

    const getFilteredTasksForRender = (allTask: Array<TaskType>, filterValue: FilterValuesType): Array<TaskType> => {
        switch (filterValue) {
            case 'active':
                return allTask.filter(t => !t.isDone)
            case 'completed':
                return allTask.filter(t => t.isDone)
            default:
                return allTask
        }
    }

    const filteredTasksForRender: Array<TaskType> = getFilteredTasksForRender(tasks, filter)
    */

    /*    const changeTaskTitle = (todoListId: string, taskID: string, title: string) => {
            let todoListTasks = tasks[todoListId]
            let task = todoListTasks.find(t => t.id === taskID);
            if (task) {
                task.title = title
            }
            setTasks({...tasks})
        }*/


    return (
        <div className="App">
            {todoLists.map((tl) => {

                    let tasksForTodoList = tasks[tl.id]

                    if (tl.filter === 'active') {
                        tasksForTodoList = tasks[tl.id].filter(t => !t.isDone);
                    }
                    if (tl.filter === 'completed') {
                        tasksForTodoList = tasks[tl.id].filter(t => t.isDone);
                    }

                    return (
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
                            removeTodolist={removeTodolist}
                            //changeTaskTitle={changeTaskTitle}
                        />
                    )
                }
            )
            }

        </div>
    )
}

export default App;
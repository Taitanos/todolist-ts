import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from './Todolist';

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    const todoListTitle: string = 'What to learn'

    // Состояния
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: crypto.randomUUID(), title: 'HTML&CSS', isDone: true,},
        {id: crypto.randomUUID(), title: 'JS/TS', isDone: true,},
        {id: crypto.randomUUID(), title: 'React', isDone: false},
        {id: crypto.randomUUID(), title: 'Redux', isDone: false},
    ])
    const [filter, setFilter] = useState<FilterValuesType>('all')

    // Функции
    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }

    // Функция по созданию задачи
    const addTask = (title: string) => {
        setTasks([...tasks, {id: crypto.randomUUID(), title, isDone: false,}])
    }

    // Функции для фильтра задач по готовности
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

    const changeFilter = (newFilterValue: FilterValuesType) => {
        setFilter(newFilterValue)
    }

    const filteredTasksForRender: Array<TaskType> = getFilteredTasksForRender(tasks, filter)


    return (
        <div className="App">
            <Todolist
                tasks={filteredTasksForRender}
                title={todoListTitle}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />

        </div>
    )
}

export default App;
import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from './Todolist';

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    //BLL
    const todoListTitle: string = 'What to learn'

    // Состояния
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML&CSS', isDone: true,},
        {id: 2, title: 'JS/TS', isDone: true,},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
    ])
    const [filter, setFilter] = useState<FilterValuesType>('all')

    // Функции
    const removeTask = (taskId: number) => {
        setTasks(tasks.filter(t => t.id != taskId))
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

    const changeFilter = (nextFilterValue: FilterValuesType) => {
        setFilter(nextFilterValue)
    }

    const filteredTasksForRender: Array<TaskType> = getFilteredTasksForRender(tasks, filter)

    // UI
    return (
        <div className="App">
            <Todolist
                tasks={filteredTasksForRender}
                title={todoListTitle}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />

        </div>
    )
}

export default App;
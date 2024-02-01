import React, {FC, useState} from 'react';
import {FilterValuesType} from './App';

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (nextFilterValue: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const Todolist: FC<TodoListPropsType> = ({title, tasks, removeTask, changeFilter, addTask, changeTaskStatus}) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')

    // проходим по массиву заданий и рисуем их
    const listItems: Array<JSX.Element> = tasks.map(t => {

        const onClickRemoveTaskHandler = () => removeTask(t.id)
        const onChangeTaskStatusHandler = (e: React.ChangeEvent<HTMLInputElement>) => changeTaskStatus(t.id, e.currentTarget.checked)

        return (
            <li key={t.id}>
                <input
                    onChange={onChangeTaskStatusHandler}
                    type="checkbox"
                    checked={t.isDone}
                />
                <span>{t.title}</span>
                <button onClick={onClickRemoveTaskHandler}>x</button>
            </li>
        )
    })

    // Проверяем наличие заданий и исходя из проверки либо рисуем таски или возвращаем пустой массив
    const tasksList: JSX.Element = tasks.length
        ? <ul>{listItems}</ul>
        : <span>Your taskList is empty</span>


    // Функции
    const onClickAddTask = () => {
        addTask(newTaskTitle)
        setNewTaskTitle('')
    }

    const onChangeSetNewTitle = (e: React.ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.target.value)

    const onKeyDownAddTask = (e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && onClickAddTask()

    const isAddBtnDisabled = !newTaskTitle || newTaskTitle.length >= 15

    const userMessage = newTaskTitle.length < 15
        ? <span>Enter new title</span>
        : <span style={{color: 'red'}}>Your title is too long</span>


    return (
        <div>
            <div className="todolist">
                <h3>{title}</h3>
                <div>
                    <input
                        value={newTaskTitle}
                        onChange={onChangeSetNewTitle}
                        onKeyDown={onKeyDownAddTask}
                    />
                    <button
                        disabled={isAddBtnDisabled}
                        onClick={onClickAddTask}
                    >+
                    </button>
                    <div>
                        {userMessage}
                    </div>
                </div>
                {tasksList}
                <div>
                    <button onClick={() => {
                        changeFilter('all')
                    }}>All
                    </button>
                    <button onClick={() => {
                        changeFilter('active')
                    }}>Active
                    </button>
                    <button onClick={() => {
                        changeFilter('completed')
                    }}>Completed
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Todolist;
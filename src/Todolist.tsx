import React, {FC, useState} from 'react';
import {FilterValuesType} from './App';

type TodoListPropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (todoListId: string, taskId: string) => void
    changeFilter: (todoListId: string, nextFilterValue: FilterValuesType) => void
    addTask: (todoListId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskID: string, isDone: boolean) => void
    removeTodolist: (todolistId: string) => void
    //changeTaskTitle: (todoListId: string, taskID: string, title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const Todolist: FC<TodoListPropsType> = ({
                                             todoListId,
                                             title,
                                             tasks,
                                             filter,
                                             removeTask,
                                             changeFilter,
                                             addTask,
                                             changeTaskStatus,
                                             removeTodolist,
                                             //changeTaskTitle
                                         }) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [inputError, setInputError] = useState(false)



    // проходим по массиву заданий и рисуем их
    const listItems: Array<JSX.Element> = tasks.map(t => {
        const onClickRemoveTaskHandler = () => removeTask(todoListId, t.id)
        const onChangeTaskStatusHandler = (e: React.ChangeEvent<HTMLInputElement>) => changeTaskStatus(todoListId, t.id, e.currentTarget.checked)
        //const onChangeTitleHandler = (newValue: string) => changeTaskTitle(todoListId, t.id, newValue)

        return (
            <li key={t.id}>
                <input
                    onChange={onChangeTaskStatusHandler}
                    type="checkbox"
                    checked={t.isDone}
                />
                <span className={t.isDone ? 'task-done' : 'task'}>{t.title}</span>
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
        addTask(todoListId, newTaskTitle)
        setNewTaskTitle('')
    }

    const onChangeSetNewTaskTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const trimmedTitle = e.target.value.trim()
        if (trimmedTitle || e.target.value.length === 0) {
            inputError && setInputError(false)
            setNewTaskTitle(trimmedTitle)
        } else {
            setInputError(true)
        }
    }

    const onKeyDownAddTask = (e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && onClickAddTask()
    const isAddBtnDisabled = !newTaskTitle || newTaskTitle.length >= 15

    const userMessage = inputError
        ? <span style={{color: 'red'}}>Your title is too empty</span>
        : newTaskTitle.length < 15
            ? <span>Enter new title</span>
            : <span style={{color: 'red'}}>Your title is too long</span>

    const removeTodolistHandler = () => removeTodolist(todoListId)


    return (
        <div>
            <div className="todolist">
                <h3>
                    {title}
                    <button onClick={removeTodolistHandler}>x</button>
                </h3>
                <div>
                    <input
                        className={inputError ? 'input-error' : undefined}
                        value={newTaskTitle}
                        onChange={onChangeSetNewTaskTitle}
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
                    <button
                        className={filter === 'all' ? 'btn-active' : undefined}
                        onClick={() => {
                            changeFilter(todoListId, 'all')
                        }}
                    >All
                    </button>
                    <button
                        className={filter === 'active' ? 'btn-active' : undefined}
                        onClick={() => {
                            changeFilter(todoListId, 'active')
                        }}
                    >Active
                    </button>
                    <button
                        className={filter === 'completed' ? 'btn-active' : undefined}
                        onClick={() => {
                            changeFilter(todoListId, 'completed')
                        }}
                    >Completed
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Todolist;
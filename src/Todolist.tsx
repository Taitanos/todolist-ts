import React, {FC} from 'react';
import {FilterValuesType} from './App';
import AddItemForm from './AddItemForm';

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
    const removeTodolistHandler = () => removeTodolist(todoListId)

    const addTaskHandler = (newTaskTitle:string) => {
        addTask(todoListId, newTaskTitle)
    }

    return (
        <div>
            <div className="todolist">
                <h3>
                    {title}
                    <button onClick={removeTodolistHandler}>x</button>
                </h3>
                <AddItemForm onClick={addTaskHandler}/>
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
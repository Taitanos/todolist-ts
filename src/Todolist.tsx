import React, {FC} from 'react';
import {FilterValuesType} from './App';

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (nextFilterValue: FilterValuesType) => void
    addTask: (title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const Todolist: FC<TodoListPropsType> = ({title, tasks, removeTask, changeFilter, addTask}) => {


    // проходим по массиву заданий и рисуем их
    const listItems: Array<JSX.Element> = tasks.map(t => {

        const onClickRemoveTaskHandler = () => removeTask(t.id)

        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={onClickRemoveTaskHandler}>x</button>
            </li>
        )
    })

    // Проверяем наличие заданий и исходя из проверки либо рисуем таски или возвращаем пустой массив
    const tasksList: JSX.Element = tasks.length
        ? <ul>{listItems}</ul>
        : <span>Your taskList is empty</span>


    return (
        <div>
            <div className="todolist">
                <h3>{title}</h3>
                <div>
                    <input/>
                    <button onClick={() => addTask("New task")}>+</button>
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
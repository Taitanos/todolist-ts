import React, {FC} from 'react';
import {FilterValues} from './App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import SuperCheckBox from './components/SuperCheckBox';


type TodoListProps = {
    todoListId: string
    title: string
    tasks: Array<Task>
    filter: FilterValues
    removeTask: (todoListId: string, taskId: string) => void
    changeFilter: (todoListId: string, nextFilterValue: FilterValues) => void
    addTask: (todoListId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskID: string, isDone: boolean) => void
    removeTodolist: (todolistId: string) => void
    updateTask: (todoListsId:string, taskId:string, newTitle: string) => void
    updateTodoList: (todoListsId:string, title: string) => void
}

export type Task = {
    id: string
    title: string
    isDone: boolean
}

const Todolist: FC<TodoListProps> = ({
                                             todoListId,
                                             title,
                                             tasks,
                                             filter,
                                             removeTask,
                                             changeFilter,
                                             addTask,
                                             changeTaskStatus,
                                             updateTask,
                                             removeTodolist,
                                             updateTodoList,
                                         }) => {

    // Функции
    const removeTodolistHandler = () => removeTodolist(todoListId)

    const addTaskHandler = (newTaskTitle:string) => {
        addTask(todoListId, newTaskTitle)
    }
    const updateTodoListHandler = (newTitle: string) => {
        updateTodoList(todoListId, newTitle)
    }
    const updateTaskHandler = (tId: string, newTitle: string) => {
        updateTask(todoListId, tId , newTitle)
    }

    const onChangeTaskStatusHandler = (tId: string, isDone: boolean ) => {
        changeTaskStatus(todoListId, tId, isDone)
    }

    const onAllClickHandler = () => changeFilter(todoListId, 'all')
    const onActiveClickHandler = () => changeFilter(todoListId, 'active')
    const onCompletedClickHandler = () => changeFilter(todoListId, 'completed')

    // проходим по массиву заданий и рисуем их
    const listItems: Array<JSX.Element> = tasks.map(t => {
        const onClickRemoveTaskHandler = () => removeTask(todoListId, t.id)

        return (
            <li key={t.id} className={t.isDone ? 'task-done' : 'task'}>
                <SuperCheckBox isDone={t.isDone} changeTaskStatus={(isDone) => onChangeTaskStatusHandler(t.id, isDone)}/>
                <EditableSpan title={t.title} onClick={(title) => updateTaskHandler(t.id, title)}></EditableSpan>
                <IconButton onClick={onClickRemoveTaskHandler} aria-label="delete"><DeleteIcon /></IconButton>
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
                <h3>
                    <EditableSpan title={title} onClick={updateTodoListHandler}></EditableSpan>
                    <IconButton onClick={removeTodolistHandler} aria-label="delete"><DeleteIcon /></IconButton>
                </h3>
                <AddItemForm onClick={addTaskHandler}/>
                {tasksList}
                <div>
                    <Button variant={filter === 'all' ? "contained" : "outlined"} size={"small"} onClick={onAllClickHandler} style={{margin: "5px"}}>
                        All
                    </Button>
                    <Button variant={filter === 'active' ? "contained" : "outlined"} size={"small"} onClick={onActiveClickHandler} style={{margin: "5px"}}>
                        Active
                    </Button>
                    <Button variant={filter === 'completed' ? "contained" : "outlined"} size={"small"} onClick={onCompletedClickHandler} style={{margin: "5px"}}>
                        Completed
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Todolist;
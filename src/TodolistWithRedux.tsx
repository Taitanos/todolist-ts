import React, {FC} from 'react';
import {FilterValues} from './App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import SuperCheckBox from './components/SuperCheckBox';
import {TasksStatusType, TodoListsType} from './App';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {addTasksAC, changeTaskStatusAC, removeTasksAC, updateTaskTitleAC} from './state/tasks-reducer';
import {changeFilterAC, removeTodolistAC, updateTodoListTitleAC} from './state/todolist-reducer';


type TodoListProps = {
    todoList: TodoListsType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodolistWithRedux: FC<TodoListProps> = ({todoList}) => {

    const {id, title, filter} = todoList

    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id])

    const dispatch = useDispatch()

    // Функции
    const removeTodolistHandler = () => dispatch(removeTodolistAC(id))

    const addTaskHandler = (newTaskTitle:string) => {
        dispatch(addTasksAC(id, newTaskTitle))
    }
    const updateTodoListHandler = (newTitle: string) => {
        dispatch(updateTodoListTitleAC(id, newTitle))
    }
    const updateTaskHandler = (taskId: string, newTitle: string) => {
        dispatch(updateTaskTitleAC(id, taskId, newTitle))
    }

    const onChangeTaskStatusHandler = (taskId: string, isDone: boolean ) => {
        dispatch(changeTaskStatusAC(id, taskId, isDone))
    }

    const onAllClickHandler = () => dispatch(changeFilterAC(id, 'all'))
    const onActiveClickHandler = () => dispatch(changeFilterAC(id, 'active'))
    const onCompletedClickHandler = () => dispatch(changeFilterAC(id, 'completed'))

    if (filter === 'active') {
        tasks = tasks.filter(t => !t.isDone);
    }
    if (filter === 'completed') {
        tasks = tasks.filter(t => t.isDone);
    }

    // проходим по массиву заданий и рисуем их
    const listItems: Array<JSX.Element> = tasks.map(t => {
        const onClickRemoveTaskHandler = () => dispatch(removeTasksAC(id, t.id))

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

export default TodolistWithRedux;
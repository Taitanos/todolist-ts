import React from 'react';
import './App.css';
import Todolist, {TaskType} from './Todolist';



function App() {
    //BLL
    const todoListTitle_1: string = "What to learn"
    const todoListTitle_2: string = "What to buy"
    const tasks_1: Array<TaskType> = [
        {id: 1, title: "HTML&CSS", isDone: true,},
        {id: 2, title: "JS/TS", isDone: true,},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "Redux", isDone: false},
    ]
    const tasks_2: Array<TaskType> = [
        {id: 5, title: "Bread", isDone: true,},
        {id: 6, title: "Chocolate", isDone: false,},
        {id: 7, title: "Tea", isDone: true},
        {id: 8, title: "Coffee", isDone: false},
    ]


    // UI
    return (
        <div className="App">
            <Todolist
                tasks={tasks_1}
                title={todoListTitle_1}
            />
            <Todolist
                tasks={tasks_2}
                title={todoListTitle_2}
            />
        </div>
    )
}

export default App;

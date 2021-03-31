import React, {useState} from 'react';
import './App.css';
import {TodoList} from './components/TodoList';
import {v1} from 'uuid';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterType = 'all' | 'active' | 'completed'
export type TodoListType = {
    id: string
    title: string
    filter: FilterType
}
export type TasksType = {
    [key: string]: Array<TaskType>
}

function App() {
    const todoListsID_1 = v1()
    const todoListsID_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListsID_1, title: 'what to learn', filter: 'all'},
        {id: todoListsID_2, title: 'what to buy', filter: 'active'}
    ])
    const [tasks, setTasks] = useState<TasksType>({
            [todoListsID_1]: [
                {
                    id: v1(),
                    title: 'learn React',
                    isDone: true
                },
                {
                    id: v1(),
                    title: 'learn native JS',
                    isDone: false
                },
                {
                    id: v1(),
                    title: 'learn typeScript',
                    isDone: true
                }
            ],
            [todoListsID_2]: [
                {
                    id: v1(),
                    title: 'milk',
                    isDone: true
                },
                {
                    id: v1(),
                    title: 'egs',
                    isDone: false
                },
            ]
        }
    )

    const getTodoFilterList = (todoList:TodoListType):Array<TaskType> => {
        switch (todoList.filter) {
            case 'active':
                return tasks[todoList.id].filter(e => e.isDone === false)
            case 'completed':
                return tasks[todoList.id].filter(e => e.isDone === true)
            default:
                return tasks[todoList.id]
        }
    }

    const changeTodoListFilter = (newFilterValue: FilterType,todoListID:string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl,filter:newFilterValue} : tl))
    }

    const addTask = (title: string,todoListID:string) => {
        const newTask: TaskType = {
            id: v1(),
            title,
            isDone: false
        }
        setTasks({...tasks,[todoListID]:[newTask,...tasks[todoListID]]})
    }

    const removeTask = (id: string,todoListID:string) => {
        tasks[todoListID] = tasks[todoListID].filter(i => i.id !== id)
        setTasks({...tasks})
    }

    const changeTaskStatus = (taskId: string, status: boolean,todoListID:string) => {
        const task = tasks[todoListID].find(t => t.id === taskId)
        if (task) {
            task.isDone = status
        }
        setTasks({...tasks})
    }

    const removeTodoList = (id:string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== id))
        delete tasks[id]
    }

    return (
        <div className="App">
            {
                todoLists.map(tl =>{
                        return <TodoList key={tl.id} id={tl.id} title={tl.title} tasks={getTodoFilterList(tl)} changeTodoListFilter={changeTodoListFilter}
                                  removeTask={removeTask} removeTodoList={removeTodoList} addTask={addTask} filter={tl.filter} changeTaskStatus={changeTaskStatus}/>
                }
                )
            }
        </div>
    );
}

export default App;


import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType, TaskType} from '../App';


type TodoListPropsType = {
    id:string
    title: string
    tasks: Array<TaskType>
    changeTodoListFilter: (newFilterValue: FilterType,todoListID:string) => void
    removeTask: (id: string,todoListID:string) => void
    addTask: (title: string,todoListID:string) => void
    filter : FilterType
    changeTaskStatus:(taskId:string, status:boolean,todoListID:string) => void
    removeTodoList:(id:string) => void
}

export function TodoList(props: TodoListPropsType) {
    const [inputTitle, setInputTitle] = useState<string>('')
    const [error,setError] = useState<boolean>(false)

    const addTask = () => {
        if(inputTitle.trim()){
            props.addTask(inputTitle.trim(),props.id)
            setInputTitle('')
        } else {
            setError(true)
        }
    }
    const onInputTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setInputTitle(e.currentTarget.value)
    }
    const onAllHandler = () => props.changeTodoListFilter('all',props.id)
    const onActiveHandler = () => props.changeTodoListFilter('active',props.id)
    const onCompletedHandler = () => props.changeTodoListFilter('completed',props.id)
    const onInputTitleKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            addTask()
        }
    }

    const tasks = props.tasks.map(t => {
        const removeTaskHandler = () => props.removeTask(t.id,props.id)
        const changeStatus = (e:ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked,props.id)
        return (
            <li key={t.id}><input type="checkbox" checked={t.isDone} onChange={(e)=>changeStatus(e)}/>
                <span>{t.title}</span>
                <button onClick={removeTaskHandler}>x</button>
            </li>
        )
    })

    return (
        <div>
            <h3>{props.title}<button onClick={()=>props.removeTodoList(props.id)}>x</button></h3>
            <div>
                <input className={error? 'error': ''} value={inputTitle} onChange={onInputTitleChangeHandler} onKeyPress={onInputTitleKeyPressHandler}/>
                <button onClick={addTask}>+</button>
                {error && <div className={'error-message'}>Введите таску</div>}
            </div>
            <ul>
                {tasks}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllHandler}>All</button>
                <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveHandler}>Active</button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={onCompletedHandler}>Completed</button>
            </div>
        </div>
    )
}
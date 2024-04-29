import React, { useEffect, useRef, useState } from 'react'
import './to-do.css'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"


function ToDo() {

    const [task, setTask] = useState([])
    const [newtasks, setNewTasks] = useState("");
    const [isCompleted, setisCompleted] = useState(false)
    const button = useRef(null)

    useEffect(() => {

        const onKeypress = (event) => {
            if (event.key == 'Enter') {
                setNewTasks(button.current.value)
                addTOdo()
            }
        }
        button.current.addEventListener('keypress', onKeypress)
        return () => {
            button.current.removeEventListener('keypress', onKeypress);
        };

    }, [newtasks])

    function addTOdo() {
        if (newtasks.trim() !== '') {
            setTask((t => [...t, newtasks]))
        }
    }


    function getTaask(e) {
        setNewTasks(e.target.value)
    }

    useEffect(() => {
        const storedTasks = localStorage.getItem('mytask');
        if (storedTasks) {
            setTask(JSON.parse(storedTasks));
            console.log(storedTasks);
        }
    }, [])

    function addTask() {
        if (newtasks.trim() !== "") {
            localStorage.setItem('mytask', JSON.stringify([...task, newtasks]))
            setTask(t => [...t, newtasks])
            setNewTasks(" ")
        } else {
            toast.error('please add a task !')
        }
    }

    function completeTask(e) {
        e.target.className = isCompleted ? 'completed' : null
        setisCompleted(!isCompleted)

    }

    function moveUp(index) {
        const updatedTask = [...task]
        if (index > 0) {
            [updatedTask[index], updatedTask[index - 1]] = [updatedTask[index - 1], updatedTask[index]]
            setTask(updatedTask)
        }
    }

    function moveDown(index) {
        const updatedTask = [...task]
        if (index < task.length - 1) {
            [updatedTask[index], updatedTask[index + 1]] = [updatedTask[index + 1], updatedTask[index]]
            setTask(updatedTask)
        }
    }

    function deleteTask(index) {
        const filteredTask = task.filter((_, i) => i !== index);
        setTask(filteredTask);
        localStorage.setItem('mytask', JSON.stringify(filteredTask));
    }


    return (
        <div className="container">
            <div className='to-do-list'>
                <h2 className='text'>To-Do List</h2>
                <div className='task-manage'>
                    <input value={newtasks} ref={button} onChange={getTaask} className='input' type="text" placeholder='enter a task...' />
                    <button onClick={addTask} className='addButton'>add task</button>
                </div>
                <div >
                    <ul>
                        {
                            task.map((tasks, i) => {
                                return (
                                    <div key={i} className="task-list"><li onClick={completeTask} ><span>{tasks}</span > </li><div className='buttons'><button onClick={() => deleteTask(i)}> delete</button> <button onClick={() => moveUp(i)}>👆</button> <button onClick={() => moveDown(i)}>👇</button> </div></div>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ToDo

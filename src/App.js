import React from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

// const TASKS = [
//   {
//     id: 1,
//     title: 'Mow the lawn',
//     isComplete: false,
//   },
//   {
//     id: 2,
//     title: 'Cook Pasta',
//     isComplete: true,
//   },
// ];

const API = 'https://task-list-api-c17.onrender.com/'; 



const App = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    axios.get(`${API}/tasks`)
    .then((result) => {
      setTasks(result.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);

  const toggleComplete = (id, isComplete) => {
    const toggle = isComplete ? 'mark_incomplete' : 'mark_complete';
    axios.patch(`${API}/tasks/${id}/${toggle}`)
      .then((result) => {
        console.log(result.data)
        const newTasks = tasks.map((task) => {
          console.log(task)
          if (task.id !== id) {
            return {...task};
          } else {
            const updatedTask = { ...task}; 
            updatedTask.is_complete = !updatedTask.is_complete;
            return updatedTask;
          }
          
        });
        setTasks(newTasks);
      })
      .catch((err) => {
        console.log(err);
      });
    };


  const deleteTask = (id) => {
    axios
    .delete(`${API}/${id}`)
    .then((result) => {
      const newTasks = tasks.filter((task) => task.id !== id);
      setTasks(newTasks);
    })
    .catch((err) => {
      console.log(err);
    });
    };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>{<TaskList tasks={tasks} toggleComplete={toggleComplete} deleteTask={deleteTask}/>}</div>
      </main>
    </div>
  );
};

export default App;

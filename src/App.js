import Form from './components/Form';
import FilterButton from './components/FilterButton';
import Todo from './components/Todo';
import React, { useState } from 'react';
import { nanoid } from 'nanoid';

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed
}

const FILTER_NAME = Object.keys(FILTER_MAP);

const App = (props) => {

  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');

  const filterList = FILTER_NAME.map(name => (
    <FilterButton
      key={name}
      name={name}
      setFilter={setFilter} />
  ));

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map(task => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask} />
    ));

  function addTask(name) {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
  }

  function deleteTask(id){
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    console.log(updatedTasks);
    setTasks(updatedTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
      if (id === task.id){
        return {...task, name: newName};
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  const headingNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${headingNoun} remaining`;

  return (
    <div className="todoapp stack-large">
      <h1>Todo Matic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exeption">
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div>

      <h2 id='list-heading'>{headingText}</h2>

      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>

  )
}

export default App


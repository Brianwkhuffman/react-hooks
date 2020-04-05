import React, { useState } from 'react';
import './App.css'

function Todo({todo, index, completeTodo, removeTodo}){
  //these are coming in as props from render below

  // console.log('todo:', todo);
  // console.log('index:', index);
  return(
    <div style={{textDecoration: todo.isCompleted ? 'line-through' : ''}} className="todo">
      {todo.text}
      <div>
        <button onClick={() => completeTodo(index)}>Complete</button>
        <button onClick={() => removeTodo(index)}>x</button>
      </div>
    </div>
  )
};

function TodoForm({addTodo}) {
  const [value, setValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if(!value) return;
    addTodo(value);
    setValue('');
    }

  return(
    <form onSubmit={handleSubmit} >
      <input
        type='text'
        className='input'
        value={value}
        placeholder="Add ToDo.."
        onChange={e => setValue(e.target.value)}
        />
    </form>
  )
};

function App() {
  const [todos, setTodos] = useState([
    {
      text: "Lean react hooks",
      isCompleted: false
    },
    {
      text: "Brush mewmew",
      isCompleted: false
    },
    {
      text: "Date with love",
      isCompleted: false
    }
  ]);
  
  const addTodo = text => {
    const newTodos = [...todos, {text}];
    setTodos(newTodos);
  };
  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };
  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return(
  <div className="app">
    <div className="todo-list">
      {todos.map((todo, index) => {
        return (
          <Todo key={index}
          index={index}
          todo={todo}
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          />
        )
      })}
      <TodoForm addTodo={addTodo}/>
    </div>
  </div> 
  )
};

export default App;
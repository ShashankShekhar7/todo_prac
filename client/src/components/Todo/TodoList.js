import React, { useState, useEffect } from 'react';
import { todoAPI } from '../../services/api';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await todoAPI.getTodos();
      setTodos(response.data);
    } catch (error) {
      setError('Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (todoData) => {
    try {
      const response = await todoAPI.createTodo(todoData);
      setTodos([response.data, ...todos]);
    } catch (error) {
      setError('Failed to create todo');
    }
  };

  const handleUpdateTodo = async (id, updateData) => {
    try {
      const response = await todoAPI.updateTodo(id, updateData);
      setTodos(todos.map(todo => 
        todo._id === id ? response.data : todo
      ));
    } catch (error) {
      setError('Failed to update todo');
    }
  };

  const handleDeleteTodo = async (id) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      try {
        await todoAPI.deleteTodo(id);
        setTodos(todos.filter(todo => todo._id !== id));
      } catch (error) {
        setError('Failed to delete todo');
      }
    }
  };

  if (loading) return <div>Loading todos...</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
      <h2>My Todos</h2>
      
      {error && (
        <div style={{ 
          color: 'red', 
          marginBottom: '1rem',
          padding: '0.5rem',
          border: '1px solid red',
          borderRadius: '4px',
          backgroundColor: '#ffe6e6'
        }}>
          {error}
        </div>
      )}

      <TodoForm onSubmit={handleAddTodo} />

      {todos.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666' }}>
          No todos yet. Create your first todo above!
        </p>
      ) : (
        <div>
          {todos.map(todo => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onUpdate={handleUpdateTodo}
              onDelete={handleDeleteTodo}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;

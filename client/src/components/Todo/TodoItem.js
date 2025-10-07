import React, { useState } from 'react';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: todo.title,
    description: todo.description || ''
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(todo._id, editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      title: todo.title,
      description: todo.description || ''
    });
    setIsEditing(false);
  };

  const handleComplete = () => {
    onUpdate(todo._id, { completed: !todo.completed });
  };

  const todoStyle = {
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '1rem',
    marginBottom: '1rem',
    backgroundColor: todo.completed ? '#f8f9fa' : 'white'
  };

  const titleStyle = {
    textDecoration: todo.completed ? 'line-through' : 'none',
    color: todo.completed ? '#6c757d' : 'black',
    margin: '0 0 0.5rem 0'
  };

  if (isEditing) {
    return (
      <div style={todoStyle}>
        <input
          type="text"
          value={editData.title}
          onChange={(e) => setEditData({ ...editData, title: e.target.value })}
          style={{ 
            width: '100%', 
            marginBottom: '0.5rem', 
            padding: '0.5rem',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
        />
        <textarea
          value={editData.description}
          onChange={(e) => setEditData({ ...editData, description: e.target.value })}
          rows="2"
          style={{ 
            width: '100%', 
            marginBottom: '0.5rem', 
            padding: '0.5rem',
            border: '1px solid #ddd',
            borderRadius: '4px',
            resize: 'vertical'
          }}
        />
        <div>
          <button 
            onClick={handleSave}
            style={{ 
              marginRight: '0.5rem', 
              padding: '0.25rem 0.75rem',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px'
            }}
          >
            Save
          </button>
          <button 
            onClick={handleCancel}
            style={{ 
              padding: '0.25rem 0.75rem',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px'
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={todoStyle}>
      <h3 style={titleStyle}>{todo.title}</h3>
      {todo.description && (
        <p style={{ 
          color: todo.completed ? '#6c757d' : '#666',
          margin: '0 0 0.5rem 0'
        }}>
          {todo.description}
        </p>
      )}
      <small style={{ color: '#999' }}>
        Created: {new Date(todo.createdAt).toLocaleDateString()}
      </small>
      
      <div style={{ marginTop: '1rem' }}>
        <button 
          onClick={handleComplete}
          style={{ 
            marginRight: '0.5rem', 
            padding: '0.25rem 0.75rem',
            backgroundColor: todo.completed ? '#ffc107' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          {todo.completed ? 'Mark Incomplete' : 'Mark Complete'}
        </button>
        <button 
          onClick={handleEdit}
          style={{ 
            marginRight: '0.5rem', 
            padding: '0.25rem 0.75rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete(todo._id)}
          style={{ 
            padding: '0.25rem 0.75rem',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;

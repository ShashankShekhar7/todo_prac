import React, { useState } from 'react';

const TodoForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim()) {
      onSubmit(formData);
      setFormData({ title: '', description: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          name="title"
          placeholder="Enter todo title..."
          value={formData.title}
          onChange={handleChange}
          required
          style={{ 
            width: '100%', 
            padding: '0.75rem', 
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
        />
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        <textarea
          name="description"
          placeholder="Enter description (optional)..."
          value={formData.description}
          onChange={handleChange}
          rows="3"
          style={{ 
            width: '100%', 
            padding: '0.75rem', 
            border: '1px solid #ddd',
            borderRadius: '4px',
            resize: 'vertical'
          }}
        />
      </div>
      
      <button 
        type="submit"
        style={{ 
          padding: '0.75rem 1.5rem', 
          backgroundColor: '#007bff', 
          color: 'white', 
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Add Todo
      </button>
    </form>
  );
};

export default TodoForm;

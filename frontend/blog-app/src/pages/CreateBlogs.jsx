import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateBlog() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [src, setSrc] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newBlog = { title, description, author, category, src };
      await axios.post('http://localhost:5000/create-blog', newBlog);
      navigate('/'); 
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  return (
    <div className="container form-container">
      <h1>Create New Blog</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Title</label>
          <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Author</label>
          <input type="text" className="form-control" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </div>
        <div className="mb-3">
            <label>Category</label>
            <input type="text" className="form-control" value={category} onChange={(e) => setCategory(e.target.value)} required />
        </div>
        <div className="mb-3">
            <label>Image URL</label>
            <input type="text" className="form-control" value={src} onChange={(e) => setSrc(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Create Blog</button>
      </form>
    </div>
  );
}

export default CreateBlog;

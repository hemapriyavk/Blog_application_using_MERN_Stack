/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function EditBlog() {
  const { id } = useParams(); // Get blog ID from URL
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [src, setSrc] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/blog/${id}`);
        const { title, description, author, category, src } = response.data;
        setTitle(title);
        setDescription(description);
        setAuthor(author);
        setCategory(category);
        setSrc(src);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch blog');
        console.error(error);
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedBlog = { title, description, author, category, src };
      await axios.put(`${process.env.REACT_APP_API_URL}/blog/${id}`, updatedBlog);
      navigate(`/blog/${id}`); // Redirect back to the blog details page
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container form-container">
      <h1>Edit Blog</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Title</label>
          <input 
          type="text" 
          className="form-control" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <ReactQuill theme="snow" value={description} onChange={setDescription} required />
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
        <button type="submit" className="btn btn-primary">Update Blog</button>
      </form>
    </div>
  );
}

export default EditBlog;

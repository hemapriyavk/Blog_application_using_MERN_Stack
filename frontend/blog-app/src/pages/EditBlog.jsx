// EditBlog.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function EditBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState({
    title: '',
    description: '',
    author: '',
    category: '',
    src: ''
  });
  const navigate = useNavigate();

  // Fetch blog data by ID
  useEffect(() => {
    async function fetchBlog() {
      try {
        const response = await axios.get(`http://localhost:5000/blog/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    }
    fetchBlog();
  }, [id]);

  // Handle form submit for blog update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/blog/${id}`, blog);
      navigate(`/blog/${id}`);
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  return (
    <div className="container form-container">
      <h1>Edit Blog</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={blog.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <ReactQuill
          theme="snow"
          value={blog.description || ''}
          onChange={(value) => setBlog({ ...blog, description: value })}
        />
        </div>
        <div className="mb-3">
          <label>Author</label>
          <input
            type="text"
            className="form-control"
            name="author"
            value={blog.author}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Category</label>
          <input
            type="text"
            className="form-control"
            name="category"
            value={blog.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Image URL</label>
          <input
            type="text"
            className="form-control"
            name="src"
            value={blog.src}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Blog</button>
      </form>
    </div>
  );
}

export default EditBlog;

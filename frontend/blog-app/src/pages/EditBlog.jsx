import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBlog() {
      const response = await axios.get(`http://localhost:5000/blog/${id}`);
      setBlog(response.data);
    }
    fetchBlog();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/blog/${id}`, blog);
      navigate(`/blog/${id}`);
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={blog.title} onChange={(e) => setBlog({ ...blog, title: e.target.value })} />
      <textarea value={blog.description} onChange={(e) => setBlog({ ...blog, description: e.target.value })} />
      {/* Add other inputs */}
      <button type="submit">Update Blog</button>
    </form>
  );
}

export default EditBlog;

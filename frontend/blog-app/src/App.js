import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Landing from './pages/Landing';
import BlogDetails from './pages/BlogDetails';
import CreateBlog from './pages/CreateBlogs';
import EditBlog from './pages/EditBlog';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/edit-blog/:id" element={<EditBlog />} />
      </Routes>
    </Router>
  );
}

export default App;

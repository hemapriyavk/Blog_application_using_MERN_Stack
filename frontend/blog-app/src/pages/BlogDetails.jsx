import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';

function BlogDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        async function fetchBlog() {
            try {
                const response = await axios.get(`http://localhost:5000/blog/${id}`);
                setBlog(response.data);
            } catch (error) {
                console.error("Error fetching blog:", error);
            }
        }
        fetchBlog();
    }, [id]);

    return (
        <div className='blog-details-container'>
            <Button className='home-button' onClick={() => navigate('/')}>
                Home
            </Button>
            {blog ? (
                <div className='blog-details'>
                    <h1>{blog.title}</h1>
                    <div dangerouslySetInnerHTML={{ __html: blog.description }} />
                    <small>{blog.author}</small>
                    <Button className='blog-details-button' onClick={async () => {
                        try {
                            await axios.delete(`http://localhost:5000/blog/${id}`);
                            navigate('/');
                        } catch (error) {
                            console.error("Error deleting blog:", error);
                        }
                    }}>Delete Blog</Button>
                    <Button className='blog-details-button' onClick={() => {
                        navigate(`/edit-blog/${id}`);
                    }}>Edit Blog</Button>
                </div>
            ) : (
                <p>Blog Not Found</p>
            )}
        </div>
    );
}

export default BlogDetails;

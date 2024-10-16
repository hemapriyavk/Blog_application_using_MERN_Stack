import React, { useEffect, useState, useCallback} from 'react';
import axios from 'axios';
import { Navigation } from '../components/Navbar';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FiSearch } from 'react-icons/fi';
import Cards from '../components/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/esm/Button';


function Landing() {
    const [blogs, setBlogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchBlogs = useCallback(async() => {
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/get-all-blogs`, {
                params: {search: searchTerm, page, limit: 10}
            });
            setBlogs(response.data.blogs);
            setTotalPages(Math.ceil(response.data.total/10));
        }catch(err){
            console.error("Error fetching blogs:", err);
        }
    }, [searchTerm, page]);

    useEffect(()=>{
        fetchBlogs();
    }, [fetchBlogs]);

  return (
    <>
    <Navigation />
    <Container fluid className='bg bg-primary h-100 landing_wrapper text-light'>
        <h1>Welcome to HP Blogs</h1>
        <p>Explore number of blogs from various categories!</p>
        <InputGroup className="mb-3 w-50">
            <InputGroup.Text id="basic addon1" className='iconWrapper'>
                <FiSearch />
            </InputGroup.Text>
            <Form.Control type="search" placeholder="Search your blogs here..."
            value={searchTerm}
            onChange={(e)=> setSearchTerm(e.target.value)}
            onKeyPress={(e)=>{
                if(e.key === 'Enter')
                    fetchBlogs();
            }}/>
        </InputGroup>
    </Container>
    <Container>
        <h1 className='text-center m-5'>Latest Blogs</h1>
        <Row xs={1} md={3} className="g-4">
            {blogs.map((item, key) => (
                <Col key={key}>
                    <Cards {...item}/>
                </Col>
            ))}
        </Row>
    </Container>
    <div className="pagination">
        <Button className='pagination-button' onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1}>
            Previous
        </Button>
        <span>Page {page} of {totalPages}</span>
        <Button onClick={() => setPage(prev => (prev < totalPages ? prev + 1 : prev))} disabled={page === totalPages}>
            Next
        </Button>
    </div>
    
    </>
  )
}

export default Landing;

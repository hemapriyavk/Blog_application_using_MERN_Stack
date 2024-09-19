import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export const Navigation = () => {
  return (
    <div>
        <Navbar expand="lg" bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand className='navbar-brand' as={Link} to="/">HP Blogs</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className='navbar-collapse' id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="nav-link" as={Link} to="/">Home</Nav.Link>
            <Nav.Link className="nav-link" as={Link} to="/create-blog">Create Blog</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

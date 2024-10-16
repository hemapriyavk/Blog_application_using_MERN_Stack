import React from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'; 

function getPreviewText(htmlString, wordLimit) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlString;
  const plainText = tempDiv.textContent || tempDiv.innerText || ''; 
  const words = plainText.split(' ');
  const preview = words.slice(0, wordLimit).join(' ');
  return preview + (words.length > wordLimit ? '...' : '');
}

function Cards({_id, src, title, description, category}) {
  return (
    <div className='card'>
        <Card.Img className='card-img' variant="top" src={src} style={{height: '40vh', objectFit:'cover'}}/>
            <Card.Body>
                <Card.Title className='card-title'>{title}</Card.Title>
                <Badge className='badge' bg="primary">{category}</Badge>
                <Card.Text className='card.text'>{getPreviewText(description, 30)}...</Card.Text>
            </Card.Body>
            <Card.Footer className='card-footer'>
              <Link to={`/blog/${_id}`}>
                <Button className='mx-auto d-block'>View More</Button>
              </Link>
            </Card.Footer>
    </div>
  )
}

export default Cards
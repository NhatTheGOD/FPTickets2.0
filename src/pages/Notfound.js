// NotFound.js
import React from 'react';
import { Container } from 'react-bootstrap';
import '../css/NotFound/NotFound.css'

const NotFound = () => {
  return (
    <Container fluid className='fix-nav bg-dark fix-nav'>
      <h1 className='text-center'>404 - Not Found</h1>
      <p className='text-center'>The page you are looking for does not exist.</p>
    </Container>
  );
};

export default NotFound;

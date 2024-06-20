// NotFound.js
import React from 'react';
import { Container } from 'react-bootstrap';
import '../css/NotFound/NotFound.css'

const NotFound = () => {
  return (
    <Container fluid className='p-4 text-center text-white bg-dark'>
      <img style={{width: "50%"}} src='./images/error.png'/>
      <p>Xin lỗi, trang này không tồn tại!</p>
      <p>Không có nội dung ở trang này. Vui lòng thử lại ở đường link khác!</p>
    </Container>
  );
};

export default NotFound;

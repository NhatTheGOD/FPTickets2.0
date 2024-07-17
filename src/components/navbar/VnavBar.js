import React, { useState } from 'react';
import { Button, Container, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHome, FaFilm, FaLandmark, FaUsers, FaPizzaSlice, FaTags } from 'react-icons/fa';

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState('home');

  const handleSetActiveTab = (tab) => {
    setActiveTab(tab);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <Container fluid>
      <h1>Welcome Admin</h1>
      <img style={{width : '100px'}} src='/images/logo2.png' alt='logo'/>
      <hr />
      <Nav className="flex-column" variant="pills" activeKey={activeTab}>
        <NavItem>
          <Nav.Link
            as={Link}
            to="/"
            eventKey="home"
            onClick={() => handleSetActiveTab('home')}
          >
            <FaHome /> Home
          </Nav.Link>
        </NavItem>
        <NavItem>
          <Nav.Link
            as={Link}
            to="/admin/movies"
            eventKey="movies"
            onClick={() => handleSetActiveTab('movies')}
          >
            <FaFilm /> Movies
          </Nav.Link>
        </NavItem>
        <NavItem>
          <Nav.Link
            as={Link}
            to="/admin/theaters"
            eventKey="theaters"
            onClick={() => handleSetActiveTab('theaters')}
          >
            <FaLandmark /> Theaters
          </Nav.Link>
        </NavItem>
        <NavItem>
          <Nav.Link
            as={Link}
            to="/admin/users"
            eventKey="users"
            onClick={() => handleSetActiveTab('users')}
          >
            <FaUsers /> Users
          </Nav.Link>
        </NavItem>
        <NavItem>
          <Nav.Link
            as={Link}
            to="/admin/foods"
            eventKey="foods"
            onClick={() => handleSetActiveTab('foods')}
          >
            <FaPizzaSlice /> Foods
          </Nav.Link>
        </NavItem>
        <Button onClick={handleLogout} variant='danger' className="mt-3">Log Out</Button>
      </Nav>
    </Container>
  );
};

export default Sidebar;

import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { FaTicket } from "react-icons/fa6";
import '../../css/navbar/NavBar.css'
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const NavBar = () => {



    const handleLoggout = () => {
        localStorage.removeItem('role')
        localStorage.removeItem('userLogged')
        window.location.href = '/'
    }


    return (
        localStorage.getItem('role') === 'admin' ?
            (<Container fluid className="border-bottom-custom container-all bg-dark nav-top">
                <Container>
                    <Navbar bg="dark" variant="dark" expand="lg">
                        <Navbar.Brand href="/">
                            <img
                                width="100"
                                height="100"
                                className="d-inline-block align-top"
                                src="./images/logo2.png"
                                alt="logo"
                            />
                        </Navbar.Brand>
                        <h5 className="pt-2 text-center text-white">Welcome back <span className="text-success">ADMIN</span> </h5>
                        <Button onClick={handleLoggout} className="transparent-button">Logout</Button>
                    </Navbar>
                </Container>
            </Container>) :
            (
                <Container fluid className="border-bottom-custom container-all bg-dark nav-top">
                    <Container>
                        <Navbar bg="dark" variant="dark" expand="lg">
                            <Navbar.Brand href="/">
                                <img
                                    width="100"
                                    height="100"
                                    className="d-inline-block align-top"
                                    src="/images/logo2.png"
                                    alt="logo"
                                />
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mr-auto">
                                    {
                                        localStorage.getItem('role') === "user" ? <Nav.Link href="/yourtickets">Your Tickets</Nav.Link>:null
                                    }
                                    <Nav.Link href="/theater">Hệ thống rạp</Nav.Link>
                                    <Nav.Link href="/promo">Khuyến Mãi/ Sự kiện</Nav.Link>
                                    <Nav.Link href="/shop">Cửa hàng</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                            {
                                localStorage.getItem('role') === "user" ?
                                    <div>
                                        <h5 className="pt-2 text-center text-white">Welcome back:
                                            <Link to='/userDetail' style={{ textDecoration: 'none' }}>
                                                <span className="text-success">{JSON.parse(localStorage.getItem('userLogged')).firstName.toUpperCase()}</span>
                                            </Link>
                                        </h5>
                                        <div>
                                            <span className="text-white">
                                                {/* <img className="m-2" width={'70px'}alt="Membership" /> */}
                                            </span>
                                            <Button onClick={handleLoggout} className="transparent-button">Logout</Button>
                                        </div>
                                    </div>
                                    :
                                    <div className="d-none d-sm-block">
                                        <Link to='/login' className="btn btn-success transparent-button m-4">Đăng nhập/ Đăng ký</Link>
                                        <Button variant="success">
                                            <FaTicket />
                                            Mua vé
                                        </Button>
                                    </div>
                            }
                        </Navbar>
                    </Container>
                </Container>
            )
    );
};

export default NavBar;

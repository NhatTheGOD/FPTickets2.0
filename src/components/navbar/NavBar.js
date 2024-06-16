import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { FaTicket } from "react-icons/fa6";
import '../../css/navbar/NavBar.css'

const NavBar = () => {
   
    return (
        <Container fluid className= "bg-dark position-fixed top-0">
            <Container>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Navbar.Brand href="#home">
                        <img width="100"
                            height="100"
                            className="d-inline-block align-top" src="./images/logo2.png" alt="logo" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#home">Lịch chiếu</Nav.Link>
                            <Nav.Link href="#about">Hệ thống rạp</Nav.Link>
                            <Nav.Link href="#contact">Khuyến Mãi/ Sự kiện</Nav.Link>
                            <Nav.Link href="#contact">Cửa hàng</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <div className="d-none d-sm-block ">
                    <Button className="transparent-button m-4">Đăng nhập/ Đăng ký</Button>
                    <Button variant="success">
                        <FaTicket />
                        Mua vé
                    </Button>
                    </div>  
                </Navbar>
            </Container>
        </Container>
    );
}

export default NavBar;

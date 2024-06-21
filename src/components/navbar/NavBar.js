import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { FaTicket } from "react-icons/fa6";
import '../../css/navbar/NavBar.css'

const NavBar = () => {
   
    return (
        <Container fluid className= "container-all bg-dark nav-top">
            <Container>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Navbar.Brand href="/">
                        <img width="100"
                            height="100"
                            className="d-inline-block align-top" src="./images/logo2.png" alt="logo" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/showtime">Lịch chiếu</Nav.Link>
                            <Nav.Link href="/theater">Hệ thống rạp</Nav.Link>
                            <Nav.Link href="/promo">Khuyến Mãi/ Sự kiện</Nav.Link>
                            <Nav.Link href="/shop">Cửa hàng</Nav.Link>
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

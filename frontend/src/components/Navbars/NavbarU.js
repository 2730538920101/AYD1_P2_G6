import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavbarU = () => { 

    return (
        <>
          <Navbar bg="dark" variant="dark">
            <Container> 
              <Nav className="me-auto  mx-auto">
                <Nav.Link href="/Peliculas" style={{ color: 'white' }}>Películas</Nav.Link>
                <Nav.Link href="/WatchList" style={{ color: 'white' }}>WatchList</Nav.Link>
                <Nav.Link href="/" style={{ color: 'white' }}>Cerrar Sesión</Nav.Link>
              </Nav>
            </Container>
          </Navbar> 
        </>
    )
}

export default NavbarU
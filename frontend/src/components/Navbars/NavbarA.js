import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function ColorSchemesExample() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container> 
          <Nav className="me-auto  mx-auto">
            <Nav.Link href="/NuevaPelicula">Nueva Película</Nav.Link>
            <Nav.Link href="/NuevoActor">Nuevo Actor</Nav.Link>
            <Nav.Link href="/">Cerrar Sesión</Nav.Link>
          </Nav>
        </Container>
      </Navbar> 
    </>
  );
}

export default ColorSchemesExample;

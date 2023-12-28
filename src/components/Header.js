import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Header =(props)=>{

  const {user}=useContext(UserContext);
  const {logout}=useContext(UserContext);

  const navigate=useNavigate();

  const handleLogout =()=>{
    logout();
    navigate("/");

  }
    return (<>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">Home</NavLink>
            <NavLink to="/" className="nav-link">Link</NavLink>
          </Nav>

          <Nav>
            {user && user.email && <span className='nav-link'>Welcome {user.email} </span>}
            <NavDropdown title="setting">
              {user &&user.auth==true
                ? <NavDropdown.Item onClick={()=> handleLogout()}>Logout</NavDropdown.Item>
                : <NavLink to="/login" className="dropdown-item">Login</NavLink>
              }
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>)
}
export default Header;
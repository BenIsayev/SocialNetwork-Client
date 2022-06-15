import { useContext } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import { NavLink } from 'react-router-dom'

import classes from './NavBar.module.css'
import { AuthContext } from '../context/auth'

const NavBar = () => {

    const { user, logout } = useContext(AuthContext)

    return (<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
            <NavLink to="/" className="navbar-brand" title={user ? 'Home page' : ''}>{user ? user.username : 'Home'}</NavLink>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    {/* <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link> */}
                </Nav>
                <Nav>
                    {user ? <button className={`nav-link ${classes['logout-btn']}`} onClick={logout}>Logout</button> : <NavLink to="/login" className="nav-link">Login</NavLink>}
                    {!user && <NavLink to="/register" className="nav-link">Register</NavLink>}
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar >
    )
}

export default NavBar
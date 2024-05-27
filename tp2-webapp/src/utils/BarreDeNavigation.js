import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';

const BarreDeNavigation = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return (
        <Navbar bg="light" expand="sm" className="shadow-sm">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Accueil</Nav.Link>
                        {isAuthenticated ? (
                            <>
                                <Nav.Link as={Button} onClick={() => logout({ returnTo: window.location.origin })}>Se déconnecter</Nav.Link>
                            </>
                        ) : (
                            <Nav.Link as={Button} onClick={() => loginWithRedirect()}>Se connecter</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
export default BarreDeNavigation;
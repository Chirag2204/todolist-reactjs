import React from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from 'react-redux'
import { logout } from "../actions/userActions";
import '../style.css'

const Header = () => {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()
    const logoutHandler = () => {
        dispatch(logout())
    }

    const setTitle = (name) => {
        return (
            <div>
                <i class="fas fa-user-circle"></i> {name}
            </div>
        )
    }

    return (
        <header>
            <Navbar bg="primary" variant="dark" expand="lg" collapeOnSelect>
                <Container>

                    <LinkContainer to="/">
                        <Navbar.Brand className="brandName"><i class="fas fa-paste"></i>TodoList</Navbar.Brand>

                    </LinkContainer>


                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className='navbar-items' >

                        <Nav>
                            {userInfo ?
                                (


                                    <NavDropdown title={setTitle(userInfo.name)} >

                                        <NavDropdown.Item onClick={logoutHandler}>LogOut</NavDropdown.Item>
                                    </NavDropdown>


                                )
                                : (<>
                                    {/* <p>Helloo entered here</p> */}
                                    <LinkContainer to="/login">
                                        <Nav.Link ><i class="fas fa-sign-in-alt"></i>Login</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/register">
                                        <Nav.Link to="/register"><i className="fas fa-user"></i>Register</Nav.Link>
                                    </LinkContainer>
                                </>)
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header >
    )
}

export default Header;

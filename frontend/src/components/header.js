import React, { useState } from 'react';
import { Container, Navbar, Nav, Form, Button, Modal } from 'react-bootstrap'; // Make sure to import Nav here
import { Link } from 'react-router-dom';
import './header.css';
import logoImage from '../assets/images/logo-icon.png';

export default function AppHeader() {
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        if (!searchTerm.trim()) return; // Avoid searching for empty string

        const apiUrl = `/api/search?term=${encodeURIComponent(searchTerm)}`;
    
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setSearchResults(data);
            setShowModal(true);
        } catch (error) {
            console.error('Error during fetch:', error);
            setSearchResults([]);
        }
    };
    
    const handleCloseModal = () => setShowModal(false);

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img src={logoImage} alt="Logo" className="logo-image" />
                        WanderLogixs
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/trips">Trips</Nav.Link>
                            <Nav.Link as={Link} to="/expenses">Expenses</Nav.Link>
                            <Nav.Link as={Link} to="/itinerary">Itinerary</Nav.Link>
                            <Nav.Link as={Link} to="/media">Media</Nav.Link>
                        </Nav>
                        <Form inline onSubmit={handleSearchSubmit} className="ms-auto">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="mr-sm-2"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            <Button type="submit" variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Search Results</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {searchResults.length > 0 ? (
                        <ul>
                            {searchResults.map((result, index) => (
                                <li key={index}>{result.eventName}</li> // Ensure the results have an eventName property
                            ))}
                        </ul>
                    ) : <p>No results found.</p>}
                </Modal.Body>
            </Modal>
        </>
    );
}

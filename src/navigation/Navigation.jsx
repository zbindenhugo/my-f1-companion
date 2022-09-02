import './Navigation.css'

import { useContext, useState } from "react";

import { Container, Navbar, Offcanvas, Button, Modal, Form, Row, Dropdown } from "react-bootstrap";
import { Link } from 'react-router-dom';

import { Base64 } from 'js-base64';

import { UserContext } from '../contexts/Contexts';
import { toast } from 'react-toastify';


export default function Navigation() {
    
    const [showCanvas, setShowCanvas] = useState(false);
    const [showModal, toggleModal] = useState(false);

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');

    const {user, connectUser, disconnectUser} = useContext(UserContext);

    const fetchingUser = (e) => {
        fetch('https://f1-companion-api.herokuapp.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: email, pwd: Base64.encode(pwd)}),
        })
        
        .then((res) => res.json())
        .then((res) => {
            if (res.length === 0){
                toast.error('Wrong email / password.', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    progress: undefined,
                });
            } else {
                connectUser(res[0])
                toggleModal(false); 
                setPwd(''); 
                setEmail('')
            }
        })
        .catch((err) => {
            toast.error('An error occured during the connection.', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
            });

            setPwd('');
        })
    }

    const closeCanvas = () => {
        setShowCanvas(false)
    }

    const openCanvas = () => {
        setShowCanvas(true)
    }
    
    return(
        <>
            <Navbar expand='lg' className='shadow-xl'>
                <Container fluid>
                    <Navbar.Brand onClick={openCanvas}><i className="bi bi-list text-4xl transition-all duration-300 hover:text-[#ef233c]" /></Navbar.Brand>
                    <Navbar.Text >
                        {
                            user ? 
                            <Dropdown>
                                <Dropdown.Toggle variant='outline-secondary'>
                                <i class="fa fa-user-o fa-lg" aria-hidden="true"></i> {user.firstname} {user.lastname}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} to='/profile'>My profile</Dropdown.Item>
                                    <Dropdown.Item as={Link} to='/preferences'>My Preferences</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={() => toggleModal(true)}>
                                        <span className='text-[#d90429] font-bold'>Log Out</span>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            : 
                                <Button variant='outline-secondary' onClick={() => toggleModal(true)}>Log in</Button>
                        }
                    </Navbar.Text>
                </Container>
            </Navbar>
            <Offcanvas show={showCanvas} onHide={closeCanvas} className='bg-[#]'>
                <Offcanvas.Header className='text-center'>
                    <Offcanvas.Title className='font-bold uppercase italic text-5xl mr-auto ml-auto'>Main Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Container fluid>
                        <Row>
                            <Link to='/home' onClick={() => setShowCanvas(false)} className='text-xl transition-all duration-150 hover:tracking-wider hover:text-[#d90429]'><span className={window.location.pathname === '/home' ? 'font-bold text-[#d90429]' : ''}>Home</span></Link>
                            <Link to='/seasons/current' onClick={() => setShowCanvas(false)} className='text-xl transition-all duration-150 hover:tracking-wider hover:text-[#d90429]'><span className={window.location.pathname.includes('/seasons/current') ? 'font-bold text-[#d90429]' : ''}>Current season</span></Link>
                            <Link to='/seasons/allseasons' onClick={() => setShowCanvas(false)} className='text-xl transition-all duration-150 hover:tracking-wider hover:text-[#d90429]'><span className={!window.location.pathname.includes('/seasons/current') && window.location.pathname.includes('/seasons/')  ? 'font-bold text-[#d90429]' : ''}>All seasons</span></Link>
                            <Link to='/drivers' onClick={() => setShowCanvas(false)} className='text-xl transition-all duration-150 hover:tracking-wider hover:text-[#d90429]'><span className={window.location.pathname === '/drivers' ? 'font-bold text-[#d90429]' : ''}>Drivers</span></Link>
                        </Row>
                    </Container>
                </Offcanvas.Body>
            </Offcanvas>

            <Modal show={showModal} onHide={() => toggleModal(!showModal)} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title className='font-bold uppercase'>
                        {
                            user ? 'User log out' : 'User log in' 
                        }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        user ? 
                            <p>Are you sure you want to log out?</p>
                        :
                        <div>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="example@example.com" required={true}/>
                                    <Form.Text className="text-muted">
                                        Your email address and personnal informations will not be selled or revealed
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control value={pwd} onChange={(e) => setPwd(e.target.value)} type="password" placeholder="Password" required={true}/>
                                </Form.Group>
                            </Form>

                            <hr className='mb-2 ml-auto mr-auto w-[50%]' />

                            <p className='text-center'>You don't have account ? <Link className='cursor-pointer font-bold' to='/create-account' onClick={() => toggleModal(false)}>Create one !</Link></p>
                        </div>
                    }
                </Modal.Body>
                <Modal.Footer className='floa'>
                    <Button variant="outline-secondary" onClick={() => toggleModal(!showModal)}>
                        {
                            user ? 'No' : 'Cancel'
                        }
                    </Button>
                    <Button variant='outline-danger' onClick={
                        user ? () => {disconnectUser(); toggleModal(false)} : () => {fetchingUser()}
                    } type='submit'>
                        {
                            user ? 'Yes' : 'Confirm'
                        }
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}